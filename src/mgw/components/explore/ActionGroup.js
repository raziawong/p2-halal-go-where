import React, { Fragment } from "react";
import SortSelection from "./SortSelection";
import FilterOptions from "./FilterOptions";

export default function ActionGroup({
  detectSearch,
  filterOpts,
  setFilterOpts,
  countries,
  categories,
  setMgwState,
  sortIndex,
  sortAnchor,
}) {
  return (
    <Fragment>
      <SortSelection
        sortIndex={sortIndex}
        sortAnchor={sortAnchor}
        setMgwState={setMgwState}
      />
      <FilterOptions
        detectSearch={detectSearch}
        filterOpts={filterOpts}
        setFilterOpts={setFilterOpts}
        countries={countries}
        categories={categories}
        setMgwState={setMgwState}
      />
    </Fragment>
  );
}
