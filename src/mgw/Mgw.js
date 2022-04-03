import React, { Component } from "react";
import mgwTheme from "./utils/mgwTheme";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import { getMgwFixed, getMgwArticles, getArticles, postArticle } from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
import Loader from "./components/Loader";
import Landing from "./Landing";
import Explore from "./Explore";
import Create from "./Create";
import Article from "./Article";
import NavBar from "./components/NavBar";
import { draftToMarkdown } from "markdown-draft-js";

export default class Mgw extends Component {
  state = {
    allCountries: [],
    allCategories: [],
    allArticles: [],
    filterOpts: { ...helper.initFilterOpts },
    articleInputs: { ...helper.initArticleInputs },
    articleInputsErrors: {},
    articlesFetched: [],
    articleDetail: [],
    articlesTags: [],
    articlesLocations: [],
    articlePosted: "",
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
                    <Landing
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
                    locationOpts={this.state.allCountries}
                    catOpts={this.state.allCategories}
                    articleErrors={this.state.articleInputsErrors}
                    activeStep={this.state.createActiveStep}
                    setMgwState={this.setMgwState}
                    articleState={this.state.articleInputs}
                    setArticleState={this.setArticleInputs}
                    articleError={this.state.articleInputsErrors}
                    validateArticle={this.validateArticleInputs}
                    setArr={this.addArticleArraySize}
                    removeArr={this.removeArticleArraySize}
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

  setMgwState = (keyValuePair) => {
    this.setState({ ...keyValuePair });
  };

  setFilterOpts = ({name, value}) => {
    let opts = { ...this.state.filterOpts };
    opts[name] = value;
    this.setState({
      filterOpts: opts
    });
  };

  setArticleInputs = ({ target }) => {
    let inputs = {...this.state.articleInputs};
    let {name, value, checked} = target;
    value = name === "allowPublic" ? checked : value;
    inputs[name] = value;

    if (name === "country") {
      inputs.countryId = value._id;
      if (inputs.cityId.length) {
        inputs.cityId = "";
        inputs.city = helper.initArticleInputs.city;
      }
    }
    if (name === "city") {
      inputs.cityId = value._id;
    }
    if (name === "catIds" || name === "subcatIds") {
      const selCatIds = name === "catIds" ? inputs.catIds : this.state.articleInputs.catIds;
      const selSubcatIds = name === "subcatIds" ? inputs.subcatIds : this.state.articleInputs.subcatIds;
      let {catIds, subcatIds, depCatArr} = helper.getCatDep(this.state.allCategories, selCatIds, selSubcatIds);
      inputs.catIds = catIds;
      inputs.subcatIds = subcatIds;
      inputs.categories = depCatArr;
    }

    this.setState({
      articleInputs: inputs
    });
  };

  validateArticleInputs = (fields) => {
    const validation = fields.map(fieldName => {
      return helper.validate(fieldName, {...this.state.articleInputs});
    }).filter(v => v).reduce((a, v) => ({...a, [v.fieldName] : v.message }), {});

   this.setState({
      articleInputsErrors: validation || {}
    }, async () => {
      if (!Object.entries(validation)?.length) {
        if (this.state.createActiveStep === helper.createSteps.length - 1) {
          let pd = helper.transformArticle(this.state.articleInputs);
          await postArticle(pd).then(resp => {
            this.setState({
              articleInputs: helper.initArticleInputs,
              articleErrors: {},
              articlePosted: resp.data.results.insertedId
            });
          });
        } else {
          this.setState({
            createActiveStep: this.state.createActiveStep + 1
          });
        }
      }
    });
  }

  addArticleArraySize = (name, val) => {
    let inputs = {...this.state.articleInputs};
    inputs[name].push(val);
    this.setState({
      articleInputs: inputs
    });
  };

  removeArticleArraySize = (name, index) => {
    let inputs = {...this.state.articleInputs};
    inputs[name].splice(index, 1);
    this.setState({
      articleInputs: inputs
    });
  }

  searchArticles = (viewType) => {
    this.setState({ isLoaded: false }, async () => {
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
    });
  };

  submitArticle = (data) => {
    console.log(data);
  };
}
