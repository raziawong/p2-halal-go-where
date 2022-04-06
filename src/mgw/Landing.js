import React from "react";
import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
  OutlinedInput,
} from "@mui/material";
import banner from "../assets/image/banner.jpg";
import { HeroBanner, HeroOverlay } from "./utils/mgwStyle";
import { SearchSharp } from "@mui/icons-material";
import helper from "./utils/helper";

export default function Landing({ filterOpts, setFilterOpts, detectSearch }) {
  return (
    <Container disableGutters>
      <HeroBanner bgImg={banner}>
        <HeroOverlay>
          <FormControl>
            <OutlinedInput
              id="home-search"
              name="text"
              label="Search"
              arial-label="Search"
              value={filterOpts.text}
              onChange={(evt) => setFilterOpts(evt.target)}
              onKeyDown={(evt) => detectSearch(evt, helper.exploreView)}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="Submit Search"
                    onClick={(evt) => detectSearch(evt, helper.exploreView)}
                    onMouseDown={(evt) => detectSearch(evt, helper.exploreView)}
                    onKeyDown={(evt) => detectSearch(evt, helper.exploreView)}
                  >
                    <SearchSharp sx={{ color: "white", mr: 1, my: 0.5 }} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
