import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  sortIndex,
  sortAnchor,
  countries,
  categories,
  actionModal,
  articles,
  loaded,
}) {
  const params = useParams();

  useEffect(() => {
    return setMgwState({
      pageIndex: params.page
    });
  }, [setMgwState]);

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
              minWidth: "30vw",
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
              maxHeight: { xs: "88vh", md: "80vh" },
              flexGrow: 1,
              my: { xs: 1, md: 4 },
              mx: { xs: 1, md: 0.5 },
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
