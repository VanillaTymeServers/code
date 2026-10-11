use eyre::Result;
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::models::exp::{
    ProjectComponentKind,
    component::{self, Component},
    project::ProjectComponent,
};

/// Wool color of a market stall.
#[derive(
    Debug,
    Clone,
    Copy,
    PartialEq,
    Eq,
    Hash,
    Serialize,
    Deserialize,
    utoipa::ToSchema,
)]
#[serde(rename_all = "snake_case")]
pub enum StallColor {
    Pink,
    Green,
    White,
    Blue,
    Lime,
    LightBlue,
    Cyan,
    Purple,
    Magenta,
    LightGray,
    Brown,
    Orange,
    Yellow,
    Gray,
    Black,
    Red,
}

/// In-game X/Z location of a shop.
#[derive(
    Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, utoipa::ToSchema,
)]
pub struct Coordinates {
    pub x: i32,
    pub z: i32,
}

component::define! {
    /// Listing for a shop or stall in the Vanilla Tyme market.
    #[derive(Debug, Clone, Serialize, Deserialize, Validate, utoipa::ToSchema)]
    pub struct ShopProject {
        #[base()]
        #[edit(serde(default))]
        #[create(required)]
        /// Whether this is a pre-built stall (`true`) or a plot shop (`false`).
        pub stall: bool,
        #[base(serde(default))]
        #[edit(serde(
            default,
            skip_serializing_if = "Option::is_none",
            with = "serde_with::rust::double_option"
        ))]
        #[create(optional)]
        /// Wool color of the stall, if this is a stall.
        pub stall_color: Option<StallColor>,
        #[base(serde(default))]
        #[edit(serde(
            default,
            skip_serializing_if = "Option::is_none",
            with = "serde_with::rust::double_option"
        ))]
        #[create(optional)]
        /// In-game location of the shop.
        pub coordinates: Option<Coordinates>,
    }
}

impl ProjectComponent for ShopProject {
    fn kind() -> ProjectComponentKind {
        ProjectComponentKind::Shop
    }
}

component::relations! {
    pub(super) static PROJECT_COMPONENT_RELATIONS: ProjectComponentKind = {
        use ProjectComponentKind::*;

        [[Shop].only()]
    }
}