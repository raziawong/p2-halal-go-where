import React from "react";
import { Container, Typography } from "@mui/material";
import banner from "../assets/image/banner.jpg";
import { HeroBanner, HeroOverlay } from "./utils/mgwStyle";
import LatestGrid from "./components/landing/LatestGrid";
import CategoriesStack from "./components/landing/CategoriesStack";

export default function Landing({
  latestArticles,
  allCategories,
  setFilterOpts,
  execSearch,
}) {
  return (
    <Container
      component="main"
      disableGutters
      maxWidth="xl"
      sx={{ width: "100vw" }}
    >
      <HeroBanner bgImg={banner}>
        <HeroOverlay>
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            sx={{
              direction: "rtl",
              textAlign: "center",
            }}
          >
            {"السلام عليكم"}
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            color="secondary"
            sx={{
              textAlign: "center",
            }}
          >
            {"As-salāmu ʿalaykum"}
          </Typography>
          <Typography
            component="h1"
            variant="h1"
            color="primary"
            sx={{
              textAlign: "center",
            }}
          >
            Muslim Go Where
          </Typography>
        </HeroOverlay>
      </HeroBanner>
      <LatestGrid latestArticles={latestArticles} />
      <CategoriesStack
        allCategories={allCategories}
        setFilterOpts={setFilterOpts}
        execSearch={execSearch}
      />
    </Container>
  );
}
