import axios from "axios";
import defaultAttractions from "../../assets/image/default-attractions.jpg";
import defaultFood from "../../assets/image/default-food.jpg";
import defaultMasjid from "../../assets/image/default-masjid.jpg";
import defaultMusolla from "../../assets/image/default-musolla.jpg";

const mgwRequests = {
    axiosBase: axios.create({
        baseURL: "http://localhost:3388"
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
        articles: "/articles",
        articleContributor: "/article/contributor",
        articleRating: "/article/rating",
        articleComments: "/article/comments"
    },
    submitPaths: {
        article: "/article",
        articleRating: "/article/rating",
        articleComment: "/article/comment"         
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

const getArticles = async (params, viewType, { sortField="createdDate", sortOrder="desc"}) => {
  let qPath = mgwRequests.queryPaths.articles + '/' + viewType;
  
  if (sortField && sortOrder) {
    qPath += '/' + sortField + '/' + sortOrder;
  }
  return await mgwRequests.axiosBase.get(qPath, { params });
}

const postArticle = async (body) => {
  return await mgwRequests.axiosBase.post(mgwRequests.submitPaths.article, {
    ...body
  });
}

const updateArticle = async (body) => {
  return await mgwRequests.axiosBase.put(mgwRequests.submitPaths.article, {
    ...body
  });
}

const deleteArticle = async (params) => {
  return await mgwRequests.axiosBase.delete(mgwRequests.submitPaths.article, { params });
}

const getArticleContributor = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.articleContributor, { params });
};

const getCountries = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.countries, { params });
}

const getCategories = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.categories, { params });
}

const getRating = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.articleRating, { params });
}

const updateRating = async (body) => {
  return await mgwRequests.axiosBase.put(mgwRequests.submitPaths.articleRating, {
    ...body
  });
}

const getComments = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.articleComments, { params });
}

const postComment = async (body) => {
  return await mgwRequests.axiosBase.post(mgwRequests.submitPaths.articleComment, {
    ...body
  });
}

export { mgwCategoriesMap, getMgwFixed, getMgwArticles, getArticles, getArticleContributor, getCountries, getCategories,
  postArticle, updateArticle, deleteArticle, getRating, updateRating, getComments, postComment };