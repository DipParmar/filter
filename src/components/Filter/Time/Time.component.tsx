import React, { useCallback, useContext } from "react";
import FilterContext from "../Filter.context";

const oneDay = 24 * 60 * 60 * 1000;
const time = [
  { label: "Last 24 Hours", value: oneDay },
  { label: "Last 72 Hours", value: oneDay * 3 },
  { label: "Last Week", value: oneDay * 7 },
  { label: "Last 6 Months", value: oneDay * 180 }
];

export default function Time() {
  const { filterState, updateState } = useContext<any>(FilterContext);

  const udpateFilterData = useCallback((label, value) => {
    updateState({ name: "time", data: [{ value: value, filterLabel: label }] });
  }, [filterState]);

  return (
    <section className='time'>
      <header>
        <h2 className='header-title'>Time</h2>
      </header>
      <main>
        {time.map(({ label, value }) => {
          return (
            <div key={label}>
              <input
                type="radio"
                id={Number(value).toString()}
                name="time"
                value={value}
                checked={filterState.time?.at(0)?.value === value}
                onChange={() => udpateFilterData(label, value)}
              />
              <label htmlFor={Number(value).toString()}>{label}</label>
            </div>
          );
        })}
      </main>
    </section>
  );
}
