import { IFilterState, IUsage } from "../shared/constants/types";

export const filterCalculatedData = (
  calculatedData: IUsage[],
  filters: IFilterState
) => {
  return calculatedData.filter((item) => {
    const typeMatch = filters.type ? item.type === filters.type : true;
    const modelMatch = filters.model ? item.model === filters.model : true;
    return typeMatch && modelMatch;
  });
};
