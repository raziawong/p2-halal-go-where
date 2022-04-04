import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

const helper = {
  exploreView: "listing",
  articleView: "details",
  createSteps: [
    {
      title: "Author",
      fields: ["displayName", "name", "email", "allowPublic"],
    },
    {
      title: "Summary",
      fields: ["title", "description", "address", "countryId", "cityId"],
    },
    { title: "Details", fields: ["photos", "details"] },
    { title: "Tags", fields: ["catIds", "subcatIds", "tags"] },
  ],
  editSteps: [
    { title: "Author", fields: ["email"] },
    {
      title: "Summary",
      fields: ["title", "description", "address", "countryId", "cityId"],
    },
    { title: "Details", fields: ["photos", "details"] },
    { title: "Tags", fields: ["catIds", "subcatIds", "tags"] },
  ],
  initFilterOpts: {
    id: "",
    text: "",
    countryId: "",
    cityId: "",
    catIds: [],
    subcatIds: [],
    rating: [0, 5],
  },
  emptyDetail: {
    sectionName: "",
    content: JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent())
    ),
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
    address: "",
    country: { _id: "", name: "Not selected" },
    countryId: "",
    city: { _id: "", name: "Not selected" },
    cityId: "",
    catIds: [],
    subcatIds: [],
    categories: [],
    tags: [],
  },
  ratingMarks: [
    { value: 0, text: "No Rating" },
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
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
    "code",
  ],
  cityObj: (countries, countryId) => {
    const c =
      countries && countries.length
        ? countryId
          ? countries.filter((country) => country._id === countryId)
          : countries
        : [];
    return c.length
      ? c.map((country) => country.cities).reduce((a, v) => [...a, ...v], [])
      : [];
  },
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
    const c =
      countries && countries.length
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
  getCatDep: (allCats, selCats, selSubcats) => {
    const catIds = [...selCats];
    let subcatIds = [];
    let depCatArr = catIds.map((cId, i) => {
      const foundSub = allCats.find(c => c._id === cId)?.subcats;
      let depSubcatIds = selSubcats.map(scId => {
        const newSub = foundSub.find(sc => sc._id === scId);
        if (newSub) {
          subcatIds.push(scId);
          return scId;
        }
      }).filter(sc => !!sc);
      return { catId: cId, subcatIds: depSubcatIds};
    });
    console.log("cat dep: ", catIds, subcatIds, depCatArr)
    return { catIds, subcatIds, depCatArr};
  },
  transformArticle: inputData => {
    let pd = JSON.parse(JSON.stringify(inputData));
    pd.contributor = {};
    pd.contributor[0].displayName = pd.displayName || "";
    pd.contributor[0].name = pd.name;
    pd.contributor[0].email = pd.email;
    pd.location = {};
    pd.location.address = pd.address || "";
    pd.location.countryId = pd.countryId;
    pd.location.cityId = pd.cityId;
    delete pd["displayName"]; 
    delete pd["name"]; 
    delete pd["email"];
    delete pd["country"]; 
    delete pd["city"];
    delete pd["catIds"]; 
    delete pd["subcatIds"];
  
    pd.details?.map(dtl => {
      dtl.content = draftToMarkdown(JSON.parse(dtl.content));
    });

    return pd;
  },
  regex: {
    spaces: /^[\s]*$/,
    displayName: /^[A-Za-zÀ-ȕ\s-]*$/,
    optionValue: /^[A-Za-z0-9-]*$/,
    alphaNumeric: /^[A-Za-zÀ-ȕ0-9\s-]*$/,
    email:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    url: /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
  },
  templates: {
    required: `This is required`,
    spaces: `This cannot contain only space(s)`,
    special: `This cannot contain special characters and numbers`,
    specialSpace: `This cannot contain special characters and/or spaces`,
    alphaNumeric: `This can only be alphanumeric inclusive of spaces and -`,
    maxLength: (length) =>
      `This cannot exceed ${length} characters including spaces`,
    email: `This is not a valid email address`,
    url: `This is not a valid URL`,
  },
  validate: (fieldName, inputs) => {
    let val = inputs[fieldName];
    if (fieldName === "displayName") {
      if (!helper.regex.displayName.test(val)) {
        return { fieldName, message: helper.templates.special };
      }
      if (val?.length && val.length > 80) {
        return { fieldName, message: helper.templates.maxLength(80) };
      }
    } else if (fieldName === "name") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
      if (!helper.regex.displayName.test(val)) {
        return { fieldName, message: helper.templates.special };
      }
      if (val?.length && val.length > 80) {
        return { fieldName, message: helper.templates.maxLength(80) };
      }
    } else if (fieldName === "email") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
      if (!helper.regex.email.test(val)) {
        return { fieldName, message: helper.templates.email };
      }
    } else if (fieldName === "title") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
      if (!helper.regex.displayName.test(val)) {
        return { fieldName, message: helper.templates.special };
      }
      if (val?.length && val.length > 50) {
        return { fieldName, message: helper.templates.maxLength(50) };
      }
    } else if (fieldName === "description") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
      if (val?.length && val.length > 150) {
        return { fieldName, message: helper.templates.maxLength(150) };
      }
    } else if (fieldName === "address") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
    } else if (fieldName === "countryId") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
    } else if (fieldName === "cityId") {
      if (!val) {
        return { fieldName, message: helper.templates.required };
      }
    } else if (fieldName.startsWith("photos")) {
      val = inputs.photos;
      let err = val
        .map((p, i) => {
          if (!helper.regex.url.test(p)) {
            return helper.templates.url;
          }
        })
        .filter((p) => !!p);
      if (err.length) {
        return { fieldName, message: err };
      }
    } else if (fieldName.startsWith("details")) {
      val = inputs.details;
      let errList = val
        .map((d, i) => {
          let err = {};
          if (!d.sectionName) {
            err.sectionName = helper.templates.required;
          } else if (!helper.regex.displayName.test(d.sectionName)) {
            err.sectionNasme = helper.templates.special;
          }
          if (d.content) {
            const content = JSON.parse(d.content);
            if (d.sectionName && !content.blocks.length) {
              err.content = "Content cannot be empty when Header is not";
            }
          }
          return err;
        })
        .filter((d) => !d);

      if (errList.length) {
        return { fieldName, message: errList };
      }
    } else if (fieldName === "catIds") {
      if (!val.length) {
        return { fieldName, message: helper.templates.required };
      }
    } else if (fieldName === "subcatIds") {
      if (!val.length) {
        return { fieldName, message: helper.templates.required };
      }
    } else if (fieldName === "tags") {
      if (val && val?.length >= 1) {
        let check = val.filter(t => !helper.regex.alphaNumeric.test(t));
        if (check.length) {
          return { fieldName, message: helper.templates.alphaNumeric };
        }
      }
    }

    return false;
  },
};

export default helper;
