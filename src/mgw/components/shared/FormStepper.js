import React from "react";
import { Container } from "@mui/material";
import HorizontalStepper from "./HorizontalStepper";
import CompactStepper from "./CompactStepper";

export default function FormStepper (props) {
  return (
    <Container disableGutters sx={{maxWidth: "100vw"}}>
        <HorizontalStepper {...props} />
        <CompactStepper {...props} />
    </Container>
  );
}