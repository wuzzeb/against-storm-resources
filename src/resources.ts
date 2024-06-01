export enum G {
  Ale = "Ale",
  Amber = "Amber",
  Ancient_Tablet = "Ancient Tablet",
  Barrels = "Barrels",
  Berries = "Berries",
  Biscuts = "Biscuts",
  Bricks = "Bricks",
  Clay = "Clay",
  Coal = "Coal",
  Coats = "Coats",
  Copper_Bars = "Copper Bars",
  Copper_Ore = "Copper Ore",
  Crystalized_Dew = "Crystalized Dew",
  Eggs = "Eggs",
  Fabric = "Fabric",
  Flour = "Flour",
  Grain = "Grain",
  Herbs = "Herbs",
  Incense = "Incense",
  Insects = "Insects",
  Jerky = "Jerky",
  Leather = "Leather",
  Meat = "Meat",
  Mushrooms = "Mushrooms",
  Oil = "Oil",
  Pack_of_Building = "Pack of Building",
  Pack_of_Crops = "Pack of Crops",
  Pack_of_Luxury = "Pack of Luxury",
  Pack_of_Provisions = "Pack of Provisions",
  Pack_of_Trade = "Pack of Trade",
  Parts = "Parts",
  Pickled_Goods = "Pickled Goods",
  Pie = "Pie",
  Pigment = "Pigment",
  Pipes = "Pipes",
  Planks = "Planks",
  Plant_Fiber = "Plant Fiber",
  Porridge = "Porridge",
  Pottery = "Pottery",
  Purging_Fire = "Purging Fire",
  Reed = "Reed",
  Resin = "Resin",
  Roots = "Roots",
  Scrolls = "Scrolls",
  Sea_Marrow = "Sea Marrow",
  Skewers = "Skewers",
  Stone = "Stone",
  Tea = "Tea",
  Tools = "Tools",
  Training_Gear = "Training Gear",
  Vegetables = "Vegetables",
  Waterskins = "Waterskins",
  Wildfire_Essence = "Wildfire Essence",
  Wine = "Wine",
  Wood = "Wood",
}

export type Good = { readonly value: string; readonly label: string };
export const goods: ReadonlyArray<Good> = Object.values(G).map((value) => ({ value, label: value }));

export type Biome = {
  readonly value: string;
  readonly label: string;
  readonly trees: ReadonlyArray<G>;
  readonly wiki: string;
};

export const biomes: ReadonlyArray<Biome> = [
  {
    value: "Royal_Woodlands",
    label: "Royal Woodlands",
    trees: [G.Resin, G.Plant_Fiber, G.Eggs, G.Wood],
    wiki: "https://hoodedhorse.com/wiki/Against_the_Storm/Royal_Woodlands",
  },
  {
    value: "Coral_Forest",
    label: "Coral Forest",
    trees: [G.Stone, G.Incense, G.Meat, G.Crystalized_Dew, G.Plant_Fiber, G.Wood],
    wiki: "https://hoodedhorse.com/wiki/Against_the_Storm/Coral_Forest",
  },
  {
    value: "Marshlands",
    label: "Marshlands",
    trees: [G.Mushrooms, G.Leather, G.Wood],
    wiki: "https://hoodedhorse.com/wiki/Against_the_Storm/Marshlands",
  },
  {
    value: "Scarlet_Orchard",
    label: "Scarlet Orchard",
    trees: [G.Copper_Ore, G.Pigment, G.Plant_Fiber, G.Wood],
    wiki: "https://hoodedhorse.com/wiki/Against_the_Storm/Scarlet_Orchard",
  },
];
