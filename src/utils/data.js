import { API } from "./const.js"

const getMgwData = async () => {
    let gCountries = API.axiosBase.get(API.dataPaths.countries);
    let gCategories = API.axiosBase.get(API.dataPaths.categories);
    let gArticles = API.axiosBase.get(API.dataPaths.articles);
    let data = {};

    await Promise.all([gCountries, gCategories, gArticles]).then(r => {
      data = {
        countries: r[0].data,
        categories: r[1].data,
        articles: r[2].data
      };
    }).catch(err => {
      console.log("Cannot get data from API. Please contact administrator.");
    });

    return data;
}

const getArticles = async (params) => {
    let query = await API.axiosBase.get(API.dataPaths.articles, { params });
    return query;
}

export { getMgwData, getArticles };