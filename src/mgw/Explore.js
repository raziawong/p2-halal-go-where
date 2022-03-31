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

  return (
    <Container maxWidth="xl" disableGutters>
      {!loaded ? (
        <></>
      ) : (
        <Fragment>
          <Box sx={{ m: 4}}>
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
                multiple displayEmpty
                id="explore-categories"
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
                {helper.categoriesOptDispay(categories.count > 0 ? categories.results : [], filterOpts.catIds)}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <Select
                multiple displayEmpty
                id="explore-subcategories"
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
                {helper.subcategoriesOptDispay(categories.count > 0 ? categories.results : [], filterOpts.catIds, filterOpts.subcatIds)}
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
