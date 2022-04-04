import React, { Fragment, useEffect } from "react";
import { Box, Container } from "@mui/material";
import HorizontalStepper from "./components/shared/HorizontalStepper";

export default function Create(props) {
  const {setMgwState} = props;
  useEffect(() => {
    setMgwState({ articlePosted: "" });
  }, [setMgwState]);

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <HorizontalStepper {...props} type="create"/>
        </Box>
      </Container>
    </Fragment>
  );
}
