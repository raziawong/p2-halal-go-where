import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Box
  } from "@mui/material";

export default function Article() {
  const params = useParams();

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4, display: "flex" }}>
            Article {params.id}
        </Box>
      </Container>
    </Fragment>
  );
}
