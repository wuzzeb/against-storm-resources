import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { G, Biome, Crop, Deposit, Good, goods, crops, deposits, biomes } from "./resources.ts";
import { OrderedSet, ComparableObj, OrderedMapKey, LazySeq } from "@seedtactics/immutable-collections";
import { Building, startingBuildings } from "./recpie.ts";
import { atom } from "jotai";

function mkArrayStorage<Mem, Disk>(w: (m: Mem) => Disk, r: (d: Disk) => Mem | undefined) {
  return createJSONStorage<ReadonlyArray<Mem>>(() => localStorage, {
    reviver(key: string, value: unknown): unknown {
      if (value && Array.isArray(value)) {
        return (value as Disk[]).map(r).filter((x) => x !== undefined) as Mem[];
      }
      return value;
    },

    replacer(key: string, value: unknown): unknown {
      if (value && Array.isArray(value)) {
        return (value as Mem[]).map(w);
      }
      return value;
    },
  });
}

function mkOrderedSetStorage<Mem extends OrderedMapKey, Disk>(
  w: (m: Mem) => Disk,
  r: (d: Disk) => Mem | undefined,
) {
  return createJSONStorage<OrderedSet<Mem>>(() => localStorage, {
    reviver(key: string, value: unknown): unknown {
      if (value && Array.isArray(value)) {
        return OrderedSet.from(LazySeq.of(value as Disk[]).collect(r));
      }
      return value;
    },

    replacer(key: string, value: unknown): unknown {
      if (value instanceof OrderedSet) {
        return value.toAscLazySeq().toRArray().map(w);
      }
      return value;
    },
  });
}

export const currentRaw = atomWithStorage<ReadonlyArray<Good>>(
  "raw",
  [],
  mkArrayStorage<Good, G>(
    (g) => g.value,
    (v) => goods.find((g) => g.value === v),
  ),
);
export const currentTrade = atomWithStorage<ReadonlyArray<Good>>(
  "trade",
  [],
  mkArrayStorage<Good, G>(
    (g) => g.value,
    (v) => goods.find((g) => g.value === v),
  ),
);
export const currentCrops = atomWithStorage<ReadonlyArray<Crop>>(
  "crops",
  [],
  mkArrayStorage<Crop, G>(
    (g) => g.value,
    (v) => crops.find((c) => c.value === v),
  ),
);
export const currentDeposits = atomWithStorage<ReadonlyArray<Deposit>>(
  "deposits",
  [],
  mkArrayStorage<Deposit, string>(
    (d) => d.value,
    (v) => deposits.find((d) => d.value === v),
  ),
);
export const currentBuildings = atomWithStorage<ReadonlyArray<Building>>(
  "buildings",
  [],
  mkArrayStorage<Building, string>(
    (b) => b.value,
    (v) => startingBuildings.find((b) => b.value === v),
  ),
);
export const currentRecipes = atomWithStorage<OrderedSet<G>>(
  "recpies",
  OrderedSet.empty<G>(),
  mkOrderedSetStorage<G, string>(
    (x) => x,
    (x) => x as G,
  ),
);

export class Link implements ComparableObj {
  public constructor(
    public readonly from: G,
    public readonly to: G,
  ) {}
  public compare(other: Link): number {
    return this.from.localeCompare(other.from) || this.to.localeCompare(other.to);
  }
}
export const selectedLinks = atomWithStorage<OrderedSet<Link>>(
  "selected-links",
  OrderedSet.empty<Link>(),
  mkOrderedSetStorage<Link, { from: G; to: G }>(
    (l) => ({ from: l.from, to: l.to }),
    ({ from, to }) => new Link(from, to),
  ),
);

export const currentBiome = atomWithStorage<Biome | null>(
  "biome",
  null,
  createJSONStorage(() => localStorage, {
    reviver(key: string, value: unknown): unknown {
      if (value && typeof value === "string") {
        return biomes.find((b) => b.value === value) ?? null;
      }
      return null;
    },
    replacer(key: string, value: unknown): unknown {
      if (value && typeof value === "object" && "value" in value) {
        return value.value;
      }
      return null;
    },
  }),
);

export const resetAllResources = atom(null, (_, set) => {
  set(currentRaw, []);
  set(currentTrade, []);
  set(currentCrops, []);
  set(currentDeposits, []);
  set(currentBuildings, []);
  set(currentRecipes, OrderedSet.empty());
  set(selectedLinks, OrderedSet.empty());
  set(currentBiome, null);
});
