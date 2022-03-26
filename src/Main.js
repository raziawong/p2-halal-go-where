import "./assets/custom.css";
import mgwTheme from "./utils/mgwTheme";
import { getMgwData, getArticles } from "./utils/data";
import React, { Component, Fragment } from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { Loader, NavBar } from "./components/collection.js";
import { Home, Explore, Create } from "./views/collection.js";

export default class Main extends Component {
  state = {
    redirectFilter: false,
    filterOpts: {
      stext: "",
      country: "none",
      city: "",
      categories: "none",
      subcategories: [],
    },
    filteredData: [],
    countriesData: [],
    categoriesData: [],
    articlesData: [],
    loaded: false,
  };

  async componentDidMount() {
    let data = await getMgwData();

    this.setState({
      countriesData: data.countries,
      categoriesData: data.categories,
      articlesData: data.articles,
      loaded: true,
    });
  }

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        {this.state.loaded ? (
          <Fragment>
            <NavBar />
            <Routes>
              <Route
                index
                path="/"
                element={
                  this.state.redirectFilter ? (
                    <Navigate replace to="/explore" />
                  ) : (
                    <Home
                      searchText={this.state.filterOpts.stext}
                      setOpts={this.setFilterOpts}
                      execSearch={this.searchArticles}
                    />
                  )
                }
              />
              <Route
                path="/explore"
                element={
                  <Explore
                    redirect={this.setRedirectFilter}
                    searchOpts={this.state.filterOpts}
                    setOpts={this.setFilterOpts}
                    execSearch={this.searchArticles}
                    countries={this.state.countriesData}
                    categories={this.state.categoriesData}
                    articles={this.state.filteredData}
                  />
                }
              />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Fragment>
        ) : (
          <Loader />
        )}
      </ThemeProvider>
    );
  }

  setRedirectFilter = (val) => {
    this.setState({
      redirectFilter: val,
    });
  };

  setFilterOpts = (evt) => {
    let { name, value } = evt.target;
    this.setState({
      filterOpts: {
        [name]: value,
      },
    });
  };

  searchArticles = async (evt) => {
    if (evt.key === "Enter") {
      let query = await getArticles({
        text: this.state.searchText,
      });
      if (query.data) {
        this.setState({
          redirectFilter: true,
          filteredData: query.data,
        });
      }
    }
  };
}
