import React, { Fragment, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import FilterGroup from "./components/explore/FilterGroup";
import Listing from "./components/explore/Listing";
import SortSelection from "./components/explore/SortSelection";

export default function Explore({
  setMgwState,
  setFilterOpts,
  detectSearch,
  filterOpts,
  sortIndex,
  sortAnchor,
  countries,
  categories,
  articles,
  loaded,
}) {
  useEffect(() => {
    return setMgwState({ isRedirectListing: false });
  }, [setMgwState]);
  return (
    <Container disableGutters maxWidth="xl" sx={{width: "100vw"}}>
      {!loaded ? (
        <></>
      ) : (
        <Fragment>
          <Box sx={{ m: 4 }}>
            <FilterGroup
              detectSearch={detectSearch}
              filterOpts={filterOpts}
              setFilterOpts={setFilterOpts}
              countries={countries}
              categories={categories}
            />
            <SortSelection 
              sortIndex={sortIndex}
              sortAnchor={sortAnchor}
              setMgwState={setMgwState}
            />
          </Box>
          <Box sx={{ m: 4 }}>
            {articles.length ? (
              <Listing articles={articles} allCategories={categories} />
            ) : (
              <Typography component="h3" variant="h4">
                No results found
              </Typography>
            )}
          </Box>
        </Fragment>
      )}
    </Container>
  );
}
