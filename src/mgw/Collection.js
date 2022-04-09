import React from "react";
import { Box, Container, Divider } from "@mui/material";
import CurateFields from "./components/formgroups/CurateFields";
import ArticleMasonry from "./components/shared/ArticleMasonry";

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
      <Box>
        <Divider />
        {props.curatedFetched && <ArticleMasonry {...props} articles={props.curatedFetched} />}
      </Box>
    </Container>
  );
}
