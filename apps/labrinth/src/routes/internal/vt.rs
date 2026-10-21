use actix_web::{HttpRequest, get, post, web};
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHasher};
use chrono::{Duration, Utc};
use eyre::eyre;
use rand_chacha::ChaCha20Rng;
use rand_chacha::rand_core::SeedableRng;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use xredis::RedisPool;
use zxcvbn::Score;

use crate::database::PgPool;
use crate::database::models::flow_item::DBFlow;
use crate::database::models::{DBUser, DBUserId, generate_user_id};
use crate::env::ENV;
use crate::models::users::{Badges, Role};
use crate::queue::email::EmailQueue;
use crate::routes::ApiError;
use crate::routes::internal::flows::{
    ensure_email_is_usable, send_verify_email,
};
use crate::routes::internal::session::{AuthSession, issue_auth_sessions};
use crate::util::error::Context;
use crate::util::guards::vt_plugin_key_guard;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/vt")
            .service(register_account)
            .service(claim_info)
            .service(claim_account),
    );
}

/// How long a player has to open their link and finish setting up their account.
const CLAIM_LINK_EXPIRY_MINUTES: i64 = 30;

/// A player registering a website account from the Minecraft server.
#[derive(Deserialize, utoipa::ToSchema)]
pub struct RegisterAccount {
    /// Minecraft UUID of the player.
    #[schema(value_type = String)]
    pub uuid: Uuid,
    /// Current Minecraft username of the player.
    pub username: String,
    /// LuckPerms primary group of the player, shown as their rank on the website.
    pub rank: String,
    /// Discord user ID linked to the player, if any.
    pub discord_id: Option<String>,
}

#[derive(Serialize, utoipa::ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum RegisterStatus {
    /// A new account was created.
    Created,
    /// The account exists, but its email and password were never set.
    Pending,
    /// The account is fully set up; only its rank and details were updated.
    Registered,
}

#[derive(Serialize, utoipa::ToSchema)]
pub struct RegisterAccountResponse {
    pub status: RegisterStatus,
    /// One-time link to set the account's email and password, if it still needs one.
    pub link: Option<String>,
}

/// Labrinth role for a Vanilla Tyme rank. The rank itself is only displayed.
fn role_for_rank(rank: &str) -> Role {
    match rank {
        "developer" => Role::Admin,
        "admin" | "moderator" => Role::Moderator,
        _ => Role::Developer,
    }
}

fn is_valid_minecraft_username(username: &str) -> bool {
    (3..=16).contains(&username.len())
        && username
            .chars()
            .all(|c| c.is_ascii_alphanumeric() || c == '_')
}

/// Create or update the website account of a Minecraft player.
#[utoipa::path(
	context_path = "/vt",
	tag = "vt",
	responses((status = OK, body = RegisterAccountResponse))
)]
#[post("/accounts", guard = "vt_plugin_key_guard")]
pub async fn register_account(
    pool: web::Data<PgPool>,
    redis: web::Data<RedisPool>,
    body: web::Json<RegisterAccount>,
) -> Result<web::Json<RegisterAccountResponse>, ApiError> {
    let RegisterAccount {
        uuid,
        username,
        rank,
        discord_id,
    } = body.into_inner();

    if !is_valid_minecraft_username(&username) {
        return Err(ApiError::Request(eyre!("invalid minecraft username")));
    }
    let rank = rank.trim().to_lowercase();
    if rank.is_empty() || rank.len() > 32 {
        return Err(ApiError::Request(eyre!("invalid rank")));
    }
    let discord_id = discord_id
        .map(|id| id.parse::<i64>())
        .transpose()
        .wrap_request_err("invalid discord id")?;
    let role = role_for_rank(&rank).to_string();

    let mut transaction = pool
        .begin()
        .await
        .wrap_internal_err("starting database transaction")?;

    let existing = sqlx::query!(
        r#"
        SELECT id, username, password IS NOT NULL AS "has_password!"
        FROM users
        WHERE minecraft_uuid = $1
        "#,
        uuid,
    )
    .fetch_optional(&mut transaction)
    .await
    .wrap_internal_err("fetching account by minecraft uuid")?;

    let (user_id, status, old_username) = if let Some(existing) = existing {
        let username_free = existing.username.eq_ignore_ascii_case(&username)
            || DBUser::get(&username, &mut transaction, &redis)
                .await
                .wrap_internal_err("checking if username is taken")?
                .is_none();

        sqlx::query!(
            "
            UPDATE users
            SET
                username = CASE WHEN $2 THEN $3 ELSE username END,
                rank = $4,
                role = $5,
                discord_id = COALESCE($6, discord_id)
            WHERE id = $1
            ",
            existing.id,
            username_free,
            username,
            rank,
            role,
            discord_id,
        )
        .execute(&mut transaction)
        .await
        .wrap_internal_err("updating account from minecraft")?;

        let status = if existing.has_password {
            RegisterStatus::Registered
        } else {
            RegisterStatus::Pending
        };
        (DBUserId(existing.id), status, Some(existing.username))
    } else {
        if DBUser::get(&username, &mut transaction, &redis)
            .await
            .wrap_internal_err("checking if username is taken")?
            .is_some()
        {
            return Err(ApiError::Request(eyre!(
                "username `{username}` is already used by another account"
            )));
        }

        let user_id = generate_user_id(&mut transaction)
            .await
            .wrap_internal_err("generating user ID")?;

        DBUser {
            id: user_id,
            github_id: None,
            discord_id,
            gitlab_id: None,
            google_id: None,
            steam_id: None,
            microsoft_id: None,
            password: None,
            paypal_id: None,
            paypal_country: None,
            paypal_email: None,
            venmo_handle: None,
            stripe_customer_id: None,
            totp_secret: None,
            username: username.clone(),
            email: None,
            email_verified: false,
            avatar_url: Some(format!("https://minotar.net/helm/{uuid}/128.png")),
            raw_avatar_url: None,
            bio: None,
            created: Utc::now(),
            role,
            badges: Badges::default(),
            campaign_pride_26: None,
            allow_friend_requests: true,
            is_subscribed_to_newsletter: false,
            eligibility_verified_at: None,
            lock: None,
            minecraft_uuid: Some(uuid),
            rank: Some(rank),
        }
        .insert(&mut transaction)
        .await
        .wrap_internal_err("inserting account from minecraft")?;

        (user_id, RegisterStatus::Created, None)
    };

    transaction
        .commit()
        .await
        .wrap_internal_err("committing database transaction")?;

    DBUser::clear_caches(
        &[(user_id, old_username), (user_id, Some(username))],
        &redis,
    )
    .await
    .wrap_internal_err("clearing cached account")?;

    let link = if matches!(status, RegisterStatus::Registered) {
        None
    } else {
        let flow = DBFlow::ClaimAccount { user_id }
            .insert(Duration::minutes(CLAIM_LINK_EXPIRY_MINUTES), &redis)
            .await
            .wrap_internal_err("creating account claim link")?;
        Some(format!("{}/auth/claim?flow={flow}", ENV.SITE_URL))
    };

    Ok(web::Json(RegisterAccountResponse { status, link }))
}

/// The account that is still waiting to be claimed through `flow`.
async fn claimable_account(
    flow: &str,
    pool: &PgPool,
    redis: &RedisPool,
) -> Result<DBUser, ApiError> {
    let Some(DBFlow::ClaimAccount { user_id }) = DBFlow::get(flow, redis)
        .await
        .wrap_internal_err("fetching account claim link")?
    else {
        return Err(ApiError::Request(eyre!(
            "this link is invalid or has expired, run /register in-game for a new one"
        )));
    };

    let user = DBUser::get_id(user_id, pool, redis)
        .await
        .wrap_internal_err("fetching account")?
        .wrap_request_err("this account no longer exists")?;
    if user.password.is_some() {
        return Err(ApiError::Request(eyre!(
            "this account is already set up, log in instead"
        )));
    }

    Ok(user)
}

/// Who a claim link belongs to, shown before the player sets their email and password.
#[derive(Serialize, utoipa::ToSchema)]
pub struct ClaimInfo {
    pub username: String,
    pub avatar_url: Option<String>,
}

/// Get the account a claim link belongs to.
#[utoipa::path(
	context_path = "/vt",
	tag = "vt",
	responses((status = OK, body = ClaimInfo))
)]
#[get("/claim/{flow}")]
pub async fn claim_info(
    pool: web::Data<PgPool>,
    redis: web::Data<RedisPool>,
    info: web::Path<(String,)>,
) -> Result<web::Json<ClaimInfo>, ApiError> {
    let user = claimable_account(&info.into_inner().0, &pool, &redis).await?;

    Ok(web::Json(ClaimInfo {
        username: user.username,
        avatar_url: user.avatar_url,
    }))
}

/// Finishing an account created from the Minecraft server.
#[derive(Deserialize, utoipa::ToSchema)]
pub struct ClaimAccount {
    /// Code from the one-time link the player got in-game.
    pub flow: String,
    pub email: String,
    pub password: String,
}

/// Set the email and password of an account created from the Minecraft
/// server, and log in.
#[utoipa::path(
	context_path = "/vt",
	tag = "vt",
	responses((status = OK, description = "Account claimed and logged in"))
)]
#[post("/claim")]
pub async fn claim_account(
    req: HttpRequest,
    pool: web::Data<PgPool>,
    redis: web::Data<RedisPool>,
    email_queue: web::Data<EmailQueue>,
    body: web::Json<ClaimAccount>,
) -> Result<web::Json<AuthSession>, ApiError> {
    let ClaimAccount {
        flow,
        email,
        password,
    } = body.into_inner();
    let email = email.trim().to_string();

    let user = claimable_account(&flow, &pool, &redis).await?;
    let user_id = user.id;

    ensure_email_is_usable(&redis, &email).await?;
    if !DBUser::get_by_case_insensitive_email(&email, &**pool)
        .await
        .wrap_internal_err("checking if email is taken")?
        .is_empty()
    {
        return Err(ApiError::Request(eyre!(
            "this email is already used by another account"
        )));
    }

    let strength = zxcvbn::zxcvbn(&password, &[&user.username, &email]);
    if strength.score() < Score::Three {
        let hint = strength
            .feedback()
            .and_then(|feedback| feedback.warning())
            .map(|warning| format!(": {warning}"))
            .unwrap_or_default();
        return Err(ApiError::Request(eyre!("password is too weak{hint}")));
    }

    let salt = SaltString::generate(&mut ChaCha20Rng::from_entropy());
    let password_hash = Argon2::default()
        .hash_password(password.as_bytes(), &salt)
        .wrap_internal_err("hashing password")?
        .to_string();

    let mut transaction = pool
        .begin()
        .await
        .wrap_internal_err("starting database transaction")?;

    let updated = sqlx::query!(
        "
        UPDATE users
        SET
            email = $2,
            email_verified = FALSE,
            password = $3,
            eligibility_verified_at = NOW()
        WHERE id = $1 AND password IS NULL
        ",
        user_id as DBUserId,
        email,
        password_hash,
    )
    .execute(&mut transaction)
    .await
    .wrap_internal_err("setting account email and password")?;
    if updated.rows_affected() == 0 {
        return Err(ApiError::Request(eyre!(
            "this account is already set up, log in instead"
        )));
    }

    send_verify_email(&email_queue, &mut transaction, &redis, user_id, email)
        .await?;

    let session =
        issue_auth_sessions(req, user_id, &mut transaction, &redis, false)
            .await
            .wrap_auth_err("logging in")?;

    transaction
        .commit()
        .await
        .wrap_internal_err("committing database transaction")?;

    DBFlow::remove(&flow, &redis)
        .await
        .wrap_internal_err("removing account claim link")?;
    DBUser::clear_caches(&[(user_id, Some(user.username))], &redis)
        .await
        .wrap_internal_err("clearing cached account")?;

    Ok(web::Json(session))
}
