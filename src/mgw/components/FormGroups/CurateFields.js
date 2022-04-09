import React from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";

export default function CurateFields({
  curateState,
  curateErrors,
  setMgwState,
}) {
  const handleChange = ({ target }) => {
    const updated = { ...curateState, [target.name]: target.value };
    setMgwState({ curateInputs: updated });
  };
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      sx={{ maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography
            sx={{
              padding: "1em",
            }}
          >
            Please enter email to store/retrieve curated list
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          required
          label="Email"
          aria-label="Email"
          name="curateEmail"
          value={curateState.curateEmail}
          onChange={handleChange}
          error={!!curateErrors?.email}
          helperText={curateErrors?.email}
        />
      </Grid>
    </Grid>
  );
}
