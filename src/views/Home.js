import React, { Fragment } from "react";
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
import banner from "../assets/image/banner.jpg"
import { HeroBanner, HeroOverlay } from "../utils/mgwStyle";
import { SearchSharp } from "@mui/icons-material";

export default function Home(props) {
  const { searchText, setOpts, execSearch } = props;

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <HeroBanner bgImg={banner}>
          <HeroOverlay>
            <FormControl>
              <OutlinedInput
                id="home-search"
                name="stext"
                label="Search"
                arial-label="Search"
                value={searchText}
                onChange={setOpts}
                onKeyDown={execSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="Submit Search"
                      onClick={execSearch}
                      onMouseDown={execSearch}
                      onKeyDown={execSearch}
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
    </Fragment>
  );
}
