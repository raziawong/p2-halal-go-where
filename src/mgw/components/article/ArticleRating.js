import React, { Fragment } from "react";
import { Rating, Typography } from "@mui/material";

export default function ArticleRating({ articleId, avg, count, updateRating }) {
  const handleClick = (evt, newValue) => {
    updateRating(articleId, newValue);
  };
  return (
    <Fragment>
        <Rating
          name="rating"
          aria-label="rating"
          precision={0.5}
          value={avg}
          onChange={handleClick}
        />
        <Typography component="legend" sx={{ marginLeft: "5px" }}>
          {count === 0 ? "No Rating" : `On ${count} Vote(s)`}
        </Typography>
    </Fragment>
  );
}
