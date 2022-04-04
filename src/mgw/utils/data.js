import axios from "axios";
import defaultAttractions from "../../assets/image/default-attractions.jpg";
import defaultFood from "../../assets/image/default-food.jpg";
import defaultMasjid from "../../assets/image/default-masjid.jpg";
import defaultMusolla from "../../assets/image/default-musolla.jpg";

const mgwRequests = {
    axiosBase: axios.create({
        baseURL: "https://muslim-go-where-api.herokuapp.com"
    }),
    dataPaths: {
        countries: "/countries/cities",
        locationTagged: "/countries/cities/tagged",
        categories : "/categories/subcats",
        articles: "/articles/listing",
        articlesTags: "/articles/tags"
    },
    queryPaths: {
        countries: "/countries",
        countriesCities: "/countries/cities",
        categories : "/categories",
        categoriesSubcats : "/categories/subcats",
        articles: "/articles"
    },
    submitPaths: {
        article: "/article",
        rating: "/article/rating",
        comment: "/article/comment"         
    }
}

const mgwCategoriesMap = {
    attractions: {
        title: "Islamic Attractions",
        value: "attractions",
        banner: "",
        default: defaultAttractions
    },
    masjids: {
        title: "Mosques",
        value: "masjids",
        banner: "",
        default: defaultMasjid
    },
    food: {
        title: "Food",
        value: "food",
        banner: "",
        default: defaultFood
    },
    musollahs: {
        title: "Praying Spaces",
        value: "musollahs",
        banner: "",
        default: defaultMusolla
    }
}

const getMgwFixed = async () => {
  let gCountries = mgwRequests.axiosBase.get(mgwRequests.dataPaths.countries);
  let gCategories = mgwRequests.axiosBase.get(mgwRequests.dataPaths.categories);
  let data = {};

  await Promise.all([gCountries, gCategories]).then(r => {
    data = {
      countries: r[0].data,
      categories: r[1].data
    };
  }).catch(err => {
    console.log("Cannot get countries and categories data from APIs. Please contact administrator.");
  });

  return data;
}

const getMgwArticles = async () => {
    let gArticles = mgwRequests.axiosBase.get(mgwRequests.dataPaths.articles);
    let gArticleTags = mgwRequests.axiosBase.get(mgwRequests.dataPaths.articlesTags);
    let gCountriesTagged = mgwRequests.axiosBase.get(mgwRequests.dataPaths.locationTagged);
    let data = {};

    await Promise.all([gArticles, gArticleTags, gCountriesTagged]).then(r => {
      data = {
        main: r[0].data,
        tags: r[1].data,
        location: r[2].data
      };
    }).catch(err => {
      console.log("Cannot get articles data from APIs. Please contact administrator.");
    });

    return data;
}

const getArticles = async (params, viewType) => {
  let qPath = mgwRequests.queryPaths.articles + '/' + viewType;
  return await mgwRequests.axiosBase.get(qPath, { params });
}

const postArticle = async (body) => {
  return await mgwRequests.axiosBase.post(mgwRequests.submitPaths.article, {
    ...body
  });
}

const getCountries = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.countries, { params });
}

const getCountriesCities = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.countriesCities, { params });
}

const getCategories = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.categories, { params });
}

export { mgwCategoriesMap, getMgwFixed, getMgwArticles, getArticles, getCountries, getCountriesCities, getCategories,
  postArticle };