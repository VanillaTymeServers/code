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

/// Price of one trade, paid in a Minecraft item.
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
    Validate,
    utoipa::ToSchema,
)]
pub struct InventoryPrice {
    /// ID of the item used as currency, e.g. `diamond`.
    #[validate(length(min = 1, max = 64))]
    pub item: String,
    /// How many of the currency item one trade costs.
    #[validate(range(min = 1))]
    pub amount: u32,
}

/// One item listed in a shop's inventory.
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
    Validate,
    utoipa::ToSchema,
)]
pub struct InventoryEntry {
    /// ID of the item being sold, e.g. `elytra`.
    #[validate(length(min = 1, max = 64))]
    pub item: String,
    /// Display name shown instead of the item's normal name.
    #[serde(default)]
    #[validate(length(min = 1, max = 64))]
    pub custom_name: Option<String>,
    /// How many of the item one trade gives.
    #[validate(range(min = 1))]
    pub amount: u32,
    /// Normal price of one trade.
    #[validate(nested)]
    pub price: InventoryPrice,
    /// Discounted price, in the same currency item, while on sale.
    #[serde(default)]
    #[validate(range(min = 1))]
    pub sale_price: Option<u32>,
    /// Short note shown under the item.
    #[serde(default)]
    #[validate(length(max = 256))]
    pub note: Option<String>,
    /// Whether the item is currently in stock.
    pub in_stock: bool,
    /// Whether the item is highlighted as popular.
    pub popular: bool,
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
        #[base(serde(default))]
        #[edit(serde(default))]
        #[create(default)]
        /// Season this shop belongs to. Set by the server when the shop is
        /// created; users cannot choose or change it.
        pub season: i32,
        #[base(serde(default))]
        #[edit(serde(default))]
        #[create(default)]
        /// Items this shop sells.
        #[validate(length(max = 256), nested)]
        pub inventory: Vec<InventoryEntry>,
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
