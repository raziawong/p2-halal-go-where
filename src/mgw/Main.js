import mgwTheme from "./utils/mgwTheme";
import React, { Component, Fragment } from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { getMgwFixed, getMgwArticles, getArticles } from "./utils/data";
import helper from "./utils/helper"
import { Home, Explore, Create, Article, Loader, NavBar } from "./site";

export default class Main extends Component {
  state = {
    filterOpts: { ...helper.initFilterOpts },
    filteredData: [],
    articleInputs: { ...helper.initArticleInputs },
    allCountries: [],
    allCategories: [],
    allArticles: [],
    allTags: [],
    isRedirectArticle: false,
    isRedirectListing: false,
    isLoaded: false
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
      filteredData: articles.main,
      allTags: uniqueTags,
      isLoaded: true,
    });
  }

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        <Fragment>
          {this.state.isLoaded ? <></> : <Loader />}
          <NavBar />
          <Routes>
            <Route
              index
              path="/"
              element={
                this.state.isRedirectListing ? (
                  <Navigate replace to="/explore" />
                ) : (
                  <Home
                    filterOpts={this.state.filterOpts}
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
                  filterOpts={this.state.filterOpts}
                  countries={this.state.allCountries}
                  categories={this.state.allCategories}
                  articles={this.state.filteredData}
                  setMgwState={this.setMgwState}
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
            <Route
              path="article/:id"
              element={
                <Article
                  article={this.state.articleInputs}
                  setMgwState={this.setMgwState}
                />
              }
            />
          </Routes>
        </Fragment>
      </ThemeProvider>
    );
  }

  setMgwState = (pairs) => {
    this.setState({...pairs});
  }

  setFilterOpts = (evt) => {
    let { name, value } = evt.target;
    this.setState({
      filterOpts: {
        ...this.state.filterOpts,
        [name]: value,
      },
    });
  };

  searchArticles = async (evt, viewType) => {
    let { type, key } = evt;
    if ( type === "mousedown" || type === "click" || key === "Enter") {
      this.setState({
        isLoaded: false
      });

      if (viewType === helper.exploreView) {
        let params = Object.fromEntries(
          Object.entries(this.state.filterOpts).filter(
            ([k, v]) => typeof(v) !== "undefined" && (v.length || v)
          )
        );
        let query = await getArticles(params);
        this.setState({
          isRedirectListing: true,
          filteredData: query.data ? query.data : []
        });
      } else if (viewType === helper.articleView) {
        let query = await getArticles({ articleId: this.state.filterOpts.id });
        this.setState({
          filterOpts: { ...helper.initFilterOpts },
          isRedirectArticle: true,
          filteredData: query.data ? query.data : []
        });
      }
    }
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
