import mgwTheme from "./utils/mgwTheme";
import React, { Component } from "react";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { getMgwFixed, getMgwArticles, getArticles } from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
import { Home, Explore, Create, Article, Loader, NavBar } from "./site";

export default class Main extends Component {
  state = {
    filterOpts: { ...helper.initFilterOpts },
    articleInputs: { ...helper.initArticleInputs },
    allCountries: [],
    allCategories: [],
    allArticles: [],
    articlesFetched: [],
    articleDetail: [],
    articlesTags: [],
    articlesLocations: [],
    createActiveStep: 0,
    isRedirectArticle: false,
    isRedirectListing: false,
    isLoaded: false
  };

  async componentDidMount() {
    const fixed = await getMgwFixed();
    const articles = await getMgwArticles();
    const uniqueTags = articles.tags.results
      .reduce((a, r) => [...a, ...r.tags], [])
      .filter((v, i, a) => a.indexOf(v) === i);

    this.setState({
      allCountries: fixed.countries.results,
      allCategories: fixed.categories.results,
      allArticles: articles.main,
      articlesFetched: articles.main.count ? articles.main.results : [],
      articlesTags: uniqueTags,
      articlesLocations: articles.location.count ? articles.location.results: [],
      isLoaded: true
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
                    countries={this.state.articlesLocations}
                    categories={this.state.allCategories}
                    articles={this.state.articlesFetched}
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
                    tagOpts={this.state.articlesTags}
                    article={this.state.articleInputs}
                    countries={this.state.allCountries}
                    categories={this.state.allCategories}
                    active={this.state.createActiveStep}
                    setArr={this.setArticleArrayVal}
                    setActive={this.setCreateActiveStep}
                    removeArr={this.removeArticleArrayVal}
                    submitArticle={this.submitArticle}
                  />
                }
              />
              <Route
                path="article/:id"
                element={
                  <Article
                    articleInputs={this.state.articleInputs}
                    article={this.state.articleDetail}
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
    const { type, key } = evt;
    if (type === "mousedown" || type === "click" || key === "Enter") {
      this.searchArticles(viewType);
    }
  };
  
  detectFilter = (evt) => {
    this.setFilterOpts(evt.target);
  };

  setMgwState = (pairs) => {
    this.setState({ ...pairs });
  };

  setCreateActiveStep = (index) => {
    this.setState({
      createActiveStep: index
    });
  }

  setFilterOpts = ({name, value}) => {
    let opts = { ...this.state.filterOpts };
    opts[name] = value;
    this.setState({
      filterOpts: opts
    });
  };

  setArticleArrayVal = (name, val) => {
    let inputs = {...this.state.articleInputs};
    inputs[name].push(val);
    this.setState({
      articleInputs: inputs
    });
  };

  setCreateActiveStep = (i) => {
    this.setState({
      createActiveStep: i
    });
  }

  removeArticleArrayVal = (name, index) => {
    let inputs = {...this.state.articleInputs};
    inputs[name].splice(index, 1);
    this.setState({
      articleInputs: inputs
    });
  }

  searchArticles = async (viewType) => {
    this.setState({ isLoaded: false });
    let params, query = {};

    if (viewType === helper.exploreView) {
      params = Object.fromEntries(
        Object.entries(this.state.filterOpts).filter(
          ([k, v]) => typeof v !== "undefined" && v.length
        )
      );
      
      if (params.rating && params.rating.length === 2) {
        params.ratingFrom = params.rating[0];
        params.ratingTo = params.rating[1];
      }
    } else if (viewType === helper.articleView) {
      params = { articleId: this.state.filterOpts.id };
    }

    query = await getArticles(params, viewType);
    if (query.data) {
      this.setState({
        // filterOpts: viewType === helper.articleView ?  { ...helper.initFilterOpts } : this.state.filterOpts,
        [viewType === helper.articleView ? "isRedirectArticle" : "isRedirectListing" ]: true,
        [viewType === helper.articleView ? "articleDetail" : "articlesFetched" ]: [...query.data.results] || [],
        isLoaded: true
      });
    }
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
