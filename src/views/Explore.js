import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { SearchSharp } from "@mui/icons-material";

export default function Explore(props) {
  const [mount, setMount] = useState(false);
  const {
    redirect,
    searchOpts,
    setOpts,
    execSearch,
    countries,
    categories,
    articles,
  } = props;

  useEffect(() => {
    if (!mount) {
      setMount(true);
      redirect(false);
    }
  }, [redirect, mount]);

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="search">Search</InputLabel>
            <OutlinedInput
              id="explore-search"
              arial-label="Search"
              name="stext"
              value={searchOpts.stext}
              onChange={setOpts}
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="country">Country</InputLabel>
            <Select label="Country"
              id="explore-country"
              arial-label="Country"
              name="country"
              value={searchOpts.country}
              onChange={setOpts}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {countries.results.map((country) => (
                <MenuItem key={country._id} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="categories">Categories</InputLabel>
            <Select 
              label="categories"
              arial-label="Categories"
              name="categories"
              value={searchOpts.categories}
              onChange={setOpts}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {categories.results.map((cat) => (
                <MenuItem key={cat._id} value={cat.value}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
    </Fragment>
  );
}
