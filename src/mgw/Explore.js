import { mgwCategoriesMap } from "./utils/data";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import helper from "./utils/helper";

export default function Explore(props) {
  const {
    setMgwState,
    setFilterOpts,
    detectFilter,
    detectSearch,
    filterOpts,
    countries,
    categories,
    articles,
    loaded,
  } = props;

  useEffect(() => {
    setMgwState({ isRedirectListing: false });
  }, [setMgwState]);

  const countryOptDisplay = () => {
    return countries.length
      ? countries.map((country) => (
          <MenuItem key={country._id} value={country._id}>
            {country.name}
          </MenuItem>
        ))
      : [];
  };

  const cityOptDisplay = () => {
    let c = countries.length
      ? filterOpts.countryId
        ? countries.filter((country) => country._id === filterOpts.countryId)
        : countries
      : [];
    return c.length
      ? c.map((country) =>
          country.cities.map((city) => (
            <MenuItem key={city._id} value={city._id}>
              {city.name}
            </MenuItem>
          ))
        )
      : [];
  };

  const categoriesOptDispay = () => {
    return categories.count
      ? categories.results.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            <Checkbox checked={filterOpts.catIds.indexOf(cat._id) > -1} />
            <ListItemText primary={cat.name} />
          </MenuItem>
        ))
      : [];
  };

  const subcategoriesOptDispay = () => {
    let c = categories.results.length
      ? filterOpts.catIds.length > 0
        ? categories.results.filter((cat) => filterOpts.catIds.indexOf(cat._id) > 0)
        : categories.results
      : [];
    return c.length
      ? c.map((cat) =>
          cat.subcats.map((subcat) => (
            <MenuItem key={subcat._id} value={subcat._id}>
              {subcat.name}
            </MenuItem>
          ))
        )
      : [];
  };

  return (
    <Container maxWidth="xl" disableGutters>
      {!loaded ? (
        <></>
      ) : (
        <Fragment>
          <Box sx={{ m: 4}}>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel htmlFor="explore-search">Search</InputLabel>
              <OutlinedInput
                id="explore-search"
                label="Search"
                arial-label="Search"
                name="text"
                size="small"
                value={filterOpts.text}
                onChange={detectFilter}
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="explore-country">Country</InputLabel>
              <Select
                displayEmpty
                id="explore-country"
                label="Country"
                arial-label="Country"
                name="countryId"
                size="small"
                value={filterOpts.countryId}
                onChange={detectFilter}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {countryOptDisplay()}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="explore-city">City</InputLabel>
              <Select
                displayEmpty
                id="explore-city"
                label="City"
                arial-label="City"
                name="cityId"
                size="small"
                value={filterOpts.cityId}
                onChange={detectFilter}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cityOptDisplay()}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="explore-categories">Categories</InputLabel>
              <Select
                multiple
                displayEmpty
                id="explore-categories"
                label="Categories"
                arial-label="Categories"
                name="catIds"
                size="small"
                value={filterOpts.catIds}
                onChange={detectFilter}
                renderValue={(sel) => sel.length ? sel.join(", ") : <em>None</em>}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categoriesOptDispay()}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="explore-subcategories">Sub-categories</InputLabel>
              <Select
                multiple
                displayEmpty
                id="explore-subcategories"
                label="Sub-categories"
                arial-label="Sub-Categories"
                name="subcatIds"
                size="small"
                value={filterOpts.subcatIds}
                onChange={detectFilter}
                renderValue={(sel) => sel.length ? sel.join(", ") : <em>None</em>}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subcategoriesOptDispay()}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="explore-rating">Rating</InputLabel>
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
          </Box>
          <Box sx={{ m: 4 }}>
            <Masonry columns={3} spacing={2}>
              {articles.map((card) => {
                let cat = card.categories.length
                  ? card.categories[0].catId
                  : "";
                let imgUrl = card.photos.length
                  ? card.photos[0]
                  : mgwCategoriesMap.attractions.default;
                return (
                  <Card key={card._id}>
                    <CardMedia component="img" image={imgUrl} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h5">
                        {card.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h6"
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="text.secondary"
                      >
                        {card.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {card.tags.map((tag, i) => (
                          <Typography
                            key={i}
                            variant="subtitle2"
                            component="span"
                          >
                            {tag}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        component={Link}
                        to={`/article/${card._id}`}
                        size="small"
                        color="primary"
                      >
                        Find out more
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
            </Masonry>
          </Box>
        </Fragment>
      )}
    </Container>
  );
}
