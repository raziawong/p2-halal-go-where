import React from "react";
import { Grid, Button, Paper, TextField, Typography } from "@mui/material";
import helper from "../../utils/helper";

export default function CurateFields({
  collectionAction,
  curateState,
  curateErrors,
  validateCurate,
  setMgwState,
}) {
  const handleChange = ({ target }) => {
    const updated = { ...curateState, [target.name]: target.value };
    setMgwState({ curateInputs: updated });
  };
  const handleClick = () => {
    validateCurate(helper.curateSteps[0].fields);
  };
  return (
    <Grid
      container
      spacing={{ xs: 3, md: 4 }}
      sx={{ px: 2, maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12} md={11}>
        <Paper elevation={3}>
          <Typography
            sx={{
              padding: "1em",
            }}
          >
            Please enter email to store to/retrieve from collection
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
          error={!!curateErrors?.curateEmail}
          helperText={curateErrors?.curateEmail}
        />
      </Grid>
      <Grid
        item
        xs={12} md={8}
        sx={{ display: "flex", justifyContent: "flex-end", pt: 5 }}
      >
        <Button
          aria-label={`${collectionAction} collection`}
          onClick={handleClick}
          variant="contained"
        >
          {collectionAction === "delete"
            ? "Confirm"
            : collectionAction === "add"
            ? "Add"
            : "Retrieve"}
        </Button>
      </Grid>
    </Grid>
  );
}
