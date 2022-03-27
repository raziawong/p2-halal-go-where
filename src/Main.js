import "./assets/custom.css";
import mgwTheme from "./utils/mgwTheme";
import React, { Component, Fragment } from "react";
import { getMgwFixed, getMgwArticles, getArticles } from "./utils/data";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { Loader, NavBar } from "./components/collection.js";
import { Home, Explore, Create } from "./views/collection.js";
import Article from "./views/Article";

export default class Main extends Component {
  state = {
    redirectFilter: false,
    filterOpts: {
      stext: "",
      country: "none",
      city: "none",
      categories: "none",
      subcategories: [],
    },
    filteredData: [],
    articleInputs: {
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
    allCountries: [],
    allCategories: [],
    allArticles: [],
    allTags: [],
    loaded: false,
  };

  async componentDidMount() {
    let fixed = await getMgwFixed();
    let articles = await getMgwArticles();
    let uniqueTags = articles.tags.results
      .reduce((a, r) => [...a, ...r.tags], [])
      .filter((v, i, a) => a.indexOf(v) == i);

    this.setState({
      allCountries: fixed.countries,
      allCategories: fixed.categories,
      allArticles: articles.main,
      allTags: uniqueTags,
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
                path="explore"
                element={
                  <Explore
                    searchOpts={this.state.filterOpts}
                    countries={this.state.allCountries}
                    categories={this.state.allCategories}
                    articles={this.state.allArticles}
                    redirect={this.setRedirectFilter}
                    setOpts={this.setFilterOpts}
                    execSearch={this.searchArticles}
                  />
                }
              />
              <Route
                path="create"
                element={
                  <Create
                    tagOpts={this.state.allTags}
                    article={this.state.articleInputs}
                    submitArticle={this.submitArticle}
                  />
                }
              />
              <Route path="article/:id" element={<Article />} />
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
        ...this.state.filterOpts,
        [name]: value,
      },
    });
  };

  searchArticles = async (evt) => {
    let { type, key } = evt;
    let { value } = evt.target;
    value = value ? value : this.state.filterOpts.stext;

    if (
      type === "mousedown" ||
      type === "click" ||
      (type === "" && key === "Enter")
    ) {
      let query = await getArticles({
        text: value,
      });
      if (query.data) {
        this.setState({
          redirectFilter: true,
          filteredData: query.data,
        });
      }
    }
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
