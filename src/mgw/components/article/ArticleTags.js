import React from "react";
import { Box, ListItem, Chip } from "@mui/material";

export default function ArticleTags({ categories, subCategories, userTags }) {
  return (
    <Box
      component="ul"
      sx={{
        py: 3,
        px: 1,
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
      }}
    >
      {categories?.map((tag) => (
        <ListItem
          key={tag._id}
          sx={{ marginLeft: "3px", width: "fit-content" }}
        >
          <Chip variant="outlined" color="primary" label={tag.name} />
        </ListItem>
      ))}
      {subCategories?.map((tag, i) => (
        <ListItem
          key={tag._id}
          sx={{ marginLeft: "3px", width: "fit-content" }}
        >
          <Chip variant="outlined" color="secondary" label={tag.name} />
        </ListItem>
      ))}
      {userTags?.map((tag, i) => (
        <ListItem key={tag} sx={{ marginLeft: "3px", width: "fit-content" }}>
          <Chip variant="outlined" color="info" label={tag} />
        </ListItem>
      ))}
    </Box>
  );
}
