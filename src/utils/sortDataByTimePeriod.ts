export const sortDataByTimePeriod = (groupedData: any) => {
  return Array.from(groupedData, ([date, totalCost]) => ({
    date,
    totalCost,
  }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((d) => d.totalCost);
};
