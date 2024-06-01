import { useAtom, useAtomValue } from "jotai";
import Select from "react-select";

import { biomes, goods } from "./resources.ts";
import { currentBiome, currentRaw, currentGraph, currentTrade } from "./graph.ts";

function SelectBiome() {
  const [biome, setBiome] = useAtom(currentBiome);

  return <Select options={biomes} defaultValue={biome} onChange={setBiome} />;
}

function SelectRaw() {
  const [cur, setGoods] = useAtom(currentRaw);

  return <Select options={goods} defaultValue={cur} onChange={setGoods} isMulti />;
}

function SelectTrade() {
  const [cur, setGoods] = useAtom(currentTrade);

  return <Select options={goods} defaultValue={cur} onChange={setGoods} isMulti />;
}

function Graph() {
  const graph = useAtomValue(currentGraph);

  return <pre>{graph}</pre>;
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-700 dark:text-white">
      <SelectBiome />
      <SelectRaw />
      <SelectTrade />
      <Graph />
    </div>
  );
}

export default App;
