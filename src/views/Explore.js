import { mgwCategoriesMap } from "../utils/const";
import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Box,
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
        <Box sx={{ m: 4, display: "flex" }}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel htmlFor="explore-search">Search</InputLabel>
            <OutlinedInput
              id="explore-search"
              label="Search"
              arial-label="Search"
              name="stext"
              size="small"
              value={searchOpts.stext}
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
            <InputLabel htmlFor="explore-city">City</InputLabel>
            <Select
              id="explore-city"
              label="city"
              arial-label="City"
              name="city"
              size="small"
              value={searchOpts.city}
              onChange={setOpts}
              disabled={searchOpts.city ? false : true}
            >
              <MenuItem value="none">
                <em>Select country first</em>
              </MenuItem>
              {countries.results.map((country) => (
                <MenuItem key={country._id} value={country.code}>
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
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      {card.tags.map((tag, i) => (
                        <Typography key={i} variant="subtitle2" component="span">
                          {tag}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Masonry>
        </Box>
      </Container>
    </Fragment>
  );
}
