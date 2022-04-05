import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ m: 4 }}>
        <Typography component="h2" variant="h3">
          Sorry, this page doesn't exist.
        </Typography>
      </Box>
    </Container>
  );
}
