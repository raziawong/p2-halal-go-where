import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { mgwCategoriesMap } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import helper from "../../utils/helper";
import {
  CatStackHeader,
  CatStackItem,
  CatStackOverlay,
} from "../../utils/mgwStyle";

export default function CategoriesStack({
  allCategories,
  setMgwState,
  execSearch,
}) {
  const navgigate = useNavigate();
  const handleClick = (evt, id) => {
    setMgwState({ filterOpts: { ...helper.initFilterOpts, catIds: [id] } });
    execSearch(helper.exploreView);
    navgigate("/explore");
  };
  const findDBCat = (val) => allCategories.find((cat) => cat.value === val);
  return (
    <Box sx={{ m: 4, pt: 4 }}>
      <Typography component="h2" variant="h3">
        Explore Categories
      </Typography>
      <Stack sx={{ my: 2 }} spacing={2}>
        {Object.entries(mgwCategoriesMap).map(([k, v]) => (
          <Link
            key={k}
            sx={{ textDecoration: "none", cursor: "pointer" }}
            onClick={(evt) => handleClick(evt, findDBCat(v.value)?._id)}
          >
            <CatStackItem bgImg={v.banner}>
              <CatStackOverlay>
                <CatStackHeader component="h3">{v.title}</CatStackHeader>
              </CatStackOverlay>
            </CatStackItem>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
