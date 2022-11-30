import React from "react";
import Filter, { eSeverity } from "../components/Filter/Filter.component";

export default {
  title: "Filter",
  component: Filter
};

const items = new Array(50).fill(0).map((_, i) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const time = new Date(Date.now() - oneDay * Math.floor(Math.random() * 8));
  const itemName = `${i}`;

  if (Math.random() > 0.5) {
    return { itemName, severity: eSeverity.LOW, time };
  } else if (Math.random() < 0.2) {
    return { itemName, severity: eSeverity.MEDIUM, time };
  } else {
    return { itemName, severity: eSeverity.HIGH, time };
  }
});

export const FilterExample = () => (
  <Filter
    items={items}
    onChange={(filteredItems) => {
      console.info(filteredItems);
    }}
  ></Filter>
);
