import { atom } from "jotai";
import { G } from "./resources.ts";
import { LazySeq } from "@seedtactics/immutable-collections";
import { recipes } from "./recpie.ts";
import {
  Link,
  currentBiome,
  currentCrops,
  currentDeposits,
  currentRaw,
  currentRecipes,
  currentTrade,
  selectedLinks,
} from "./storage.ts";

export const currentGraph = atom<string>((get) => {
  const goods = LazySeq.of(get(currentRaw))
    .map((g) => [g.value, "📦"] as [G, string])
    .concat(get(currentBiome)?.trees.map((t) => [t, "🌲"]) ?? [])
    .concat(get(currentTrade).map((g) => [g.value, "💰"]))
    .concat(get(currentCrops).map((c) => [c.value, "🌾"]))
    .concat(
      LazySeq.of(get(currentDeposits)).flatMap((d) =>
        LazySeq.of(d.secondary)
          .map((s) => [s, "🎒"] as [G, string])
          .concat([[d.main, "⛺"]]),
      ),
    )
    .toOrderedMap(
      ([g, l]) => [g, l] as const,
      (a, b) => a + b,
    );

  const recs = LazySeq.of(get(currentRecipes))
    .collect((g) => recipes.get(g))
    .toOrderedMap((r) => [r.good, r]);

  const recDeps = recs
    .valuesToAscLazySeq()
    .flatMap((r) => LazySeq.of(r.ingredient1).concat(r.ingredient2).concat(r.ingredient3))
    .toOrderedMap((g) => [g, "❓"]);

  const recOnly = recs.difference(goods);

  const goodsAndDeps = goods.union(
    recDeps,
    // use from good, only include the question mark if the good doesn't exist yet
    (g, _) => g,
  );

  const lines: string[] = [];

  for (const [good, label] of goodsAndDeps.toAscLazySeq()) {
    lines.push(`${good.replaceAll(" ", "_")}["${label} ${good}"]`);
  }
  for (const good of recOnly.keysToAscLazySeq()) {
    lines.push(`${good.replaceAll(" ", "_")}{{"${good}"}}`);
  }

  const selected = get(selectedLinks);

  let linkIdx = 0;
  for (const rec of recs.valuesToAscLazySeq()) {
    for (const [is, color] of [
      [rec.ingredient1, "#228833"],
      [rec.ingredient2, "#ee6677"],
      [rec.ingredient3, "#66ccee"],
    ] as const) {
      for (const i of is) {
        const linkTy = selected.has(new Link(i, rec.good)) ? "-->" : "-.->";
        lines.push(`${i.replaceAll(" ", "_")} ${linkTy} ${rec.good.replaceAll(" ", "_")}`);
        lines.push(`linkStyle ${linkIdx++} stroke:${color},stroke-width:5px,cursor:crosshair`);
      }
    }
  }

  if (lines.length === 0) {
    return "";
  } else {
    return "flowchart LR\n" + lines.map((line) => "  " + line).join("\n");
  }
});
