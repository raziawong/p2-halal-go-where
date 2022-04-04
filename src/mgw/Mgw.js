import React, { Component } from "react";
import mgwTheme from "./utils/mgwTheme";
import { ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom";
import {
  getMgwFixed,
  getMgwArticles,
  getArticles,
  postArticle,
  getArticleContributor,
} from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
import Loader from "./components/Loader";
import Landing from "./Landing";
import Explore from "./Explore";
import Create from "./Create";
import Article from "./Article";
import NavBar from "./components/NavBar";

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
    editActiveStep: 0,
    editModal: false,
    userEmail: "",
    userVerified: false,
    isRedirectListing: false,
    isMounted: false,
    isLoaded: false,
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
      articlesLocations: articles.location.count
        ? articles.location.results
        : [],
      isMounted: true,
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
                  />
                }
              />
              <Route
                path="article/:id"
                element={
                  <Article
                    tagOpts={this.state.articlesTags}
                    locationOpts={this.state.allCountries}
                    catOpts={this.state.allCategories}
                    articleState={this.state.articleInputs}
                    articleError={this.state.articleInputsErrors}
                    validateArticle={this.validateArticleInputs}
                    setArticleState={this.setArticleInputs}
                    setArr={this.addArticleArraySize}
                    removeArr={this.removeArticleArraySize}
                    activeStep={this.state.editActiveStep}
                    loaded={this.state.isLoaded}
                    mounted={this.state.isMounted}
                    editModal={this.state.editModal}
                    userEmail={this.state.userEmail}
                    userVerified={this.state.userVerified}
                    setMgwState={this.setMgwState}
                    article={this.state.articleDetail}
                    setFilterOpts={this.setFilterOpts}
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

  setFilterOpts = ({ name, value }) => {
    let opts = { ...this.state.filterOpts };
    opts[name] = value;
    this.setState({
      filterOpts: opts,
    });
  };

  setArticleInputs = ({ target }) => {
    let inputs = { ...this.state.articleInputs };
    let { name, value, checked } = target;
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
      const selCatIds =
        name === "catIds" ? inputs.catIds : this.state.articleInputs.catIds;
      const selSubcatIds =
        name === "subcatIds"
          ? inputs.subcatIds
          : this.state.articleInputs.subcatIds;
      let { catIds, subcatIds, depCatArr } = helper.getCatDep(
        this.state.allCategories,
        selCatIds,
        selSubcatIds
      );
      inputs.catIds = catIds;
      inputs.subcatIds = subcatIds;
      inputs.categories = depCatArr;
    }

    this.setState({
      articleInputs: inputs,
    });
  };

  validateArticleInputs = (fields, type) => {
    const validation = fields
      .map((fieldName) => {
        return helper.validate(fieldName, { ...this.state.articleInputs });
      })
      .filter((v) => v)
      .reduce((a, v) => ({ ...a, [v.fieldName]: v.message }), {});

    this.setState(
      {
        articleInputsErrors: validation || {},
      },
      async () => {
        if (!Object.entries(validation)?.length) {
          let { createActiveStep, editActiveStep, articleInputs } = this.state;
          if (type === "create") {
            if (createActiveStep === helper.createSteps.length - 1) {
              let pd = helper.transformArticleForUpdate(articleInputs);
              await postArticle(pd).then((resp) => {
                this.setState({
                  articleInputs: helper.initArticleInputs,
                  articleErrors: {},
                  articlePosted: resp.data.results.insertedId,
                  activeState: 0,
                });
              });
            } else {
              this.setState({
                createActiveStep: createActiveStep + 1,
              });
            }
          }

          if (type === "edit") {
            if (editActiveStep === 0 && articleInputs.email) {
              await this.verifyArticleUser(
                articleInputs._id,
                articleInputs.email
              );
            } else {
              this.setState({
                editActiveStep: this.state.editActiveStep + 1
              })
            }
          }
        }
      }
    );
  };

  addArticleArraySize = (name, val) => {
    let inputs = { ...this.state.articleInputs };
    inputs[name].push(val);
    this.setState({
      articleInputs: inputs,
    });
  };

  removeArticleArraySize = (name, index) => {
    let inputs = { ...this.state.articleInputs };
    inputs[name].splice(index, 1);
    this.setState({
      articleInputs: inputs,
    });
  };

  verifyArticleUser = async (articleId, email) => {
    await getArticleContributor({ articleId, email }).then((resp) => {
      if (resp.data.count) {
        let update = {
          userEmail: email,
          userVerified: true,
        };
        if (this.state.editActiveStep === 0) {
          update.editActiveStep = 1;
        }
        this.setState(update);
      } else {
        this.setState({
          userEmail: "",
          userVerified: false,
        });
      }
    });
  };

  searchArticles = (viewType) => {
    this.setState({ isLoaded: false }, async () => {
      let { filterOpts } = this.state;
      let params, query = {};

      if (viewType === helper.exploreView) {
        params = Object.fromEntries(
          Object.entries(filterOpts).filter(
            ([k, v]) => typeof v !== "undefined" && v.length
          )
        );
        if (params.rating && params.rating.length === 2) {
          params.ratingFrom = params.rating[0];
          params.ratingTo = params.rating[1];
        }
      } else if (viewType === helper.articleView) {
        params = { articleId: filterOpts.id };
        console.log(params);
      }

      query = await getArticles(params, viewType);
      if (query.data.results) {
        let { articlesLocations, allCategories } = this.state;
        // const results = query.data.results.map(async r => {
        //   let locResp = await getCountriesCities({
        //     countryId: r.location.countryId,
        //     city: r.location.cityId
        //   });
        //   let locResults = locResp.data.results;
        //   if (locResults.count) {
        //     r.country = locResults[0].name;
        //     r.city = locResults[0].cities[0].name;
        //   }
        //   console.log(r);
        //   return r;
        // });

        let transformed = await helper.transformArticlesForRead(
          query.data.results,
          articlesLocations,
          allCategories
        )
          console.log(transformed);
        viewType === helper.articleView
        ? this.setState({
            articleDetail: [...transformed][0] || [],
            isLoaded: true
          })
        : this.setState({
            isRedirectListing: true,
            articlesFetched: [...transformed] || [],
            isLoaded: true
          });
      }
    });
  };
}
