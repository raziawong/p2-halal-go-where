import React, { Fragment } from "react";
import helper from "../../utils/helper";
import { Grid, Pagination, Typography } from "@mui/material";
import ArticleMasonry from "../shared/ArticleMasonry";

export default function Listing({
  articles,
  articlesTotal,
  pageNumber,
  setMgwState,
  curateState,
}) {
  const showPagination = articlesTotal > helper.articlesLimit;
  const pageCount = Math.ceil(articlesTotal / helper.articlesLimit);
  const handleChange = (evt, val) => {
    setMgwState({
      pageNumber: val,
    });
  };
  return (
    <Fragment>
      <Typography component="p" variant="subtitle1" sx={{ pb: 2 }}>
        {`Displaying ${articles.length} `}
        {showPagination ? `of ${articlesTotal} results` : "result(s)"}
      </Typography>
      <ArticleMasonry
        articles={articles}
        type={helper.exploreView}
        setMgwState={setMgwState}
        curateState={curateState}
      />
      {showPagination ? (
        <Grid container sx={{ py: 2, mb: 4 }}>
          <Grid item xs={12}>
            <Pagination
              size="large"
              showFirstButton={pageCount > 3}
              showLastButton={pageCount > 3}
              count={pageCount}
              page={pageNumber}
              onChange={handleChange}
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </Grid>
        </Grid>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
