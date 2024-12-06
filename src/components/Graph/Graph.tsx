import React, { useState, useEffect } from "react";
import { IGraphProps } from "../../shared/constants/types";
import { ColorPicker } from "../../shared/ColorPicker/ColorPicker";
import { createChart } from "../../utils/createChart";
import { getSelectedSvg } from "../../utils/selectSvg";
import { BAR, BAR_DEFAULT_COLOR } from "../../shared/constants";

const Graph: React.FC<IGraphProps> = ({ data }) => {
  const [barColor, setBarColor] = useState(BAR_DEFAULT_COLOR);
  useEffect(() => {
    createChart(data, barColor);
  }, [data]);

  useEffect(() => {
    const svg = getSelectedSvg();
    svg.selectAll(`.${BAR}`).attr("fill", barColor);
  }, [barColor]);

  return (
    <div>
      <ColorPicker value={barColor} onChange={setBarColor} />
      <svg width="100%" height="400"></svg>
    </div>
  );
};

export default Graph;
