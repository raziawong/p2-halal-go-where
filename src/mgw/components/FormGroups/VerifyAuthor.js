import { Grid, Paper, Switch, TextField, Typography } from "@mui/material";

export default function VerifyAuthor({
  articleState,
  setArticleState,
  articleError,
}) {
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={10}>
        <Paper elevation={3}>
          <Typography sx={{ padding: "1em" }}>
            Please enter the same email that was used for submission for verifying editing permission.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          required
          label="Email"
          aria-label="Email"
          name="email"
          value={articleState.email}
          onChange={setArticleState}
          error={!!articleError?.email}
          helperText={articleError?.email}
        />
      </Grid>
    </Grid>
  );
}
