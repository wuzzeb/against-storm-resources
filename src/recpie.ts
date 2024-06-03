import { LazySeq, OrderedMap } from "@seedtactics/immutable-collections";
import { G } from "./resources";

export enum B {
  Alchemist_Hut = "Alchemist Hut",
  Apothecary = "Apothecary",
  Artisan = "Artisan",
  Bakery = "Bakery",
  Beanery = "Beanery",
  Brewery = "Brewery",
  Brick_Oven = "Brick Oven",
  Brickyard = "Brickyard",
  Butcher = "Butcher",
  Carpenter = "Carpenter",
  Cellar = "Cellar",
  Clothier = "Clothier",
  Cookhouse = "Cookhouse",
  Cooperage = "Cooperage",
  Crude_Workstation = "Crude Workstation",
  Distillery = "Distillery",
  Druid_Hut = "Druid Hut",
  Furnace = "Furnace",
  Field_Kitchen = "Field Kitchen",
  Finesmith = "Finesmith",
  Granary = "Granary",
  Grill = "Grill",
  Kiln = "Kiln",
  Leatherworker = "Leatherworker",
  Lumber_Mill = "Lumber Mill",
  Makeshift_Post = "Makeshift Post",
  Manufactory = "Manufactory",
  Press = "Press",
  Provisioner = "Provisioner",
  Rain_Mill = "Rain Mill",
  Rainpuck_Foundry = "Rainpuck Foundry",
  Ranch = "Ranch",
  Scribe = "Scribe",
  Smelter = "Smelter",
  Smithy = "Smithy",
  Stamping_Mill = "Stamping Mill",
  Smokehouse = "Smokehouse",
  Supplier = "Supplier",
  Teahouse = "Teahouse",
  Tinctury = "Tinctury",
  Tinkerer = "Tinkerer",
  Toolshop = "Toolshop",
  Weaver = "Weaver",
  Workshop = "Workshop",
}

export type Building = {
  readonly value: B;
  readonly label: B;
};

export const startingBuildings: ReadonlyArray<Building> = [
  B.Makeshift_Post,
  B.Crude_Workstation,
  B.Field_Kitchen,
].map((value) => ({ value, label: value }));
export const nonstartingBuildings: ReadonlyArray<Building> = Object.values(B)
  .filter((b) => !startingBuildings.some((sb) => sb.value === b))
  .map((value) => ({ value, label: value }));

export type Recipe = {
  readonly good: G;
  readonly ingredient1: ReadonlyArray<G>;
  readonly ingredient2: ReadonlyArray<G>;
  readonly ingredient3: ReadonlyArray<G>;
  readonly buildings: ReadonlyArray<B>;
};

const complexFood: ReadonlyArray<Recipe> = [
  {
    good: G.Biscuits,
    ingredient1: [G.Flour],
    ingredient2: [G.Berries, G.Herbs, G.Roots],
    ingredient3: [],
    buildings: [B.Field_Kitchen, B.Smelter, B.Apothecary, B.Bakery, B.Cookhouse],
  },
  {
    good: G.Jerky,
    ingredient1: [G.Meat, G.Insects],
    ingredient2: [G.Coal, G.Oil, G.Sea_Marrow, G.Wood],
    ingredient3: [],
    buildings: [B.Field_Kitchen, B.Cellar, B.Kiln, B.Butcher, B.Smokehouse],
  },
  {
    good: G.Pickled_Goods,
    ingredient1: [G.Berries, G.Eggs, G.Mushrooms, G.Roots, G.Vegetables],
    ingredient2: [G.Barrels, G.Pottery, G.Waterskins],
    ingredient3: [],
    buildings: [B.Field_Kitchen, B.Beanery, B.Brewery, B.Cellar, B.Granary],
  },
  {
    good: G.Pie,
    ingredient1: [G.Flour],
    ingredient2: [G.Berries, G.Eggs, G.Herbs, G.Insects, G.Meat],
    ingredient3: [],
    buildings: [B.Bakery, B.Furnace, B.Brick_Oven],
  },
  {
    good: G.Porridge,
    ingredient1: [G.Grain, G.Herbs, G.Mushrooms, G.Vegetables],
    ingredient2: [G.Drizzle_Water, G.Clearance_Water, G.Storm_Water],
    ingredient3: [],
    buildings: [B.Field_Kitchen, B.Distillery, B.Teahouse, B.Beanery],
  },
  {
    good: G.Skewers,
    ingredient1: [G.Insects, G.Jerky, G.Meat, G.Mushrooms],
    ingredient2: [G.Berries, G.Eggs, G.Roots, G.Vegetables],
    ingredient3: [],
    buildings: [B.Butcher, B.Cookhouse, B.Grill],
  },
];

const buildingMats: ReadonlyArray<Recipe> = [
  {
    good: G.Bricks,
    ingredient1: [G.Clay, G.Stone],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Crude_Workstation, B.Kiln, B.Furnace, B.Workshop, B.Brickyard],
  },
  {
    good: G.Fabric,
    ingredient1: [G.Leather, G.Plant_Fiber, G.Reed],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Crude_Workstation, B.Granary, B.Leatherworker, B.Workshop, B.Weaver],
  },
  {
    good: G.Pipes,
    ingredient1: [G.Copper_Bars, G.Crystalized_Dew],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Crude_Workstation, B.Workshop, B.Smithy, B.Toolshop],
  },
  {
    good: G.Planks,
    ingredient1: [G.Wood],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Crude_Workstation, B.Carpenter, B.Supplier, B.Workshop, B.Lumber_Mill],
  },
  {
    good: G.Parts,
    ingredient1: [G.Copper_Bars, G.Crystalized_Dew, G.Stone, G.Clay],
    ingredient2: [G.Coal, G.Sea_Marrow, G.Oil, G.Wood],
    ingredient3: [],
    buildings: [B.Rainpuck_Foundry],
  },
  {
    good: G.Wildfire_Essence,
    ingredient1: [G.Coal],
    ingredient2: [G.Copper_Bars, G.Crystalized_Dew],
    ingredient3: [G.Storm_Water, G.Clearance_Water],
    buildings: [B.Rainpuck_Foundry],
  },
];

const services: ReadonlyArray<Recipe> = [
  {
    good: G.Coats,
    ingredient1: [G.Fabric],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Druid_Hut, B.Artisan, B.Cooperage, B.Clothier],
  },
  {
    good: G.Ale,
    ingredient1: [G.Grain, G.Roots],
    ingredient2: [G.Barrels, G.Pottery, G.Waterskins],
    ingredient3: [],
    buildings: [B.Grill, B.Scribe, B.Tinctury, B.Brewery],
  },
  {
    good: G.Incense,
    ingredient1: [G.Herbs, G.Insects, G.Resin, G.Roots],
    ingredient2: [G.Coal, G.Oil, G.Sea_Marrow, G.Wood],
    ingredient3: [],
    buildings: [B.Brick_Oven, B.Druid_Hut, B.Smokehouse, B.Apothecary],
  },
  {
    good: G.Scrolls,
    ingredient1: [G.Leather, G.Plant_Fiber, G.Wood],
    ingredient2: [G.Pigment, G.Wine],
    ingredient3: [],
    buildings: [B.Clothier, B.Lumber_Mill, B.Rain_Mill, B.Scribe],
  },
  {
    good: G.Tea,
    ingredient1: [G.Herbs, G.Mushrooms, G.Pigment, G.Resin, G.Roots],
    ingredient2: [G.Clearance_Water, G.Drizzle_Water, G.Storm_Water],
    ingredient3: [G.Copper_Bars, G.Crystalized_Dew],
    buildings: [B.Cooperage, B.Alchemist_Hut, B.Apothecary, B.Teahouse],
  },
  {
    good: G.Training_Gear,
    ingredient1: [G.Copper_Bars, G.Crystalized_Dew, G.Stone],
    ingredient2: [G.Planks, G.Reed],
    ingredient3: [],
    buildings: [B.Weaver, B.Manufactory, B.Smelter, B.Tinkerer],
  },
  {
    good: G.Wine,
    ingredient1: [G.Berries, G.Mushrooms, G.Reed],
    ingredient2: [G.Barrels, G.Pottery, G.Waterskins],
    ingredient3: [],
    buildings: [B.Alchemist_Hut, B.Distillery, B.Tinctury, B.Cellar],
  },
];

const craftingMaterials: ReadonlyArray<Recipe> = [
  {
    good: G.Barrels,
    ingredient1: [G.Copper_Bars, G.Crystalized_Dew],
    ingredient2: [G.Planks],
    ingredient3: [],
    buildings: [B.Toolshop, B.Artisan, B.Distillery, B.Provisioner, B.Cooperage],
  },
  {
    good: G.Copper_Bars,
    ingredient1: [G.Copper_Ore],
    ingredient2: [G.Coal, G.Oil, G.Sea_Marrow, G.Wood],
    ingredient3: [],
    buildings: [B.Grill, B.Stamping_Mill, B.Furnace, B.Smelter],
  },
  {
    good: G.Crystalized_Dew,
    ingredient1: [G.Herbs, G.Insects, G.Resin, G.Vegetables],
    ingredient2: [G.Clay, G.Stone],
    ingredient3: [G.Clearance_Water, G.Drizzle_Water, G.Storm_Water],
    buildings: [B.Beanery, B.Brickyard, B.Alchemist_Hut],
  },
  {
    good: G.Flour,
    ingredient1: [G.Grain, G.Mushrooms, G.Roots],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Press, B.Provisioner, B.Stamping_Mill, B.Supplier, B.Rain_Mill],
  },
  {
    good: G.Leather,
    ingredient1: [G.Grain, G.Plant_Fiber, G.Reed, G.Vegetables],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Ranch],
  },
  {
    good: G.Pigment,
    ingredient1: [G.Berries, G.Coal, G.Copper_Ore, G.Insects],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Cookhouse, B.Leatherworker, B.Manufactory, B.Tinctury],
  },
  {
    good: G.Pottery,
    ingredient1: [G.Clay],
    ingredient2: [G.Coal, G.Oil, G.Sea_Marrow, G.Wood],
    ingredient3: [],
    buildings: [B.Smokehouse, B.Bakery, B.Brickyard, B.Stamping_Mill],
  },
  {
    good: G.Waterskins,
    ingredient1: [G.Leather],
    ingredient2: [G.Meat, G.Oil],
    ingredient3: [],
    buildings: [B.Clothier, B.Teahouse, B.Supplier, B.Leatherworker],
  },
];

export const trade: ReadonlyArray<Recipe> = [
  {
    good: G.Amber,
    ingredient1: [G.Resin],
    ingredient2: [G.Clearance_Water, G.Oil],
    ingredient3: [],
    buildings: [B.Finesmith],
  },
  {
    good: G.Pack_of_Building,
    ingredient1: [G.Bricks, G.Copper_Ore, G.Fabric, G.Planks],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Makeshift_Post, B.Rain_Mill, B.Tinkerer],
  },
  {
    good: G.Pack_of_Crops,
    ingredient1: [G.Grain, G.Mushrooms, G.Roots, G.Vegetables],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Makeshift_Post, B.Brewery, B.Granary],
  },
  {
    good: G.Pack_of_Luxury,
    ingredient1: [G.Ale, G.Incense, G.Scrolls, G.Tea, G.Training_Gear, G.Wine],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Press, B.Artisan, B.Carpenter],
  },
  {
    good: G.Pack_of_Provisions,
    ingredient1: [G.Berries, G.Eggs, G.Herbs, G.Insects, G.Meat],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Makeshift_Post, B.Manufactory, B.Provisioner],
  },
  {
    good: G.Pack_of_Trade,
    ingredient1: [G.Barrels, G.Flour, G.Oil, G.Pigment, G.Pottery, G.Waterskins],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Lumber_Mill, B.Weaver, B.Smithy],
  },
];

const fuel: ReadonlyArray<Recipe> = [
  {
    good: G.Coal,
    ingredient1: [G.Wood],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Brick_Oven, B.Kiln],
  },
  {
    good: G.Oil,
    ingredient1: [G.Grain, G.Meat, G.Vegetables, G.Plant_Fiber],
    ingredient2: [],
    ingredient3: [],
    buildings: [B.Butcher, B.Druid_Hut, B.Press],
  },
  {
    good: G.Tools,
    ingredient1: [G.Wood, G.Planks],
    ingredient2: [G.Copper_Bars, G.Crystalized_Dew],
    ingredient3: [],
    buildings: [B.Scribe, B.Carpenter, B.Smithy, B.Tinkerer, B.Finesmith, B.Toolshop],
  },
];

export const recipes: OrderedMap<G, Recipe> = LazySeq.of(complexFood)
  .concat(buildingMats)
  .concat(services)
  .concat(craftingMaterials)
  .concat(trade)
  .concat(fuel)
  .toOrderedMap((r) => [r.good, r]);

export const recipeByBuilding: OrderedMap<B, OrderedMap<G, Recipe>> = recipes
  .valuesToDescLazySeq()
  .flatMap((r) => r.buildings.map((b) => ({ r, b })))
  .toLookupOrderedMap(
    ({ b }) => b,
    ({ r }) => r.good,
    ({ r }) => r,
  );
