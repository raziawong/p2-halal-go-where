import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import banner from "../assets/image/banner.jpg";
import { HeroBanner, HeroOverlay } from "./utils/mgwStyle";

export default function Landing({ filterOpts, setFilterOpts, detectSearch }) {
  return (
    <Container component="main" disableGutters  maxWidth="xl" sx={{width: "100vw"}}>
      <HeroBanner bgImg={banner}>
        <HeroOverlay>
          <Typography component="h4" variant="h4" color="secondary" sx={{
            pl: {xs: 2, sm: 0}, direction: "rtl", textAlign: "center"
          }}>
            {"السلام عليكم"}
          </Typography>
          <Typography component="h4" variant="h4" color="secondary" sx={{
            pl: {xs: 2, sm: 0}, textAlign: "center"
          }}>
            {"As-salāmu ʿalaykum"}
          </Typography>
          <Typography component="h1" variant="h1" color="primary" sx={{
            pl: {xs: 2, sm: 0}, textAlign: "center"
          }}>
            Muslim Go Where
          </Typography>
        </HeroOverlay>
      </HeroBanner>
      <Box sx={{ m: 2 }}>
        <Typography component="h2" variant="h3">
          What's New
        </Typography>
      </Box>
      <Box sx={{ m: 2 }}>
        <Typography component="h2" variant="h3">
          Categories
        </Typography>
        <Stack spacing={2}>
          <Box id="">
            <Typography component="h3" variant="4">
              Attractions
            </Typography>
          </Box>
          <Box>
            <Typography component="h3" variant="4">
              Mosques
            </Typography>
          </Box>
          <Box>
            <Typography component="h3" variant="4">
              Praying Spaces
            </Typography>
          </Box>
          <Box>
            <Typography component="h3" variant="4">
              Food
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
