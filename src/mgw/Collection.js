import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CurateFields from "./components/formfields/CurateFields";
import ArticleMasonry from "./components/shared/ArticleMasonry";
import helper from "./utils/helper";

export default function Collection(props) {
  return (
    <Container
      component="main"
      disableGutters
      maxWidth="xl"
      sx={{ width: "100vw" }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
        <CurateFields {...props} />
      </Box>
      <Box component="section" sx={{ pt: 4, px: { xs: 3, md: 10 } }}>
        {props.curatedFetched && props.curateState.curateEmail && (
          <ArticleMasonry
            {...props}
            articles={props.curatedFetched}
            type={helper.collectionView}
          />
        )}
        {!props.curatedFetched.length && (
          <Typography component="h3" variant="h4">
            No results found
          </Typography>
        )}
      </Box>
    </Container>
  );
}
