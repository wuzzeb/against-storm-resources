import { atom } from "jotai";
import { G, Biome, Crop, Deposit, Good } from "./resources.ts";
import { LazySeq, OrderedSet } from "@seedtactics/immutable-collections";
import { Building } from "./recpie.ts";

export const currentRaw = atom<ReadonlyArray<Good>>([]);
export const currentTrade = atom<ReadonlyArray<Good>>([]);
export const currentCrops = atom<ReadonlyArray<Crop>>([]);
export const currentBiome = atom<Biome | null>(null);
export const currentDeposits = atom<ReadonlyArray<Deposit>>([]);
export const currentBuildings = atom<ReadonlyArray<Building>>([]);
export const currentRecipes = atom<OrderedSet<G>>(OrderedSet.empty<G>());

export const currentGraph = atom<string>((get) => {
  const biome = get(currentBiome);
  const rawGoods = get(currentRaw);
  const trade = get(currentTrade);
  const crops = get(currentCrops);
  const deposits = get(currentDeposits);

  const goods = LazySeq.of(rawGoods)
    .map((g) => [g.value, "📦"])
    .concat(biome?.trees.map((t) => [t, "🌲"]) ?? [])
    .concat(trade.map((g) => [g.value, "💰"]))
    .concat(crops.map((c) => [c.value, "🌾"]))
    .concat(LazySeq.of(deposits).flatMap((d) => [[d.main, "⛺"], ...d.secondary.map((s) => [s, "🎒"])]))
    .toOrderedMap(
      ([g, l]) => [g, l] as const,
      (a, b) => a + b,
    );

  const lines: string[] = [];

  for (const [good, label] of goods.toAscLazySeq()) {
    lines.push(`${good.replaceAll(" ", "_")}["${label} ${good}"]`);
  }

  return "flowchart TD\n" + lines.map((line) => "  " + line).join("\n");
});
