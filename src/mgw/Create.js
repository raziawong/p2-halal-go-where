import React, { Fragment } from "react";
import { Box, Container } from "@mui/material";
import HorizontalStepper from "./components/create/HorizontalStepper";

export default function Create(props) {
  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <HorizontalStepper {...props} />
        </Box>
      </Container>
    </Fragment>
  );
}
