import React from "react";
import { Container } from "@mui/material";
import HorizontalStepper from "./HorizontalStepper";
import CompactStepper from "./CompactStepper";

export default function FormStepper (props) {
  return (
    <Container disableGutters maxWidth="xl" sx={{width: "100vw"}}>
        <HorizontalStepper {...props} />
        <CompactStepper {...props} />
    </Container>
  );
}