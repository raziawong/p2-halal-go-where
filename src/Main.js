import "./assets/custom.css";
import mgwTheme from "./utils/mgwTheme";
import React, { Component, Fragment } from "react";
import { getMgwFixed, getMgwArticles, getArticles } from "./utils/data";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { Loader, NavBar } from "./components/collection.js";
import { Home, Explore, Create } from "./views/collection.js";
import Article from "./views/Article";
import helper from "./utils/helper";

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
        {this.state.isLoaded ? (
          <Fragment>
            <NavBar />
            <Routes>
              <Route index path="/"
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
              <Route path="explore"
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
              <Route path="create"
                element={
                  <Create
                    tagOpts={this.state.allTags}
                    article={this.state.articleInputs}
                    submitArticle={this.submitArticle}
                  />
                }
              />
              <Route path="article/:id" element={
                <Article
                  article={this.state.articleInputs}
                  setMgwState={this.setMgwState}
                />} 
              />
            </Routes>
          </Fragment>
        ) : (
          <Loader />
        )}
      </ThemeProvider>
    );
  }

  setMgwState = (pairs) => {
    this.setState(pairs);
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
    console.log(type, key);
    if ( type === "mousedown" || type === "click" || key === "Enter") {
      if (viewType === helper.exploreView) {
        let params = Object.fromEntries(
          Object.entries(this.state.filterOpts).filter(
            ([k, v]) => typeof(v) !== "undefined" && (v.length || v)
          )
        );
        let query = await getArticles(params);
        this.setState({
          isRedirectListing: true,
          filteredData: query.data
        });
      } else if (viewType === helper.articleView) {
        let query = await getArticles({ articleId: this.state.filterOpts.id });
        this.setState({
          filterOpts: { ...helper.initFilterOpts },
          isRedirectArticle: true,
          filteredData: query.data
        });
      }
    }
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
