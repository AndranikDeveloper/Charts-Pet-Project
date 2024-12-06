import { ICost, IUsage } from "../shared/constants/types";

const parseDate = (dateString: string | null): Date | null => {
  if (!dateString) return null; 

  const parts = dateString.split('.');

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; 
  const year = parseInt(parts[2], 10);

  const dateValue = new Date(year, month, day);

  if (isNaN(dateValue.getTime())) {
    console.error('Invalid date created from:', dateString);
    return null;
  }

  return dateValue;
};

export const getCalculatedData = (usages: IUsage[], costs: ICost[]) => {
  return usages
    .map((usage) => {
      const cost = costs.find((c) => c.model === usage.model);
      const totalCost =
        (cost?.input || 0) * usage.usage_input +
        (cost?.output || 0) * usage.usage_output;

      const dateValue = parseDate(usage.created_at);

      if (!dateValue) {
        console.error('Invalid created_at date for usage:', usage);
        return null;
      }

      return {
        ...usage,
        totalCost,
        created_at: dateValue.toISOString(),
      };
    })
    .filter((usage): usage is IUsage => usage !== null);
};