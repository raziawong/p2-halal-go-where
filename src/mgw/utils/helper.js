import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";

const helper = {
  exploreView: "listing",
  articleView: "details",
  createSteps: [
    {title: "Author", fields: ["displayName", "name", "email", "allowPublic"]}, 
    {title: "Summary", fields: ["title", "description", "address", "countryId", "cityId"]},
    {title: "Details", fields: ["photos", "details"] },
    {title: "Tags", fields: ["catIds", "subcatIds", "tags"]}
  ],
  initFilterOpts: {
    id: "",
    text: "",
    countryId: "",
    cityId: "",
    catIds: [],
    subcatIds: [],
    rating: [0, 5]
  },
  emptyDetail: {
    sectionName: "", 
    content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
  },
  initArticleInputs: {
    displayName: "",
    name: "",
    email: "",
    allowPublic: false,
    title: "",
    description: "",
    details: [{
      sectionName: "", 
      content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
    }],
    photos: [ "" ],
    address: "",
    countryId: "",
    cityId: "",
    catIds: [],
    subcatIds: [],
    tags: []
  },
  ratingMarks: [
    { value: 0, text: "No Rating" },
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" }
  ],
  rteControls: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "highlight",
    "undo",
    "redo",
    "link",
    "numberList",
    "bulletList",
    "quote",
    "code"
  ],
  countryOptDisplay: (countries) => {
    return countries && countries.length
      ? countries.map((country) => (
          <MenuItem key={country._id} value={country._id}>
            {country.name}
          </MenuItem>
        ))
      : [];
  },
  cityOptDisplay: (countries, countryId) => {
    const c = countries && countries.length
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
    console.log(catIds, subcatIds)
    const c = categories
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
  regex: {
    spaces: /^[\s]*$/,
    displayName: /^[A-Za-zÀ-ȕ\s-]*$/,
    optionValue: /^[A-Za-z0-9-]*$/,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    url: /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
  },
  templates: {
    required: `This is required`,
    spaces: `This cannot contain only space(s)`,
    special: `This cannot contain special characters`,
    specialSpace: `This cannot contain special characters and/or spaces`,
    maxLength: (length) =>
      `This cannot exceed ${length} characters including spaces`,
    email: `This is not a valid email address`,
    url: `This is not a valid URL`
  },
  validate: (fieldName, inputs) => {
    let val = inputs[fieldName];
    if (fieldName === "displayName") {
      if (!helper.regex.displayName.test(val)) {
        return {fieldName, message: helper.templates.special};
      }
      if (val?.length) {
        return {fieldName, message: helper.templates.maxLength(80)};
      }
    } else if (fieldName === "name") {
      if (!val) {
        return {fieldName, message: helper.templates.required};
      }
      if (helper.regex.displayName.test(val)) {
        return {fieldName, message: helper.templates.special};
      }
      if (val?.length) {
        return {fieldName, message: helper.templates.maxLength(80)};
      }
    } else if (fieldName === "email") {
      if (!val) {
        return {fieldName, message: helper.templates.required};
      }
      if (helper.regex.email.test(val)) {
        return {fieldName, message: helper.templates.email};
      }
    } else if (fieldName === "title") {
      
    } else if (fieldName === "description") {
      
    } else if (fieldName.startsWith("photos")) {
      
    } else if (fieldName.startsWith("details")) {
      
    } else if (fieldName === ("catIds")) {

    } else if (fieldName === "subcatIds") {

    } else if (fieldName === "tags") {

    }

    return false;
  }
};


export default helper;
