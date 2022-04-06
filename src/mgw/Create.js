import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import HorizontalStepper from "./components/shared/HorizontalStepper";

export default function Create(props) {
  const { setMgwState } = props;
  useEffect(() => {
    return setMgwState({ articlePosted: "" });
  }, [setMgwState]);

  return (
    <Container disableGutters>
      <Box sx={{ m: 4 }}>
        <HorizontalStepper {...props} type="create" />
      </Box>
    </Container>
  );
}
