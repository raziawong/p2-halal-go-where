import React, { Fragment } from "react";
import helper from "../../utils/helper";
import {
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
} from "@mui/material";

export default function FilterGroup({
  detectSearch,
  filterOpts,
  setFilterOpts,
  countries,
  categories,
}) {
  return (
    <Fragment>
      <FormControl sx={{ width: "50%" }}>
        <OutlinedInput
          id="explore-search"
          arial-label="Search"
          name="text"
          size="small"
          value={filterOpts.text}
          onChange={(evt) => setFilterOpts(evt.target)}
        />
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <Select
          displayEmpty
          id="explore-country"
          arial-label="Country"
          name="countryId"
          size="small"
          value={filterOpts.countryId}
          onChange={(evt) => setFilterOpts(evt.target)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {helper.countryOptDisplay(countries)}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <Select
          displayEmpty
          id="explore-city"
          arial-label="City"
          name="cityId"
          size="small"
          value={filterOpts.cityId}
          onChange={(evt) => setFilterOpts(evt.target)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {helper.cityOptDisplay(countries, filterOpts.countryId)}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <Select
          multiple
          displayEmpty
          id="explore-categories"
          arial-label="Categories"
          name="catIds"
          size="small"
          value={filterOpts.catIds}
          onChange={(evt) => setFilterOpts(evt.target)}
          renderValue={(vals) =>
            vals.length ? (
              categories
                .filter((c) => vals.includes(c._id))
                .map((f) => f.name)
                .join(", ")
            ) : (
              <em>All</em>
            )
          }
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {helper.categoriesOptDispay(
            categories?.length > 0 ? categories : [],
            filterOpts.catIds
          )}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
        <Select
          multiple
          displayEmpty
          id="explore-subcategories"
          arial-label="Sub-Categories"
          name="subcatIds"
          size="small"
          value={filterOpts.subcatIds}
          onChange={(evt) => setFilterOpts(evt.target)}
          renderValue={(vals) =>
            vals.length ? (
              categories
                .reduce((pv, cv) => {
                  return pv.concat(
                    cv.subcats.filter((sc) => vals.includes(sc._id))
                  );
                }, [])
                .map((f) => f.name)
                .join(", ")
            ) : (
              <em>All</em>
            )
          }
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {helper.subcategoriesOptDispay(
            categories?.length > 0 ? categories : [],
            filterOpts.catIds,
            filterOpts.subcatIds
          )}
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%" }}>
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
      <Button
        type="submit"
        variant="contained"
        onClick={(evt) => detectSearch(evt, helper.exploreView)}
      >
        Submit
      </Button>
    </Fragment>
  );
}
