import React, { Fragment } from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import { FilterListSharp } from "@mui/icons-material";
import ActionGroup from "./components/explore/ActionGroup";
import Listing from "./components/explore/Listing";
import ActionModal from "./components/explore/ActionModal";

export default function Explore({
  setMgwState,
  setFilterOpts,
  detectSearch,
  filterOpts,
  pageNumber,
  sortIndex,
  sortAnchor,
  countries,
  categories,
  actionModal,
  articles,
  articlesTotal,
  loaded,
  collectionAction,
  collectionModal,
  curateState,
  curateErrors,
  validateCurate,
  requestSuccess
}) {
  const handleFabClick = () => {
    setMgwState({
      actionModal: !actionModal,
    });
  };
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
          <Box
            component="section"
            sx={{
              display: { xs: "none", md: "block" },
              minWidth: { xs: "30vw", xl: "30%" },
              width: { xs: "30vw", xl: "30%" },
              m: 4,
            }}
          >
            <ActionGroup
              setMgwState={setMgwState}
              setFilterOpts={setFilterOpts}
              detectSearch={detectSearch}
              filterOpts={filterOpts}
              sortIndex={sortIndex}
              sortAnchor={sortAnchor}
              countries={countries}
              categories={categories}
            />
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: 28,
              right: 12,
              display: { xs: "block", md: "none" },
              "& > :not(style)": { m: 1 },
            }}
          >
            <Fab
              size="small"
              aria-label="search actions"
              onClick={handleFabClick}
            >
              <FilterListSharp color="primary" />
            </Fab>
            <ActionModal
              actionModal={actionModal}
              setMgwState={setMgwState}
              setFilterOpts={setFilterOpts}
              detectSearch={detectSearch}
              filterOpts={filterOpts}
              sortIndex={sortIndex}
              sortAnchor={sortAnchor}
              countries={countries}
              categories={categories}
            />
          </Box>
          <Box
            sx={{
              maxHeight: { xs: "88vh", md: "88vh" },
              flexGrow: 1,
              p: {xs: 0, md: 0.4},
              ml: { xs: 1.2, md: 0 },
              mt: { xs: 1.5, md: 0.5 },
              overflowY: "hidden",
            }}
          >
            <Box
              component="section"
              sx={{ overflowY: "scroll", height: "100%"}}
            >
              {articles.length ? (
                <Listing
                  articles={articles}
                  articlesTotal={articlesTotal}
                  pageNumber={pageNumber}
                  setMgwState={setMgwState}
                  collectionAction={collectionAction}
                  collectionModal={collectionModal}
                  curateState={curateState}
                  curateErrors={curateErrors}
                  validateCurate={validateCurate}
                  requestSuccess={requestSuccess}
                />
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