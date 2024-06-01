import { atom } from "jotai";
import { Biome, Good } from "./resources.ts";
import { LazySeq } from "@seedtactics/immutable-collections";

export const currentRaw = atom<ReadonlyArray<Good>>([]);
export const currentTrade = atom<ReadonlyArray<Good>>([]);
export const currentBiome = atom<Biome | null>(null);

export const currentGraph = atom<string>((get) => {
  const biome = get(currentBiome);
  const rawGoods = get(currentRaw);
  const trade = get(currentTrade);

  const goods = LazySeq.of(rawGoods)
    .map((g) => [g.value, "📦"])
    .concat(biome?.trees.map((t) => [t, "🌲"]) ?? [])
    .concat(trade.map((g) => [g.value, "💰"]))
    .toOrderedMap(
      ([g, l]) => [g, l] as const,
      (a, b) => a + b,
    );

  const lines: string[] = [];

  for (const [good, label] of goods.toAscLazySeq()) {
    lines.push(`${good}["${label} ${good}"]`);
  }

  return "flowchart TD\n" + lines.map((line) => "  " + line).join("\n");
});
