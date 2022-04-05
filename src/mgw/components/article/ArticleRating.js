import React from "react";
import { Box, Container, Rating, Typography } from "@mui/material";

export default function ArticleRating({
  articleId,
  avg,
  count,
  updateRating
}) {
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
