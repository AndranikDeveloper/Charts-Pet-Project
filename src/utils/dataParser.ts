import Papa from "papaparse";
import { DATA_COSTS_CSV, DATA_USAGES_CSV } from "../shared/constants";
import { ICost, IUsage } from "../shared/constants/types";

export const fetchUsages = (): Promise<IUsage[]> => {
  return new Promise((res, rej) => {
    try {
      Papa.parse(DATA_USAGES_CSV, {
        download: true,
        header: true,
        complete: (results) => {
          const parsedData: (IUsage | null)[] = results.data.map((row: IUsage) => {
            if (!row.created_at || row.type === "" || isNaN(+row.usage_input) || isNaN(+row.usage_output)) {
              console.error('Invalid usage data:', row);
              return null; 
            }
            
           return {
            ...row,
            usage_input: +row.usage_input,
            usage_output: +row.usage_output,
           }
          });
          const filteredData: IUsage[] = parsedData.filter((item): item is IUsage => item !== null);
          res(filteredData);
        },
      });
    } catch (e) {
      rej(e);
    }
  });
};

export const fetchCosts = (): Promise<ICost[]> => {
  return new Promise((res, rej) => {
    try {
      Papa.parse(DATA_COSTS_CSV, {
        download: true,
        header: true,
        complete: (results) => {
          const parsedCosts: ICost[] = results.data.map((row: ICost) => ({
            model: row.model,
            input: +row.input,
            output: +row.output,
          }));
          res(parsedCosts);
        },
      });
    } catch (e) {
      rej(e);
    }
  });
};
