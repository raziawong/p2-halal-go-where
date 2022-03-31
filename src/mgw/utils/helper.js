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
    rating: [0,5]
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
  ratingMarks: [{
    value: 0,
    text: "No Rating"
  },{
    value: 1,
    text: "1"
  },
  {
    value: 2,
    text: "2"
  },
  {
    value: 3,
    text: "3"
  },{
    value: 4,
    text: "4"
  },
  {
    value: 5,
    text: "5"
  }]
};

export default helper;
