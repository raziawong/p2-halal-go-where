import React, { Fragment } from "react";
import helper from "../../utils/helper";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import SortSelection from "./SortSelection";

export default function FilterGroup({
  detectSearch,
  filterOpts,
  setFilterOpts,
  countries,
  categories,
  setMgwState,
}) {
  return (
    <Fragment>
      <Grid container spacing={2} sx={{alignItems: "center", mb: 2}}>
        <Grid item xs={6}>
          <Typography>Options</Typography>
        </Grid>
        <Grid item xs={3} sx={{textAlign: "right"}}>
          <Button
            type="submit"
            size="small"
            variant="contained"
            onClick={(evt) => detectSearch(evt, helper.exploreView)}
          >
            Filter
          </Button>
        </Grid>
        <Grid item xs={3} sx={{textAlign: "right"}}>
          <Button
            type="reset"
            size="small"
            variant="contained"
            color="secondary"
            onClick={(evt) => setMgwState({ filterOpts: {...helper.initFilterOpts }})}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search"
            arial-label="Search"
            name="text"
            value={filterOpts.text}
            onChange={(evt) => setFilterOpts(evt.target)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              fullWidth
              displayEmpty
              label="Country"
              arial-label="Country"
              labelId="categories-label"
              name="countryId"
              value={filterOpts.countryId}
              onChange={(evt) => setFilterOpts(evt.target)}
            >
              <MenuItem value=""></MenuItem>
              {helper.countryOptDisplay(countries)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="city-label">City</InputLabel>
            <Select
              fullWidth
              displayEmpty
              label="City"
              arial-label="City"
              labelId="city-label"
              name="cityId"
              value={filterOpts.cityId}
              onChange={(evt) => setFilterOpts(evt.target)}
            >
              <MenuItem value=""></MenuItem>
              {helper.cityOptDisplay(countries, filterOpts.countryId)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              multiple
              fullWidth
              displayEmpty
              label="Categories"
              arial-label="Categories"
              labelId="categories-label"
              name="catIds"
              value={filterOpts.catIds}
              onChange={(evt) => setFilterOpts(evt.target)}
              renderValue={(vals) =>
                vals.length
                  ? categories
                      .filter((c) => vals.includes(c._id))
                      .map((f) => f.name)
                      .join(", ")
                  : ""
              }
            >
              <MenuItem value=""></MenuItem>
              {helper.categoriesOptDispay(
                categories?.length > 0 ? categories : [],
                filterOpts.catIds
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="subcats-label">Sub-Categories</InputLabel>
            <Select
              multiple
              fullWidth
              displayEmpty
              labelId="subcats-label"
              label="Sub-Categories"
              arial-label="Sub-Categories"
              name="subcatIds"
              value={filterOpts.subcatIds}
              onChange={(evt) => setFilterOpts(evt.target)}
              renderValue={(vals) =>
                vals.length
                  ? categories
                      .reduce((pv, cv) => {
                        return pv.concat(
                          cv.subcats.filter((sc) => vals.includes(sc._id))
                        );
                      }, [])
                      .map((f) => f.name)
                      .join(", ")
                  : ""
              }
            >
              <MenuItem value=""></MenuItem>
              {helper.subcategoriesOptDispay(
                categories?.length > 0 ? categories : [],
                filterOpts.catIds,
                filterOpts.subcatIds
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 2 }}>
          <InputLabel>Rating</InputLabel>
          <FormControl sx={{ width: "98%", pl: 1 }}>
            <Slider
              id="explore-rating"
              marks={helper.ratingMarks}
              min={helper.ratingMarks[0].value}
              max={helper.ratingMarks.slice(-1)[0].value}
              getAriaLabel={() => "Rating range"}
              valueLabelDisplay="auto"
              name="rating"
              size="small"
              value={filterOpts.rating}
              onChange={(evt) => setFilterOpts(evt.target)}
            />
          </FormControl>
        </Box>
      </Grid>
    </Fragment>
  );
}
