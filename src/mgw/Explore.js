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
    <Container
      component="main"
      disableGutters
      maxWidth="xl"
      sx={{ display: "flex", width: "100vw" }}
    >
      {!loaded ? (
        <></>
      ) : (
        <Fragment>
          <Box component="section" sx={{ minWidth: "30vw", m: 4 }}>
            <SortSelection
              sortIndex={sortIndex}
              sortAnchor={sortAnchor}
              setMgwState={setMgwState}
            />
            <FilterGroup
              detectSearch={detectSearch}
              filterOpts={filterOpts}
              setFilterOpts={setFilterOpts}
              countries={countries}
              categories={categories}
              setMgwState={setMgwState}
            />
          </Box>
          <Box
            sx={{
              maxHeight: "80vh",
              flexGrow: 1,
              my: 4,
              mx: 0.5,
              overflowY: "hidden",
            }}
          >
            <Box
              component="section"
              sx={{ overflowY: "scroll", height: "100%" }}
            >
              {articles.length ? (
                <Listing articles={articles} allCategories={categories} />
              ) : (
                <Typography component="h3" variant="h4">
                  No results found
                </Typography>
              )}
            </Box>
          </Box>
        </Fragment>
      )}
    </Container>
  );
}
