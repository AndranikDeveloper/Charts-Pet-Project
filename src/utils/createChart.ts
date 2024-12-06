import * as d3 from "d3";
import {
  AXIS,
  BAR,
  CHART_POS_BOTTOM,
  CHART_POS_LEFT,
  CHART_POS_RIGHT,
  CHART_POS_TOP,
  DX_ATTR_VALUE,
  DY_ATTR_VALUE,
  MIDDLE,
  X_AXIS,
} from "../shared/constants";
import { IChartPos, IDataState } from "../shared/constants/types";
import { getSelectedSvg } from "./selectSvg";

export const createChart = (data: IDataState[], barColor: string) => {
  const svg = getSelectedSvg();
  svg.selectAll("*").remove();

  const formattedData = data.map(d => ({
    ...d,
    date: d3.timeFormat("%m/%d")(new Date(d.date))
}));

  const chartPosition: IChartPos = {
    top: CHART_POS_TOP,
    bottom: CHART_POS_BOTTOM,
    left: CHART_POS_LEFT,
    right: CHART_POS_RIGHT,
  };
  const width =
    parseInt(svg.style("width")) - chartPosition.left - chartPosition.right;
  const height =
    +svg.attr("height") - chartPosition.top - chartPosition.bottom - 30;

  const g = svg
    .append("g")
    .attr("transform", `translate(${chartPosition.left},${chartPosition.top})`);

  const x = d3
    .scaleBand()
    .domain(formattedData.map((d) => d.date))
    .range([0, width])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(formattedData, (d) => d.totalCost)!])
    .nice()
    .range([height, 0])

  g.selectAll(`.${BAR}`)
    .data(formattedData)
    .enter()
    .append("rect")
    .attr("class", BAR)
    .attr("x", (d) => x(d.date)!)
    .attr("y", (d) => y(d.totalCost))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.totalCost))
    .attr("fill", barColor);

  const xAxisGroup = g
    .append("g")
    .attr("class", `${AXIS} ${X_AXIS}`)
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

    xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", MIDDLE)
    .attr("dx", DX_ATTR_VALUE) 
    .attr("dy", DY_ATTR_VALUE) 
    .style("font-size", "10px")


  g.append("g").attr("class", `${AXIS} ${X_AXIS}`).call(d3.axisLeft(y));
};
