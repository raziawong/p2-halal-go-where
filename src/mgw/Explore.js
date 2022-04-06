import React, { Fragment, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import FilterGroup from "./components/explore/FilterGroup";
import Listing from "./components/explore/Listing";

export default function Explore({
  setMgwState,
  setFilterOpts,
  detectFilter,
  detectSearch,
  filterOpts,
  countries,
  categories,
  articles,
  loaded,
}) {
  useEffect(() => {
    return setMgwState({ isRedirectListing: false });
  }, [setMgwState]);
  return (
    <Container disableGutters>
      {!loaded ? (
        <></>
      ) : (
        <Fragment>
          <Box sx={{ m: 4 }}>
            <FilterGroup
              detectFilter={detectFilter}
              detectSearch={detectSearch}
              filterOpts={filterOpts}
              countries={countries}
              categories={categories}
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
