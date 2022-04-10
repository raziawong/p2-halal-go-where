import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <AppBar component="footer" position="static">
      <Toolbar>
        <Typography variant="overline" color="textPrimary" sx={{fontSize: {xs: "0.5rem", md: "0.75rem"}}}>
          All articles are public contributions and may be moderated.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
