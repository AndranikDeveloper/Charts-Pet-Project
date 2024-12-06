import React from "react";
import { IFilterProps } from "../../shared/constants/types";
import "./Filters.css";
import {
  EMPTY_OPTION_VALUE,
  FIRST_MODEL_OPTION_VALUE,
  FIRST_OPTION_VALUE,
  SECOND_MODEL_OPTION_VALUE,
  SECOND_OPTION_VALUE,
  THIRD_MODEL_OPTION_VALUE,
  THIRD_OPTION_VALUE,
} from "../../shared/constants";

const Filter: React.FC<IFilterProps> = ({ filters, setFilters }) => {
  return (
    <div className="filters-container">
      <h3 className="filters-container-title">
        Here you can choose options to filter
      </h3>
      <div className="filters-label-container">
        <label className="filters-label">
          Type:
          <select
            className="filters-select"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value={EMPTY_OPTION_VALUE}>All</option>
            <option value={FIRST_OPTION_VALUE}>First</option>
            <option value={SECOND_OPTION_VALUE}>Second</option>
            <option value={THIRD_OPTION_VALUE}>Third</option>
          </select>
        </label>
        <label className="filters-label">
          Model:
          <select
            className="filters-select"
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
          >
            <option value={EMPTY_OPTION_VALUE}>All</option>
            <option value={FIRST_MODEL_OPTION_VALUE}>Model 1</option>
            <option value={SECOND_MODEL_OPTION_VALUE}>Model 2</option>
            <option value={THIRD_MODEL_OPTION_VALUE}>Model 3</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filter;
