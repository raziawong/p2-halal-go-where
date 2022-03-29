import mgwTheme from "./utils/mgwTheme";
import React, { Component, Fragment } from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { getMgwFixed, getMgwArticles, getArticles } from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
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
    isLoaded: false,
    test: {}
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
      filteredData: articles.main.count ? articles.main.results : [],
      allTags: uniqueTags,
      isLoaded: true,
    });
  }

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        <SiteContainer sx={{ overflow: this.state.isLoaded ? "" : "hidden" }}>
          <ViewContainer>
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
                      detectFilter={this.detectFilter}
                      detectSearch={this.detectSearch}
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
                    loaded={this.state.isLoaded}
                    setMgwState={this.setMgwState}
                    setFilterOpts={this.setFilterOpts}
                    detectFilter={this.detectFilter}
                    detectSearch={this.detectSearch}
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
                    articleInputs={this.state.articleInputs}
                    article={this.state.filteredData}
                    loaded={this.state.isLoaded}
                    setFilterOpts={this.setFilterOpts}
                    setMgwState={this.setMgwState}
                    execSearch={this.searchArticles}
                  />
                }
              />
            </Routes>
          </ViewContainer>
          <Loader toShow={!this.state.isLoaded} />
        </SiteContainer>
      </ThemeProvider>
    );
  }

  detectSearch = (evt, viewType) => {
    let { type, key } = evt;
    if (type === "mousedown" || type === "click" || key === "Enter") {
      this.searchArticles(viewType);
    }
  };
  
  detectFilter = (evt) => {
    this.setFilterOpts(evt.target);
  }

  setMgwState = (pairs) => {
    this.setState({ ...pairs });
  };

  setFilterOpts = ({name, value}) => {
    let opts = this.state.filterOpts;
    opts[name] = value;
    this.setState({
      filterOpts: { ...opts }
    });
  };

  searchArticles = async (viewType) => {
    console.log("Options: ", this.state);
    this.setState({ isLoaded: false });
    let params, query = {};

    if (viewType === helper.exploreView) {
      params = Object.fromEntries(
        Object.entries(this.state.filterOpts).filter(
          ([k, v]) => typeof v !== "undefined" && (v.length || v)
        )
      );
    } else if (viewType === helper.articleView) {
      params = { articleId: this.state.filterOpts.id };
    }

    query = await getArticles(params);
    if (query.data && query.data.count) {
      this.setState({
        // filterOpts: viewType === helper.articleView ?  { ...helper.initFilterOpts } : this.state.filterOpts,
        [viewType === helper.articleView ? "isRedirectArticle" : "isRedirectListing" ]: true,
        filteredData: [...query.data.results] || [],
        isLoaded: true
      });
    }
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
