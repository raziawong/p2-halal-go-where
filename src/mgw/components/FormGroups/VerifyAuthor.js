import React from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";

export default function VerifyAuthor({
  type,
  articleState,
  setArticleState,
  articleError,
  userVerifyErrorMsg
}) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      sx={{ maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography sx={{ padding: "1em" }}>
            Please enter the same email that was used for submission for
            verifying permission.
          </Typography>
          {type === "delete" && (
            <Typography sx={{ padding: "1em" }}>
              Note that only the creator of the article has permission to
              delete.
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          required
          label="Email"
          aria-label="Email"
          name="email"
          value={articleState.email}
          onChange={setArticleState}
          error={!!userVerifyErrorMsg || !!articleError?.email}
          helperText={userVerifyErrorMsg || articleError?.email}
        />
      </Grid>
    </Grid>
  );
}
