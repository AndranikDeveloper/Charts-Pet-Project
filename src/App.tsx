import React, { useCallback, useEffect, useState } from "react";
import * as d3 from "d3";
import Filters from "./components/Filters/Filters";
import Graph from "./components/Graph/Graph";
import { IUsage, ICost, IFilterState } from "./shared/constants/types";
import { fetchCosts, fetchUsages } from "./utils/dataParser";
import { getCalculatedData } from "./utils/getCalculatedData";
import { filterCalculatedData } from "./utils/filterCalculatedData";
import { sortDataByTimePeriod } from "./utils/sortDataByTimePeriod";

const App: React.FC = () => {
  const [usages, setUsages] = useState<IUsage[]>([]);
  const [costs, setCosts] = useState<ICost[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [filters, setFilters] = useState<IFilterState>({ type: "", model: "" });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const calculatedData = getCalculatedData(usages, costs);

    const filtered = filterCalculatedData(calculatedData, filters);

    const groupedData = d3.rollup(
      filtered,
      (v) => d3.sum(v, (d) => d.totalCost),
      (d) => d.created_at
    );

    const result = sortDataByTimePeriod(groupedData);

    const sortedData = [...result].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredData(sortedData);
  }, [usages, costs, filters]);

  const loadData = useCallback(async () => {
    try {
      const fetchedUsages = await fetchUsages();
      const fetchedCosts = await fetchCosts();

      setUsages(fetchedUsages);
      setCosts(fetchedCosts);
    } catch (e) {
      console.log("Error: ", e);
    }
  }, []);

  return (
    <div>
      <h1>Costs Of Usages By Time Period</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <Graph data={filteredData} />
    </div>
  );
};

export default App;
