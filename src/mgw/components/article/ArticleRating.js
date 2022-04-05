import React from "react";
import { Alert, Box, Container, Rating, Snackbar, Typography } from "@mui/material";

export default function ArticleRating({
  articleId,
  avg,
  count,
  updateRating,
  requestError,
  setMgwState
}) {
  const handleClose = () => {
    setMgwState({
      requestError: ""
    });
  }
  const handleClick = (evt, newValue) => {
    updateRating(articleId, newValue);
  };
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          minWidth: "75%",
          mt: 2,
        }}
      >
        {requestError && (
          <Snackbar open={!!requestError} autoHideDuration={6000} onClose={handleClose}
          sx={{ bottom: 130, left: 10 }}>
            <Alert severity="error">{requestError}</Alert>
          </Snackbar>
        )}
        <Rating
          name="rating"
          aria-label="rating"
          precision={0.5}
          value={avg}
          onChange={handleClick}
        />
        <Typography component="legend">
          {count === 0 ? "No Rating" : `On ${count} Votes`}
        </Typography>
      </Box>
    </Container>
  );
}
