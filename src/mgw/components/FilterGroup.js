import helper from "../utils/helper";
import {
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Slider
} from "@mui/material";
import { Fragment } from "react";

export default function FilterGroup(props) {
  const {
    detectFilter,
    detectSearch,
    filterOpts,
    countries,
    categories
  } = props;

  return (
    <Fragment>
      <FormControl sx={{ width: "50%" }}>
        <OutlinedInput
          id="explore-search"
          arial-label="Search"
          name="text"
          size="small"
          value={filterOpts.text}
          onChange={detectFilter}
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
          onChange={detectFilter}
        >
          <MenuItem value="">
            <em>None</em>
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
          onChange={detectFilter}
        >
          <MenuItem value="">
            <em>None</em>
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
          onChange={detectFilter}
          renderValue={(sel) => (sel.length ? sel.join(", ") : <em>None</em>)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {helper.categoriesOptDispay(
            categories.count > 0 ? categories.results : [],
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
          onChange={detectFilter}
          renderValue={(sel) => (sel.length ? sel.join(", ") : <em>None</em>)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {helper.subcategoriesOptDispay(
            categories.count > 0 ? categories.results : [],
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
          onChange={detectFilter}
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