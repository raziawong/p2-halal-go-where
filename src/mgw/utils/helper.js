import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { mgwCategoriesMap } from "./data";

const helper = {
  exploreView: "listing",
  articleView: "details",
  collectionView: "collection",
  sortOptions: [
    {
      label: "What's New",
      sortField: "createdDate",
      sortOrder: "desc",
    },
    {
      label: "Oldest",
      sortField: "createdDate",
      sortOrder: "asc",
    },
    {
      label: "Last Updated",
      sortField: "lastModified",
      sortOrder: "desc",
    },
    {
      label: "Title (A-Z)",
      sortField: "title",
      sortOrder: "asc",
    },
    {
      label: "Title (Z-A)",
      sortField: "title",
      sortOrder: "desc",
    },
  ],
  articlesLimit: 10,
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
    { title: "Verify", fields: ["email"] },
    {
      title: "Summary",
      fields: ["title", "description", "address", "countryId", "cityId"],
    },
    { title: "Details", fields: ["photos", "details"] },
    { title: "Tags", fields: ["catIds", "subcatIds", "tags"] },
  ],
  deleteSteps: [
    { title: "Verify", fields: ["email"] },
    { title: "Confirmation", fields: [] },
  ],
  curateSteps: [
    {
      title: "Email",
      fields: ["curateEmail"]
    }
  ],
  fieldValidations: {
    displayName: {
      patterns: ["displayName", "spaces"],
      maxLength: 80,
      minLength: 3,
    },
    name: {
      required: true,
      patterns: ["displayName", "spaces"],
      maxLength: 80,
      minLength: 3,
    },
    email: {
      required: true,
      patterns: ["email"],
    },
    title: {
      required: true,
      patterns: ["displayName", "spaces"],
      maxLength: 100,
      minLength: 10,
    },
    description: {
      required: true,
      patterns: ["spaces"],
      maxLength: 200,
      minLength: 10,
    },
    address: {
      required: true,
      patterns: ["spaces"],
      minLength: 5,
    },
    countryId: {
      required: true,
    },
    cityId: {
      required: true,
    },
    catIds: {
      required: true,
    },
    subcatIds: {
      required: true,
    },
    newContributor: {
      displayName: {
        patterns: ["displayName", "spaces"],
        maxLength: 80,
        minLength: 3,
      },
      name: {
        required: true,
        patterns: ["displayName", "spaces"],
        maxLength: 80,
        minLength: 3,
      }
    },
    comments: {
      title: {
        patterns: ["displayName"],
        maxLength: 100,
        minLength: 5,
      },
      content: {
        required: true,
        maxLength: 200,
        minLength: 5,
      },
      name: {
        required: true,
        patterns: ["displayName"],
        maxLength: 80,
        minLength: 3,
      },
      email: {
        required: true,
        patterns: ["email"],
      },
    },
    curate: {
      curateEmail: {
        required: true,
        patterns: ["email"],
      }
    }
  },
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
    country: null,
    countryId: "",
    city: null,
    cityId: "",
    catIds: [],
    subcatIds: [],
    categories: [],
    tags: [],
  },
  initCommentInputs: {
    name: "",
    email: "",
    title: "",
    content: "",
  },
  initCurateInputs: {
    articleId: "",
    curateEmail: ""
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
            <Checkbox checked={catIds?.indexOf(cat._id) > -1} />
            <ListItemText primary={cat.name} />
          </MenuItem>
        ))
      : [];
  },
  subcategoriesOptDispay: (categories, catIds, subcatIds) => {
    const c = categories
      ? catIds?.length > 0
        ? categories.filter((cat) => catIds?.indexOf(cat._id) > -1)
        : categories
      : [];
    return c.length
      ? c.map((cat) =>
          cat.subcats.map((subcat) => (
            <MenuItem key={subcat._id} value={subcat._id}>
              <Checkbox checked={subcatIds?.indexOf(subcat._id) > -1} />
              <ListItemText primary={subcat.name} />
            </MenuItem>
          ))
        )
      : [];
  },
  getCatDep: (allCats, selCats, selSubcats) => {
    const catIds = [...selCats];
    if (catIds.length) {
      let subcatIds = [];
      const depCatArr = catIds.map((cId, i) => {
        const foundSub = allCats.find((c) => c._id === cId)?.subcats;
        const depSubcatIds = selSubcats
          .map((scId) => {
            const newSub = foundSub.find((sc) => sc._id === scId);
            if (newSub) {
              subcatIds.push(scId);
              return scId;
            }
            return false;
          })
          .filter((sc) => !!sc);
        return { catId: cId, subcatIds: depSubcatIds };
      });
      return { catIds, subcatIds, depCatArr };
    }
    return { catIds: selCats, subcatIds: selSubcats, depCatArr: [] };
  },
  getImg: (article, isArray=false) => {
    const { photos, catLabels } = article;
    if (photos?.length) {
      return isArray ? photos : photos[0];
    } else {
      const def = catLabels?.length
        ? mgwCategoriesMap[catLabels[0].value].default
        : mgwCategoriesMap.attractions.default;
      return isArray ? [def] : def;
    }
  },
  transformArticleForUpdate: (inputData, isExistUser=false) => {
    let pd = JSON.parse(JSON.stringify(inputData));
    if (pd._id) {
      pd.articleId = pd._id;
      if (pd.allowPublic) {
        if (isExistUser) {
          delete pd["contributor"];
        } else {
          pd.contributor = {};
          pd.contributor.displayName = pd.displayName || "";
          pd.contributor.name = pd.name;
          pd.contributor.email = pd.email;
        }
      }
      delete pd["allowPublic"];
      delete pd["contributors"];
    } else {
      pd.contributor = {};
      pd.contributor.displayName = pd.displayName || "";
      pd.contributor.name = pd.name;
      pd.contributor.email = pd.email;
    }
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
    delete pd["catLabels"];
    delete pd["subcatLabels"];

    pd.details?.map((dtl) => {
      dtl.content = draftToMarkdown(JSON.parse(dtl.content));
      delete dtl["contentMd"];
      return dtl;
    });

    return pd;
  },
  transformArticlesForRead: (allData, allLocs, allCats) => {
    let data = JSON.parse(JSON.stringify(allData));
    return new Promise((resolve, reject) => {
      let tf = data.map((res) => {
        if (res.contributors?.length) {
          let author = res.contributors.filter((c) => c.isAuthor);
          if (author.length) {
            res.displayName = author[0].displayName;
          }
        }

        if (res.location) {
          res = { ...res, ...res.location };
          if (allLocs?.length) {
            let foundP = allLocs.find((t) => t._id === res.location.countryId);
            if (foundP) {
              res.country = { _id: foundP._id, name: foundP.name };
              let foundC = foundP.cities.find(
                (t) => t._id === res.location.cityId
              );
              if (foundC) {
                res.city = { _id: foundC._id, name: foundC.name };
              }
            }
          }
        }

        if (res.categories?.length) {
          res.catIds = [];
          res.subcatIds = [];
          res.catLabels = [];
          res.subcatLabels = [];
          res.categories.map((cat) => {
            res.catIds = [...res.catIds, cat.catId];
            res.subcatIds = [...res.subcatIds, ...cat.subcatIds];
            return cat;
          });

          res.catIds.map((catId) => {
            let foundC = allCats.find((source) => source._id === catId);
            if (foundC) {
              res.catLabels.push(foundC);
              foundC.subcats
                .filter((source) => res.subcatIds.indexOf(source._id) > -1)
                .map((f) => res.subcatLabels.push(f));
            }
            return catId;
          });
        }

        if (res.details?.length) {
          res.details = res.details.map((det) => {
            det.contentMd = det.content;
            det.content = JSON.stringify(markdownToDraft(det.content));
            return det;
          });
        }
        return res;
      });

      if (tf) {
        resolve(tf);
      } else {
        reject("Error encountered while transforming article for display");
      }
    });
  },
  regex: {
    spaces: /^[\s]*$/,
    displayName: /^[A-Za-zÀ-ȕ0-9\s-:,]*$/,
    optionValue: /^[A-Za-z0-9-]*$/,
    alphaNumeric: /^[A-Za-zÀ-ȕ0-9\s-]*$/,
    email:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  },
  templates: {
    required: `This is required`,
    spaces: `This cannot contain only space(s)`,
    special: `This cannot contain special characters except '-', ',', and/or ':' `,
    specialSpace: `This cannot contain special characters and/or spaces`,
    alphaNumeric: `This can only be alphanumeric inclusive of spaces and -`,
    maxLength: (length) =>
      `This cannot exceed ${length} characters including spaces`,
    minLength: (length) => `This must be at least be ${length} characters`,
    email: `This is not a valid email address`,
    url: `This is not a valid URL`,
    user: `User verification failed`,
    userPublic: `You are not a registered user yet, please fill up at least contact name to proceed`
  },
  validate: (fieldName, inputs, valKey = "") => {
    let inputVal = inputs[fieldName];
    const rules = valKey
      ? helper.fieldValidations[valKey][fieldName]
      : helper.fieldValidations[fieldName];
    if (fieldName.startsWith("photos")) {
      inputVal = inputs.photos;
      let err = inputVal
        .map((p, i) => {
          if (!helper.regex.url.test(p)) {
            return helper.templates.url;
          }
          return false;
        })
        .filter((p) => !!p);
      if (err.length) {
        return { fieldName, message: err };
      }
    } else if (fieldName.startsWith("details")) {
      inputVal = inputs.details;
      let errList = inputVal
        .map((dtl) => {
          let err = {};
          const { sectionName, content } = dtl;
          if (!sectionName || helper.regex.spaces.test(sectionName)) {
            err.sectionName = helper.templates.required;
          } else if (!helper.regex.displayName.test(sectionName)) {
            err.sectionName = helper.templates.special;
          } else if (sectionName > 100) {
            err.sectionName = helper.templates.maxLength(100);
          } else if (sectionName < 5) {
            err.sectionName = helper.templates.minLength(10);
          }
          if (content) {
            const contentMd = draftToMarkdown(JSON.parse(content));
            if (sectionName?.length && !contentMd?.length) {
              err.content = "Content cannot be empty when Header is not";
            }
          }
          return err;
        })
        .filter((d) => Object.keys(d).length !== 0);
      if (errList.length) {
        return { fieldName, message: errList };
      }
    } else if (fieldName === "tags") {
      if (inputVal && inputVal?.length >= 1) {
        let check = inputVal.filter((t) => !helper.regex.alphaNumeric.test(t));
        if (check.length) {
          return { fieldName, message: helper.templates.alphaNumeric };
        }
      }
    } else if (rules) {
      for (const [k, v] of Object.entries(rules)) {
        if (k === "required" && !inputVal?.length) {
          return { fieldName, message: helper.templates.required };
        }
        if (k === "patterns") {
          for (const type of v) {
            if (
              type === "displayName" &&
              !helper.regex.displayName.test(inputVal)
            ) {
              return { fieldName, message: helper.templates.special };
            }
            if (
              type === "spaces" &&
              inputVal?.length &&
              helper.regex.spaces.test(inputVal)
            ) {
              return { fieldName, message: helper.templates.spaces };
            }
            if (type === "url" && !helper.regex.url.test(inputVal)) {
              return { fieldName, message: helper.templates.url };
            }
            if (type === "email" && !helper.regex.email.test(inputVal)) {
              return { fieldName, message: helper.templates.email };
            }
          }
        }
        if (k === "maxLength" && inputVal?.length && inputVal.length > v) {
          return { fieldName, message: helper.templates.maxLength(v) };
        }
        if (k === "minLength" && inputVal?.length && inputVal.length < v) {
          return { fieldName, message: helper.templates.minLength(v) };
        }
      }
    }
    return false;
  },
  stringToColor: (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  },
  stringAvatar: (name) => {
    name = name.split(" ");
    const startLetters = name
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);
    return {
      sx: {
        bgcolor: helper.stringToColor(startLetters),
      },
      children: startLetters,
    };
  },
};

export default helper;
