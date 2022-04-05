import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export default function ConfirmDelete() {
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={10}>
        <Paper elevation={3}>
          <Typography sx={{ padding: "1em" }} variant="h6" color={"warning.light"}>
            Please note that this action is irreversible.
            Do you still want to proceed?
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
