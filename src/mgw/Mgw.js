import React, { Component } from "react";
import mgwTheme from "./utils/mgwTheme";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import {
  getMgwFixed,
  getMgwArticles,
  getArticles,
  postArticle,
  getArticleContributor,
  updateArticle,
  deleteArticle,
  updateRating,
  getRating,
  postComment,
  getComments,
  getLocationsTagged,
} from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
import Loader from "./components/shared/Loader";
import Landing from "./Landing";
import Explore from "./Explore";
import Create from "./Create";
import Article from "./Article";
import NavBar from "./components/shared/NavBar";
import NotFound from "./NotFound";

export default class Mgw extends Component {
  state = {
    allCountries: [],
    allCategories: [],
    allArticles: [],
    filterOpts: { ...helper.initFilterOpts },
    sortIndex: 0,
    sortMenuAnchor: null,
    pageNumber: 1,
    articleInputs: { ...helper.initArticleInputs },
    articleInputsErrors: {},
    articlesFetched: [],
    articlesTotal: [],
    articleDetail: [],
    articlesTags: [],
    articlesLocations: [],
    articlePosted: "",
    commentInputs: { ...helper.initCommentInputs },
    commentInputsErrors: {},
    createActiveStep: 0,
    editActiveStep: 0,
    deleteActiveStep: 0,
    editModal: false,
    deleteModal: false,
    actionModal: false,
    navDrawer: false,
    userEmail: "",
    userVerifyErrorMsg: false,
    isMounted: false,
    isLoaded: false,
    requestError: "",
    requestSuccess: "",
  };

  render() {
    return (
      <ThemeProvider theme={mgwTheme}>
        <SiteContainer sx={{ overflow: this.state.isLoaded ? "" : "hidden" }}>
          <ViewContainer>
            <NavBar
              navOpen={this.state.navDrawer}
              setMgwState={this.setMgwState}
              fetchArticles={this.fetchArticles}
              filterOpts={this.state.filterOpts}
              setFilterOpts={this.setFilterOpts}
            />
            <Routes>
              <Route
                index
                path="/"
                element={
                  <Landing
                    filterOpts={this.state.filterOpts}
                    setFilterOpts={this.setFilterOpts}
                    detectSearch={this.detectSearch}
                  />
                }
              />
              <Route
                path="explore"
                element={
                  <Explore
                    filterOpts={this.state.filterOpts}
                    sortIndex={this.state.sortIndex}
                    sortAnchor={this.state.sortMenuAnchor}
                    countries={this.state.articlesLocations}
                    categories={this.state.allCategories}
                    articles={this.state.articlesFetched}
                    articlesTotal={this.state.articlesTotal}
                    actionModal={this.state.actionModal}
                    loaded={this.state.isLoaded}
                    setMgwState={this.setMgwState}
                    setFilterOpts={this.setFilterOpts}
                    detectSearch={this.detectSearch}
                    requestError={this.state.requestError}
                  />
                }
              >
                <Route
                  path=":page"
                  element={
                    <Explore
                      filterOpts={this.state.filterOpts}
                      pageNumber={this.state.pageNumber}
                      sortIndex={this.state.sortIndex}
                      sortAnchor={this.state.sortMenuAnchor}
                      countries={this.state.articlesLocations}
                      categories={this.state.allCategories}
                      articles={this.state.articlesFetched}
                      actionModal={this.state.actionModal}
                      loaded={this.state.isLoaded}
                      setMgwState={this.setMgwState}
                      setFilterOpts={this.setFilterOpts}
                      detectSearch={this.detectSearch}
                      requestError={this.state.requestError}
                    />
                  }
                />
              </Route>
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
                    articlePosted={this.state.articlePosted}
                    requestSuccess={this.state.requestSuccess}
                    requestError={this.state.requestError}
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
                    deleteStep={this.state.deleteActiveStep}
                    loaded={this.state.isLoaded}
                    mounted={this.state.isMounted}
                    editModal={this.state.editModal}
                    deleteModal={this.state.deleteModal}
                    userEmail={this.state.userEmail}
                    userVerifyErrorMsg={this.state.userVerifyErrorMsg}
                    setMgwState={this.setMgwState}
                    article={this.state.articleDetail}
                    setFilterOpts={this.setFilterOpts}
                    execSearch={this.fetchArticles}
                    updateRating={this.updateArticleRating}
                    commentState={this.state.commentInputs}
                    commentError={this.state.commentInputsErrors}
                    validateComment={this.validateArticleComment}
                    setCommentState={this.setCommentInputs}
                    articlePosted={this.state.articlePosted}
                    requestSuccess={this.state.requestSuccess}
                    requestError={this.state.requestError}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ViewContainer>
          <Loader toShow={!this.state.isLoaded} />
          {this.state.requestError && (
            <Snackbar
              open={
                !!this.state.requestError &&
                !this.state.editModal &&
                !this.state.deleteModal
              }
              autoHideDuration={6000}
              onClose={this.handleToastClose}
              sx={{ bottom: 130, left: 10 }}
            >
              <Alert severity="error">{this.state.requestError}</Alert>
            </Snackbar>
          )}
        </SiteContainer>
      </ThemeProvider>
    );
  }

  async componentDidMount() {
    const fixed = await getMgwFixed();
    const articles = await getMgwArticles();
    const uniqueTags = articles.tags.results
      .reduce((a, r) => [...a, ...r.tags], [])
      .filter((v, i, a) => a.indexOf(v) === i);
    const transformed = await helper.transformArticlesForRead(
        articles.main.results,
        articles.location.results,
        fixed.categories.results
    );  

    this.setState({
      allCountries: fixed.countries.results,
      allCategories: fixed.categories.results,
      allArticles: articles.main,
      articlesFetched: articles.main.count ? [...transformed] : [],
      articlesTotal: articles.main.totalCount || null,
      articlesTags: uniqueTags,
      articlesLocations: articles.location.count
        ? articles.location.results
        : [],
      isMounted: true,
      isLoaded: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortIndex !== this.state.sortIndex ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.fetchArticles(helper.exploreView);
    }
    if (prevState.articlePosted !== this.state.articlePosted && this.state.articlePosted.length) {
      this.fetchLocationsTagged();
    }
    // if (prevState.navDrawer) {
    //   this.setState({
    //     navDrawer: false,
    //   });
    // }
  }

  detectSearch = (evt, viewType) => {
    const { type, key } = evt;
    if (type === "mousedown" || type === "click" || key === "Enter") {
      this.fetchArticles(viewType);
    }
  };

  handleToastClose = () => {
    this.setState({
      requestError: "",
    });
  };

  setMgwState = (keyValuePair) => {
    this.setState({ ...keyValuePair });
  };

  setFilterOpts = ({ name, value }) => {
    let opts = { ...this.state.filterOpts };
    opts[name] = value;

    if (name === "catIds" || name === "subcatIds") {
      const selCatIds =
        name === "catIds" ? opts.catIds : this.state.filterOpts.catIds;
      const selSubcatIds =
        name === "subcatIds"
          ? opts.subcatIds
          : this.state.filterOpts.subcatIds;
      const catDep = helper.getCatDep(
        this.state.allCategories,
        selCatIds,
        selSubcatIds
      );
      opts.catIds = [...catDep.catIds];
      opts.subcatIds = [...catDep.subcatIds];
    }

    this.setState({
      filterOpts: opts,
    });
  };

  fetchArticles = (viewType) => {
    this.setState({ isLoaded: false }, async () => {
      let { filterOpts, sortIndex } = this.state;
      let sortOptions = helper.sortOptions[sortIndex];
      let params = {};

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
      }

      await getArticles(params, viewType, sortOptions, this.state.pageNumber)
        .then(async (resp) => {
          if (resp.data.results) {
            let { articlesLocations, allCategories } = this.state;
            let transformed = await helper.transformArticlesForRead(
              resp.data.results,
              articlesLocations,
              allCategories
            );
            viewType === helper.articleView
              ? this.setState({
                  articleDetail: [...transformed][0] || [],
                  isLoaded: true,
                  requestError: "",
                })
              : this.setState({
                  articlesFetched: [...transformed] || [],
                  isLoaded: true,
                  requestError: "",
                });
          }
        })
        .catch((err) => {
          this.setState({
            requestError: "Failed to load articles, please try again",
          });
        });
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
      const catDep = helper.getCatDep(
        this.state.allCategories,
        selCatIds,
        selSubcatIds
      );
      inputs.catIds = [...catDep.catIds];
      inputs.subcatIds = [...catDep.subcatIds];
      inputs.categories = [...catDep.depCatArr];
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

    this.setState({ articleInputsErrors: validation || {} }, async () => {
      if (!Object.entries(validation)?.length) {
        let {
          createActiveStep,
          editActiveStep,
          deleteActiveStep,
          articleInputs
        } = this.state;

        if (type === "create") {
          if (createActiveStep === helper.createSteps.length - 1) {
            let pd = helper.transformArticleForUpdate(articleInputs);
            await postArticle(pd)
              .then((resp) => {
                this.setState({
                  articleInputs: { ...helper.initArticleInputs },
                  articleErrors: {},
                  articlePosted: resp.data.results.insertedId,
                  createActiveStep: 0,
                  requestSuccess: "Article created successfully",
                  requestError: "",
                });
              })
              .catch((err) => {
                this.setState({
                  articlePosted: "",
                  requestError: "Failed to post new article, please try again",
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
              articleInputs.email,
              type
            );
          } else if (editActiveStep === helper.editSteps.length - 1) {
            let pd = helper.transformArticleForUpdate(articleInputs);
            await updateArticle(pd)
              .then((resp) => {
                this.setState({
                  articleErrors: {},
                  editActiveStep: 0,
                  articlePosted: resp.data.results.insertedId,
                  requestSuccess: "Article updated successfully, close the modal to view the updates",
                  requestError: "",
                });
              })
              .catch((err) => {
                this.setState({
                  requestSuccess: "",
                  requestError:
                    "Failed to update article with " + articleInputs._id,
                });
              });
          } else {
            this.setState({
              editActiveStep: editActiveStep + 1,
            });
          }
        }

        if (type === "delete") {
          if (deleteActiveStep === 0 && articleInputs.email) {
            await this.verifyArticleUser(
              articleInputs._id,
              articleInputs.email,
              type
            );
          } else if (deleteActiveStep === helper.deleteSteps.length - 1) {
            let articleId = articleInputs._id;
            if (articleId) {
              await deleteArticle({ articleId })
                .then((resp) => {
                  this.setState({
                    articleErrors: {},
                    deleteActiveStep: 0,
                    requestSuccess: "Article deleted successfully",
                    requestError: "",
                  });
                })
                .catch((err) => {
                  this.setState({
                    requestSuccess: "",
                    requestError:
                      "Failed to delete article with " + articleInputs._id,
                  });
                });
            }
          } else {
            this.setState({
              deleteActiveStep: deleteActiveStep + 1,
            });
          }
        }
      }
    });
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

  verifyArticleUser = async (articleId, email, type) => {
    await getArticleContributor({ articleId, email })
      .then((resp) => {
        if (resp.data.count) {
          let update = {
            userEmail: email,
            userVerifyErrorMsg: "",
            requestError: "",
          };

          if (type === "edit" && this.state.editActiveStep === 0) {
            update.editActiveStep = 1;
          }
          if (type === "delete" && this.state.deleteActiveStep === 0) {
            update.deleteActiveStep = 1;
          }
          this.setState(update);
        } else {
          this.setState({
            userEmail: "",
            userVerifyErrorMsg: helper.templates.user,
            requestError: "",
          });
        }
      })
      .catch((err) => {
        this.setState({
          requestError: "Failed to get contributor with " + articleId,
        });
      });
  };

  fetchLocationsTagged = async (articleId="") => {
    const promise = articleId.length ? getLocationsTagged({articleId}) : getLocationsTagged({});
    await promise.then((resp) => {
      if (resp.data.count) {
        this.setState({
          articlesLocations: [...resp.data.results]
        });
      }
    });
  }

  fetchArticleRating = async (articleId) => {
    let dtl = { ...this.state.articleDetail } || {};
    if (
      articleId &&
      articleId === dtl._id &&
      dtl.rating &&
      Object.keys(dtl.rating).length
    ) {
      await getRating({ articleId })
        .then((resp) => {
          if (resp.data.count) {
            let newRating = { ...dtl.rating, ...resp.data.results[0].rating };
            this.setState({
              articleDetail: {
                ...dtl,
                rating: newRating,
              },
              requestError: "",
            });
          }
        })
        .catch((err) => {
          this.setState({
            requestError: "Failed to get latest article rating",
          });
        });
    }
  };

  updateArticleRating = async (articleId, rateValue) => {
    const rating = { ...this.state.articleDetail }?.rating || {};
    if (articleId && rating && Object.keys(rating).length && rateValue) {
      rateValue = rating.count ? (rating.avg + rateValue) / 2 : rateValue;
      await updateRating({ articleId, rating: rateValue })
        .then((resp) => {
          this.fetchArticleRating(articleId);
        })
        .catch((err) => {
          this.setState({
            requestError: "Failed to update article rating",
          });
        });
    }
  };

  setCommentInputs = ({ target }) => {
    this.setState({
      commentInputs: {
        ...this.state.commentInputs,
        [target.name]: target.value,
      },
    });
  };

  fetchArticleComments = async (articleId) => {
    let dtl = { ...this.state.articleDetail } || {};
    if (articleId && articleId === dtl._id) {
      await getComments({ articleId })
        .then((resp) => {
          if (resp.data.count)
            this.setState({
              articleDetail: {
                ...dtl,
                comments: [...resp.data.results[0].comments],
              },
              commentInputs: { ...helper.initCommentInputs },
              commentInputsErrors: {},
              requestError: "",
            });
        })
        .catch((err) => {
          this.setState({
            requestError: "Failed to get latest article rating",
          });
        });
    }
  };

  validateArticleComment = (articleId, fields) => {
    const validation = fields
      .map((fieldName) => {
        return helper.validate(
          fieldName,
          { ...this.state.commentInputs },
          "comments"
        );
      })
      .filter((v) => v)
      .reduce((a, v) => ({ ...a, [v.fieldName]: v.message }), {});

    this.setState({ commentInputsErrors: validation || {} }, async () => {
      if (!Object.entries(validation)?.length) {
        const bodyContent = { ...this.state.commentInputs, articleId };
        await postComment(bodyContent)
          .then((resp) => {
            this.fetchArticleComments(articleId);
          })
          .catch((err) => {
            this.setState({
              requestError: "Failed to post article comment",
            });
          });
      }
    });
  };
}
