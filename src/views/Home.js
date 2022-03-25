import React from "react";
import {
  Box, Container, FormControl, InputAdornment,
  Typography, Stack, OutlinedInput
} from "@mui/material";
import { SearchSharp } from "@mui/icons-material";

export default function Home(props) {
  return (
    <React.Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box className="hero-banner" sx={{ my: 0 }}>
          <Box className="hero-overlay">
            <FormControl>
              <OutlinedInput
                id="home-search"
                arial-label="search"
                onChange={props.searchText}
                onKeyDown={props.search}
                onClick={props.search}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchSharp sx={{ color: "white", mr: 1, my: 0.5 }} />
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
