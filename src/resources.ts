export enum G {
  Ale = "Ale",
  Amber = "Amber",
  Ancient_Tablet = "Ancient Tablet",
  Barrels = "Barrels",
  Berries = "Berries",
  Biscuits = "Biscuits",
  Bricks = "Bricks",
  Clay = "Clay",
  Clearance_Water = "Clearance Water",
  Coal = "Coal",
  Coats = "Coats",
  Copper_Bars = "Copper Bars",
  Copper_Ore = "Copper Ore",
  Crystalized_Dew = "Crystalized Dew",
  Drizzle_Water = "Drizzle Water",
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
  Storm_Water = "Storm Water",
  Tea = "Tea",
  Tools = "Tools",
  Training_Gear = "Training Gear",
  Vegetables = "Vegetables",
  Waterskins = "Waterskins",
  Wildfire_Essence = "Wildfire Essence",
  Wine = "Wine",
  Wood = "Wood",
}

export type Good = { readonly value: G; readonly label: G };
export const goods: ReadonlyArray<Good> = Object.values(G).map((value) => ({ value, label: value }));

export type Deposit = {
  readonly value: string;
  readonly label: string;
  readonly main: G;
  readonly secondary: ReadonlyArray<G>;
};

export const deposits: ReadonlyArray<Deposit> = [
  {
    label: G.Berries,
    value: G.Berries,
    main: G.Berries,
    secondary: [],
  },
  {
    label: G.Clay,
    value: G.Clay,
    main: G.Clay,
    secondary: [G.Copper_Ore, G.Roots],
  },
  { label: G.Coal, value: G.Coal, main: G.Coal, secondary: [G.Stone] },
  {
    label: G.Copper_Ore,
    value: G.Copper_Ore,
    main: G.Copper_Ore,
    secondary: [G.Clay],
  },
  {
    label: G.Eggs,
    value: G.Eggs,
    main: G.Eggs,
    secondary: [G.Meat],
  },
  {
    label: G.Grain,
    value: G.Grain,
    main: G.Grain,
    secondary: [G.Plant_Fiber],
  },
  {
    label: G.Herbs + " Large",
    value: G.Herbs + " Large",
    main: G.Herbs,
    secondary: [G.Berries, G.Plant_Fiber],
  },
  { label: G.Herbs + " Small", value: G.Herbs + " Small", main: G.Herbs, secondary: [G.Berries] },
  { label: G.Insects, value: G.Insects, main: G.Insects, secondary: [] },
  {
    label: "Leech Brood (Meat) Large",
    value: "Leech Brood (Meat) Large",
    main: G.Meat,
    secondary: [G.Leather, G.Eggs],
  },
  {
    label: "Leech Brood (Meat) Small",
    value: "Leech Brood (Meat) Small",
    main: G.Meat,
    secondary: [G.Leather],
  },
  {
    label: "Slickshell (Meat)",
    value: "Slickshell (Meat)",
    main: G.Meat,
    secondary: [G.Leather],
  },
  {
    label: G.Mushrooms,
    value: G.Mushrooms,
    main: G.Mushrooms,
    secondary: [G.Insects],
  },
  {
    label: G.Plant_Fiber,
    value: G.Plant_Fiber,
    main: G.Plant_Fiber,
    secondary: [G.Clay, G.Insects],
  },
  { label: G.Reed, value: G.Reed, main: G.Reed, secondary: [G.Roots, G.Clay] },
  { label: G.Roots + " Large", value: G.Roots + " Large", main: G.Roots, secondary: [G.Herbs, G.Resin] },
  { label: G.Roots + " Small", value: G.Roots + " Small", main: G.Roots, secondary: [G.Herbs] },
  { label: G.Sea_Marrow, value: G.Sea_Marrow, main: G.Sea_Marrow, secondary: [G.Stone] },
  {
    label: G.Stone + " Large",
    value: G.Stone + " Large",
    main: G.Stone,
    secondary: [G.Roots, G.Insects, G.Copper_Ore],
  },
  { label: G.Stone + " Small", value: G.Stone + " Small", main: G.Stone, secondary: [G.Roots, G.Insects] },
  {
    label: G.Vegetables + " Large",
    value: G.Vegetables + " Large",
    main: G.Vegetables,
    secondary: [G.Insects, G.Roots],
  },
  {
    label: G.Vegetables + " Small",
    value: G.Vegetables + " Small",
    main: G.Vegetables,
    secondary: [G.Insects],
  },
  {
    label: G.Grain + " Giant Marshlands",
    value: G.Grain + " Giant Marshlands",
    main: G.Grain,
    secondary: [G.Reed, G.Herbs, G.Oil, G.Amber],
  },
  {
    label: G.Meat + " Giant Marshlands",
    value: G.Meat + " Giant Marshlands",
    main: G.Meat,
    secondary: [G.Leather, G.Jerky, G.Sea_Marrow, G.Crystalized_Dew],
  },
  {
    label: G.Mushrooms + " Giant Marshlands",
    value: G.Mushrooms + " Giant Marshlands",
    main: G.Mushrooms,
    secondary: [G.Insects, G.Pigment, G.Waterskins, G.Pickled_Goods],
  },
];

export type Crop = {
  readonly value: G;
  readonly label: G;
};

export const crops: ReadonlyArray<Crop> = [
  { label: G.Berries, value: G.Berries },
  { value: G.Clay, label: G.Clay },
  { value: G.Crystalized_Dew, label: G.Crystalized_Dew },
  { value: G.Grain, label: G.Grain },
  { value: G.Herbs, label: G.Herbs },
  { value: G.Mushrooms, label: G.Mushrooms },
  { value: G.Plant_Fiber, label: G.Plant_Fiber },
  { value: G.Reed, label: G.Reed },
  { value: G.Resin, label: G.Resin },
  { value: G.Roots, label: G.Roots },
  { value: G.Vegetables, label: G.Vegetables },
];

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
