export interface IFilterState {
  type: string;
  model: string;
}

export interface IUsage extends IFilterState {
  created_at: string;
  usage_input: number;
  usage_output: number;
  totalCost: number;
}

export interface ICost {
  model: string;
  input: number;
  output: number;
}

export interface IFilterProps {
  filters: { type: string; model: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ type: string; model: string }>
  >;
}

export interface IDataState {
  date: string;
  totalCost: number;
}

export interface IGraphProps {
  data: IDataState[];
}

export interface IColorPickerProps {
  value: string;
  onChange: (val: string) => void;
}

export interface IChartPos {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
