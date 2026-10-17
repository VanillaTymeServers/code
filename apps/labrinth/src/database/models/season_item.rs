use chrono::{DateTime, Utc};
use eyre::{Result, WrapErr};
use crate::database::models::{DBTeamId, DBUserId};

/// A season of the Vanilla Tyme server. The current season is the highest one
/// whose start time has passed, so seasons can be scheduled ahead of time.
#[derive(Debug, Clone)]
pub struct DBSeason {
    pub id: i32,
    pub started_at: DateTime<Utc>,
}

impl DBSeason {
    /// Lists every season, newest first, including ones that have not started yet.
    pub async fn list(
        exec: impl crate::database::Executor<'_, Database = sqlx::Postgres>,
    ) -> Result<Vec<DBSeason>> {
        let records = sqlx::query!(
            "SELECT id, started_at FROM seasons ORDER BY id DESC"
        )
        .fetch_all(exec)
        .await
        .wrap_err("fetching seasons")?;

        Ok(records
            .into_iter()
            .map(|record| DBSeason {
                id: record.id,
                started_at: record.started_at,
            })
            .collect())
    }

    /// Returns the number of the season currently running, or `None` if no
    /// season has started yet.
    pub async fn current(
        exec: impl crate::database::Executor<'_, Database = sqlx::Postgres>,
    ) -> Result<Option<i32>> {
        sqlx::query_scalar!(
            "SELECT MAX(id) FROM seasons WHERE started_at <= NOW()"
        )
        .fetch_one(exec)
        .await
        .wrap_err("fetching current season")
    }
        /// Whether the user is an accepted member of any shop from the current season.
    pub async fn user_has_current_shop(
        user_id: DBUserId,
        exec: impl crate::database::Executor<'_, Database = sqlx::Postgres>,
    ) -> Result<bool> {
        sqlx::query_scalar!(
            r#"
            SELECT EXISTS (
                SELECT 1
                FROM team_members tm
                INNER JOIN mods m ON m.team_id = tm.team_id
                WHERE tm.user_id = $1
                    AND tm.accepted
                    AND m.components ? 'shop'
                    AND (m.components -> 'shop' ->> 'season')::int = (
                        SELECT MAX(id) FROM seasons WHERE started_at <= NOW()
                    )
            ) AS "exists!"
            "#,
            user_id as DBUserId,
        )
        .fetch_one(exec)
        .await
        .wrap_err("checking for a current-season shop")
    }

    /// Season of the shop that `team_id` belongs to, or `None` if the team isn't a shop's.
    pub async fn team_shop_season(
        team_id: DBTeamId,
        exec: impl crate::database::Executor<'_, Database = sqlx::Postgres>,
    ) -> Result<Option<i32>> {
        let season = sqlx::query_scalar!(
            r#"
            SELECT (components -> 'shop' ->> 'season')::int AS season
            FROM mods
            WHERE team_id = $1 AND components ? 'shop'
            "#,
            team_id as DBTeamId,
        )
        .fetch_optional(exec)
        .await
        .wrap_err("fetching shop season of team")?;

        Ok(season.flatten())
    }
}
