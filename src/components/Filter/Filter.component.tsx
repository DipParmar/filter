import React, { useCallback, useEffect, useState, FC } from "react";
import FilterUtility, {
  MultiSpecs,
  BySeverity,
  ByTime
} from "../../utils/Filter.utils";
import FilterContext from "./Filter.context";
import Severity, { eSeverity } from "./Severity/Severity.component";
import Time from "./Time/Time.component";

import "./Filter.component.css";

export type severityType = eSeverity.HIGH | eSeverity.MEDIUM | eSeverity.LOW;
export type itemsType = Array<{
  itemName: string;
  severity: severityType;
  time: Date;
}>;

interface IFilter {
  items: itemsType;
  onChange: (items: itemsType) => void;
}

const Filter: FC<IFilter> = ({ items, onChange }) => {
  const [filterState, setFilterState] = useState<any>({});
  const [filteredItems, setFilteredItems] = useState<any>(items || []);
  const [hideFilters, setHideFilters] = useState<boolean>(false);

  const resetFilter = useCallback(() => {
    setFilterState({});
  }, []);

  const updateState = useCallback(({ name, data }) => {
    setFilterState((state: any) => {
      const changedState = { [name]: data };

      return {
        ...state,
        ...changedState
      };
    });
  }, []);

  useEffect(() => {
    const filter = new FilterUtility();
    setFilteredItems(
      filter.filter(
        items,
        new MultiSpecs(
          new BySeverity(filterState.severity),
          new ByTime(filterState.time)
        )
      )
    );
  }, [filterState, items]);

  useEffect(() => {
    onChange(filteredItems);
  }, [filteredItems, onChange]);

  const getFilteredProperties = useCallback(() => {
    return Object.entries(filterState).map((usedFilters: any) => {
      return {
        filterName: usedFilters[0],
        filterValues: usedFilters[1].map(({ filterLabel }) => {
          return filterLabel
        })
      };
    });
  }, [filterState]);

  const appliedFilters = getFilteredProperties();

  return (
    <section className={`filter ${!hideFilters ? 'active' : ''}`}>
      <header>
        <button
          onClick={() => {
            setHideFilters((visible) => !visible);
          }}
          className='filter button'
        >
          <svg className='vector-icon' width="18" height="12" viewBox="0 0 18 12">
            <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#1967FF" />
          </svg>
          <span className='button-text'>Filter</span>
        </button>
        <ul className={`selected-filters ${hideFilters ? "hide-filters" : ""}`}>
          {appliedFilters.map(({ filterName, filterValues }) => {
            return filterValues.map((filterValue, i) => {
              return <li key={filterValue}>
                <span onClick={() => {
                  const data = filterState[filterName].filter((_, index) => i !== index);
                  updateState({ name: filterName, data })
                }} className='remove-filter-button'>x</span>
                <span className='filter-pills'>{filterName} : {filterValue}</span>
              </li>
            })
          })}
        </ul>
      </header>
      <main className={`${hideFilters ? "hide-filters" : ""}`}>
        <header>
          <h2>Filter data by</h2>
          <span className='reset-button' onClick={resetFilter}>Reset</span>
        </header>
        <FilterContext.Provider
          value={{
            filterState,
            updateState
          }}
        >
          <Severity />
          <Time />
        </FilterContext.Provider>
      </main>
    </section>
  );
};

export { eSeverity };
export default Filter;
