import React from "react";
import { Grid, TextField } from "@mui/material";

export default function NewComment({
  commentState,
  setCommentState,
  commentError,
}) {
  return (
    <Grid container spacing={1} sx={{ my: 2, justifyContent: "center" }}>
      <Grid item xs={10} lg={6}>
        <TextField
          fullWidth
          required
          size="small"
          label="Name"
          arial-label="Name"
          name="name"
          value={commentState.name}
          onChange={setCommentState}
          error={!!commentError?.name}
          helperText={commentError?.name}
        />
      </Grid>
      <Grid item xs={10} lg={6}>
        <TextField
          fullWidth
          required
          size="small"
          label="Email"
          arial-label="email"
          name="email"
          value={commentState.email}
          onChange={setCommentState}
          error={!!commentError?.email}
          helperText={commentError?.email}
        />
      </Grid>
      <Grid item xs={10} lg={12}>
        <TextField
          fullWidth
          size="small"
          label="Title"
          arial-label="Title"
          name="title"
          value={commentState.title}
          onChange={setCommentState}
          error={!!commentError?.title}
          helperText={commentError?.title}
        />
      </Grid>
      <Grid item xs={10} lg={12}>
        <TextField
          fullWidth
          required
          multiline
          size="small"
          minRows={3}
          label="Comment"
          arial-label="Comment"
          name="content"
          value={commentState.content}
          onChange={setCommentState}
          error={!!commentError?.content}
          helperText={commentError?.content}
        />
      </Grid>
    </Grid>
  );
}
