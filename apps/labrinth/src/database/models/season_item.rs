use chrono::{DateTime, Utc};
use eyre::{Result, WrapErr};

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
}
