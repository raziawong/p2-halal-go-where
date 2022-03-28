import { mgwCategoriesMap } from "./utils/data";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Masonry } from "@mui/lab";

export default function Explore(props) {
  const [mount, setMount] = useState(false);
  const {
    setMgwState,
    setOpts,
    filterOpts,
    execSearch,
    countries,
    categories,
    articles
  } = props;

  useEffect(() => {
    setMgwState({ isLoaded: true, isRedirectListing: false });
  }, [setMgwState]);

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4, display: "flex" }}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel htmlFor="explore-search">Search</InputLabel>
            <OutlinedInput
              id="explore-search"
              label="Search"
              arial-label="Search"
              name="text"
              size="small"
              value={filterOpts.text}
              onChange={setOpts}
            />
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="explore-country">Country</InputLabel>
            <Select
              id="explore-country"
              label="Country"
              arial-label="Country"
              name="country"
              size="small"
              value={filterOpts.countryId}
              onChange={setOpts}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {countries.results.map((country) => (
                <MenuItem key={country._id} value={country._id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="explore-city">City</InputLabel>
            <Select
              id="explore-city"
              label="city"
              arial-label="City"
              name="city"
              size="small"
              value={filterOpts.cityId}
              onChange={setOpts}
              disabled={filterOpts.cityId ? false : true}
            >
              <MenuItem value="none">
                <em>Select country first</em>
              </MenuItem>
              {countries.results.map((country) => (
                <MenuItem key={country._id} value={country._id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="explore-categories">Categories</InputLabel>
            <Select
              id="explore-categories"
              label="categories"
              arial-label="Categories"
              name="categories"
              size="small"
              value={filterOpts.catIds}
              onChange={setOpts}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {categories.results.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ m: 4 }}>
          <Masonry columns={3} spacing={2}>
            {articles.results.map((card) => {
              let cat = card.categories.length ? card.categories[0].catId : "";
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
                    <Typography gutterBottom variant="subtitle1" component="h6">
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
                      sx={{ display: "flex", justifyContent: "space-between" }}
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
      </Container>
    </Fragment>
  );
}
