import React from "react";
import { Box, ListItem, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import helper from "../../utils/helper";

export default function ArticleChips({
  categories,
  subCategories,
  userTags,
  setMgwState,
  execSearch,
}) {
  const navgigate = useNavigate();
  const handleClick = (evt, filterName, filterVal) => {
    const opt = filterName === "text" ? {[filterName] : filterVal} : {[filterName]: [filterVal]};
    setMgwState({ filterOpts: { ...helper.initFilterOpts, ...opt} });
    execSearch(helper.exploreView);
    navgigate("/explore");
  };
  return (
    <Box
      component="ul"
      sx={{
        py: 3,
        px: 3,
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
          <Chip
            variant="outlined"
            color="tertiary"
            label={tag.name}
            onClick={(evt) => handleClick(evt, "catIds", tag._id)}
          />
        </ListItem>
      ))}
      {subCategories?.map((tag, i) => (
        <ListItem
          key={tag._id}
          sx={{ marginLeft: "3px", width: "fit-content" }}
        >
          <Chip
            variant="outlined"
            color="secondary"
            label={tag.name}
            onClick={(evt) =>  handleClick(evt, "subcatIds", tag._id)}
          />
        </ListItem>
      ))}
      {userTags?.map((tag, i) => (
        <ListItem key={tag} sx={{ marginLeft: "3px", width: "fit-content" }}>
          <Chip
            variant="outlined"
            color="info"
            label={tag}
            onClick={(evt) =>  handleClick(evt, "text", tag)}
          />
        </ListItem>
      ))}
    </Box>
  );
}
