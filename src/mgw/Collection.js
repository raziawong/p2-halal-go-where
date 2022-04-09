import React from "react";
import { Box, Container } from "@mui/material";
import CurateFields from "./components/formgroups/CurateFields";

export default function Collection(props) {
  return (
    <Container component="main" disableGutters maxWidth="xl" sx={{width: "100vw"}}>
      <Box sx={{display: "flex", justifyContent: "center", pt: 5}}>
      <CurateFields {...props}/>
      </Box>
    </Container>
  );
}
