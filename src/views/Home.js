import React from "react";
import {
  Box, Container, FormControl, InputAdornment,
  IconButton, Typography, Stack, OutlinedInput
} from "@mui/material";
import { SearchSharp } from "@mui/icons-material";

export default function Home(props) {
  let { searchText, setOpts, execSearch } = props;

  return (
    <React.Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box className="hero-banner" sx={{ my: 0 }}>
          <Box className="hero-overlay">
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
                    >
                      <SearchSharp sx={{ color: "white", mr: 1, my: 0.5 }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Box>
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
    </React.Fragment>
  );
}
