import "./assets/main.css";
import mgwTheme from "./utils/mgwTheme";
import { API } from "./utils/const";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/collection.js";
import { Home, Explore, Create } from "./views/collection.js";

export default class Main extends React.Component {
  state = {
    searchText: "",
    redirectFilter: false,
    countriesData: [],
    categoriesData: [],
    articlesData: [],
    loaded: false
  };

  componentDidMount() {
    let gCountries = API.axiosBase.get(API.dataPaths.countries);
    let gCategories = API.axiosBase.get(API.dataPaths.categories);
    let gArticles = API.axiosBase.get(API.dataPaths.articles);

    Promise.all([gCountries, gCategories, gArticles]).then(r => {
      this.setState({
        countriesData: r[0].data,
        categoriesData: r[1].data,
        articlesData: r[2].data
      });
    }).catch(err => {
      console.log("Cannot get data from API. Please contact administrator.");
    });
  }

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={mgwTheme}>
          {

          }
          <NavBar />
          <Routes>
            <Route index path="/" 
              element={
                this.state.redirectFilter ?
                <Navigate replace to="/explore" /> :
                <Home 
                  searchText={this.setSearchText} 
                  search={this.searchArticles}
                />
              }
            />
            <Route path="/explore" 
              element={
                <Explore 
                  redirect={this.setRedirectFilter}
                />
              }
            />
            <Route path="/create" element={<Create />} />
          </Routes>
        </ThemeProvider>
      </React.Fragment>
    );
  }

  setRedirectFilter = val => {
    this.setState({
      redirectFilter: val
    });
  }

  setSearchText = evt => {
    this.setState({
      searchText: evt.target.value
    });
  }

  searchArticles = async evt => {
    if (evt.key === 'Enter') {
      let query = await API.axiosBase.get(API.dataPaths.articles, {
        params: {
          text: this.state.searchText
        }
      });
      if (query.data) {
        this.setState({
          redirectFilter: true
        });
      }
    }
  }
}