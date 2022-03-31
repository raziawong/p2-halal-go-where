import { Checkbox, ListItemText, MenuItem } from "@mui/material";

const helper = {
  exploreView: "listing",
  articleView: "details",
  initFilterOpts: {
    id: "",
    text: "",
    countryId: "",
    cityId: "",
    catIds: [],
    subcatIds: [],
    rating: [0, 5],
  },
  initArticleInputs: {
    displayName: "",
    name: "",
    email: "",
    allowPublic: false,
    title: "",
    description: "",
    details: [],
    photos: [],
    categories: [],
    address: "",
    country: "",
    city: "",
    tags: [],
  },
  ratingMarks: [
    {
      value: 0,
      text: "No Rating",
    },
    {
      value: 1,
      text: "1",
    },
    {
      value: 2,
      text: "2",
    },
    {
      value: 3,
      text: "3",
    },
    {
      value: 4,
      text: "4",
    },
    {
      value: 5,
      text: "5",
    },
  ],
  countryOptDisplay: (countries) => {
    return countries.length
      ? countries.map((country) => (
          <MenuItem key={country._id} value={country._id}>
            {country.name}
          </MenuItem>
        ))
      : [];
  },
  cityOptDisplay: (countries, countryId) => {
    let c = countries.length
      ? countryId
        ? countries.filter((country) => country._id === countryId)
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
  },
  categoriesOptDispay: (categories, catIds) => {
    return categories
      ? categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            <Checkbox checked={catIds.indexOf(cat._id) > -1} />
            <ListItemText primary={cat.name} />
          </MenuItem>
        ))
      : [];
  },
  subcategoriesOptDispay: (categories, catIds, subcatIds) => {
    let c = categories
      ? catIds.length > 0
        ? categories.filter((cat) => catIds.indexOf(cat._id) > -1)
        : categories
      : [];
    return c.length
      ? c.map((cat) =>
          cat.subcats.map((subcat) => (
            <MenuItem key={subcat._id} value={subcat._id}>
              <Checkbox checked={subcatIds.indexOf(subcat._id) > -1} />
              <ListItemText primary={subcat.name} />
            </MenuItem>
          ))
        )
      : [];
  },
};

export default helper;
