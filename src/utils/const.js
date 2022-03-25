import axios from "axios";

const API = {
    axiosBase: axios.create({
        baseURL: "https://muslim-go-where-api.herokuapp.com"
    }),
    dataPaths: {
        countries: "/countries/cities",
        categories : "/categories/subcats",
        articles: "/articles"
    },
    submitPaths: {
        article: "/article",
        rating: "/article/rating",
        comment: "/article/comment"         
    }
}

const CATS = [
    {
        title: "Islamic Attractions",
        value: "attractions",
        banner: "",
        default: ""
    },
    {
        title: "Mosques",
        value: "masjids",
        banner: "",
        default: ""
    },
    {
        title: "Food",
        value: "food",
        banner: "",
        default: ""
    },
    {
        title: "Praying Spaces",
        value: "musollahs",
        banner: "",
        default: ""
    }
]

export { API, CATS };