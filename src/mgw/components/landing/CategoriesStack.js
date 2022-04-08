import React from "react";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { mgwCategoriesMap } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import helper from "../../utils/helper";

export default function CategoriesStack({
  allCategories,
  setMgwState,
  execSearch,
}) {
  const navgigate = useNavigate();
  const handleClick = (evt, id) => {
    setMgwState({ filterOpts: { ...helper.initFilterOpts, catIds: [id]} });
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
            <Paper
              sx={{
                height: "45vh",
                backgroundImage: `url(${v.banner})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                boxShadow: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  bgcolor: "rgba(108, 122, 137, 0.4)",
                }}
              >
                <Typography component="h3" variant="h2" color="#F7F7FF" sx={{textAlign: "center"}}>
                  {v.title}
                </Typography>
              </Box>
            </Paper>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
