import { mgwRequests } from "./const.js"

const getMgwData = async () => {
    let gCountries = mgwRequests.axiosBase.get(mgwRequests.dataPaths.countries);
    let gCategories = mgwRequests.axiosBase.get(mgwRequests.dataPaths.categories);
    let gArticles = mgwRequests.axiosBase.get(mgwRequests.dataPaths.articles);
    let data = {};

    await Promise.all([gCountries, gCategories, gArticles]).then(r => {
      data = {
        countries: r[0].data,
        categories: r[1].data,
        articles: r[2].data
      };
    }).catch(err => {
      console.log("Cannot get data from APIs. Please contact administrator.");
    });

    return data;
}

const getArticles = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.articles, { params });
}

const getCountries = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.countries, { params });
}

const getCategories = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.categories, { params });
}

export { getMgwData, getArticles, getCountries, getCategories };