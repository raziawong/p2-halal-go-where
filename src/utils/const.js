import axios from "axios";
import defaultAttractions from "../assets/image/default-attractions.jpg";
import defaultFood from "../assets/image/default-food.jpg";
import defaultMasjid from "../assets/image/default-masjid.jpg";
import defaultMusolla from "../assets/image/default-musolla.jpg";

const API = {
    axiosBase: axios.create({
        baseURL: "https://muslim-go-where-api.herokuapp.com"
    }),
    dataPaths: {
        countries: "/countries/cities",
        categories : "/categories/subcats",
        articles: "/articles"
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

const CATS = {
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

export { API, CATS };