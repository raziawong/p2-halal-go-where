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
      spacing={{ xs: 3, md: 4 }}
      sx={{ maxWidth: "100vw", justifyContent: "center" }}
    >
      <Grid item xs={12}>
        <Paper elevation={3}>
          <Typography
            sx={{
              padding: "1em",
              display:
                !articleState.allowPublic && type !== "delete"
                  ? "block"
                  : "none",
            }}
          >
            Please enter the same email that was used for submission for
            verifying permission.
          </Typography>
          <Typography
            sx={{
              padding: "1em",
              display:
                articleState.allowPublic && type !== "delete"
                  ? "block"
                  : "none",
            }}
          >
            Creator have allowed public to contribute, please provide at least
            email and contact name to register and proceed. For registered
            users, kindly enter only the email used before to proceed.
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
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          display:
            articleState.allowPublic && type !== "delete" ? "block" : "none",
        }}
      >
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
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          display:
            articleState.allowPublic && type !== "delete" ? "block" : "none",
        }}
      >
        <TextField
          fullWidth
          label="Contact Name"
          aria-label="Contact Name"
          name="name"
          value={articleState.name}
          onChange={setArticleState}
          error={!!articleError?.name}
          helperText={articleError?.name}
        />
      </Grid>
    </Grid>
  );
}
