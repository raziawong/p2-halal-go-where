import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Container disableGutters maxWidth="xl" sx={{width: "100vw"}}>
      <Box sx={{ m: 4 }}>
        <Typography component="h1" variant="h2">
          404 Not Found
        </Typography>
        <Typography component="p" variant="h4">
          Sorry, this page doesn't exist.
        </Typography>
      </Box>
    </Container>
  );
}
