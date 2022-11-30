import React, { useCallback } from "react";
import { useContext } from "react";
import FilterContext from "../Filter.context";

export enum eSeverity {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low"
}
const severities = [eSeverity.LOW, eSeverity.MEDIUM, eSeverity.HIGH];

export default function Severity() {
  const { filterState, updateState } = useContext<any>(FilterContext);

  const udpateFilterData = useCallback((event) => {
    const severity = Array.isArray(filterState?.severity) ? [...filterState.severity] : [];
    const filterName = event.target.value;

    const filteredSeverity = severity.filter(({ filterLabel }) => filterLabel !== filterName);

    if (event.target.checked) {
      filteredSeverity.push({
        filterLabel: filterName,
        value: event.target.checked
      })
    }
    updateState({
      name: "severity",
      data: filteredSeverity
    });
  }, [filterState]);

  return (
    <section className="severity">
      <header>
        <h2 className="header-title">Severity</h2>
      </header>
      <main>
        {severities.map((severity) => (
          <div key={severity}>
            <input
              type="checkbox"
              id={severity}
              value={severity}
              checked={filterState?.severity?.some(({ filterLabel, value }) => {
                if (filterLabel === severity) {
                  return value;
                }
              })}
              onChange={udpateFilterData}
            />
            <label htmlFor={severity}>{severity}</label>
          </div>
        ))
        }
      </main>
    </section >
  );
}
