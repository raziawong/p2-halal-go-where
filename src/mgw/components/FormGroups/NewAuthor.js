import React from "react";
import { Grid, Paper, Switch, TextField, Typography } from "@mui/material";

export default function NewAuthor({
  articleState,
  setArticleState,
  articleError,
}) {
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={11}>
        <Paper elevation={3}>
          <Typography sx={{ padding: "1rem" }}>
            MGW require all submissions to have at least contact name and email
            for editing verification and administrative communication purposes.
          </Typography>
          <Typography sx={{ padding: "1rem" }}>
            All Author information will not be modifiable once submitted.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Display Name"
          aria-label="Display Name"
          name="displayName"
          value={articleState.displayName}
          onChange={setArticleState}
          error={!!articleError?.displayName}
          helperText={articleError?.displayName}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth required
          label="Contact Name"
          aria-label="Contact Name"
          name="name"
          value={articleState.name}
          onChange={setArticleState}
          error={!!articleError?.name}
          helperText={articleError?.name}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth required
          label="Email"
          aria-label="Email"
          name="email"
          value={articleState.email}
          onChange={setArticleState}
          error={!!articleError?.email}
          helperText={articleError?.email}
        />
      </Grid>
      <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
        <Switch
          inputProps={{ "aria-label": "Allow Public Edits?" }}
          name="allowPublic"
          checked={articleState.allowPublic}
          onChange={setArticleState}
        />
        <Typography color="secondary">Allow Public Edits?</Typography>
      </Grid>
    </Grid>
  );
}
