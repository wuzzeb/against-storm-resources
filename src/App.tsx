import { useAtom, useAtomValue } from "jotai";
import Select from "react-select";

import { G, biomes, crops, deposits, goods } from "./resources.ts";
import {
  currentBiome,
  currentRaw,
  currentGraph,
  currentTrade,
  currentDeposits,
  currentCrops,
  currentBuildings,
  currentRecipes,
} from "./graph.ts";
import { buildings, recipeByBuilding, startingBuildings } from "./recpie.ts";
import { LazySeq } from "@seedtactics/immutable-collections";
import { useId } from "react";

function SelectBiome() {
  const [biome, setBiome] = useAtom(currentBiome);
  return (
    <div>
      <p>Current Biome (determines resources from trees 🌲)</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={biomes}
        defaultValue={biome}
        onChange={setBiome}
      />
    </div>
  );
}

function SelectDeposits() {
  const [cur, setDeposits] = useAtom(currentDeposits);
  return (
    <div>
      <p>Deposits (determines main good ⛺ and secondary goods 🎒)</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={deposits}
        defaultValue={cur}
        onChange={setDeposits}
        isMulti
      />
    </div>
  );
}

function SelectCrops() {
  const [cur, setCrops] = useAtom(currentCrops);
  return (
    <div>
      <p>Crops 🌾</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={crops}
        defaultValue={cur}
        onChange={setCrops}
        isMulti
      />
    </div>
  );
}

function SelectTrade() {
  const [cur, setGoods] = useAtom(currentTrade);
  return (
    <div>
      <p>Goods you intend to trade for 💰</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={goods}
        defaultValue={cur}
        onChange={setGoods}
        isMulti
      />
    </div>
  );
}

function SelectRaw() {
  const [cur, setGoods] = useAtom(currentRaw);
  return (
    <div>
      <p>Extra available goods 📦 (typically from cornerstones)</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={goods}
        defaultValue={cur}
        onChange={setGoods}
        isMulti
      />
    </div>
  );
}

function SelectBuildings() {
  const [cur, setBuildings] = useAtom(currentBuildings);
  return (
    <div>
      <p>Buildings</p>
      <Select
        className="ats-react-select-container ml-2"
        classNamePrefix="ats-react-select"
        options={buildings}
        defaultValue={cur}
        onChange={setBuildings}
        isMulti
      />
    </div>
  );
}

function GoodCheckbox({ good }: { good: G }) {
  const id = useId();
  const [selected, setSelected] = useAtom(currentRecipes);
  return (
    <div className="ml-4">
      <input
        type="checkbox"
        id={id}
        checked={selected.has(good)}
        onChange={() =>
          selected.has(good) ? setSelected((s) => s.delete(good)) : setSelected((s) => s.add(good))
        }
      />
      <label htmlFor={id} className="ms-1 select-none">
        {good}
      </label>
    </div>
  );
}

function SelectRecipes() {
  const curBuild = useAtomValue(currentBuildings);
  return (
    <div className="flex flex-wrap space-x-5">
      {LazySeq.of(curBuild)
        .concat(startingBuildings)
        .sortBy((b) => b.value)
        .map((b) => (
          <div key={b.value}>
            <p className="text-lg underline">{b.label}</p>
            {recipeByBuilding
              .get(b.value)
              ?.keysToAscLazySeq()
              .map((g) => <GoodCheckbox key={g} good={g} />)}
          </div>
        ))}
    </div>
  );
}

function Resouces() {
  return (
    <div className="flex flex-col space-y-3">
      <SelectBiome />
      <SelectDeposits />
      <SelectCrops />
      <SelectTrade />
      <SelectRaw />
      <SelectBuildings />
      <SelectRecipes />
    </div>
  );
}

function Graph() {
  const graph = useAtomValue(currentGraph);
  return <pre>{graph}</pre>;
}

function App() {
  return (
    <main className="min-h-screen bg-white p-3 dark:bg-slate-700 dark:text-white">
      <Resouces />
      <Graph />
    </main>
  );
}

export default App;
