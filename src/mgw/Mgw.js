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
  getCollection,
  postCollectionItem,
  deleteCollectionItem,
} from "./utils/data";
import helper from "./utils/helper";
import { SiteContainer, ViewContainer } from "./utils/mgwStyle";
import Loader from "./components/shared/Loader";
import Landing from "./Landing";
import Explore from "./Explore";
import Create from "./Create";
import Collection from "./Collection";
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
    articlesLatest: [],
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
    userVerifyErrorMsg: "",
    curatedFetched: [],
    curateInputs: { ...helper.initCurateInputs },
    curateInputsErrors: {},
    collectionModal: false,
    collectionAction: "retrieve",
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
                    latestArticles={this.state.articlesLatest}
                    allCategories={this.state.allCategories}
                    setMgwState={this.setMgwState}
                    execSearch={this.fetchArticles}
                  />
                }
              />
              <Route
                path="explore"
                element={
                  <Explore
                    filterOpts={this.state.filterOpts}
                    pageNumber={this.state.pageNumber}
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
                    collectionAction={this.state.collectionAction}
                    collectionModal={this.state.collectionModal}
                    curateState={this.state.curateInputs}
                    curateErrors={this.state.curateInputsErrors}
                    validateCurate={this.validateCurateInputs}
                    requestSuccess={this.state.requestSuccess}
                    requestError={this.state.requestError}
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
                    articlePosted={this.state.articlePosted}
                    requestSuccess={this.state.requestSuccess}
                    requestError={this.state.requestError}
                  />
                }
              />
              <Route
                path="collection"
                element={
                  <Collection
                    collectionAction={this.state.collectionAction}
                    collectionModal={this.state.collectionModal}
                    curatedFetched={this.state.curatedFetched}
                    curateState={this.state.curateInputs}
                    curateErrors={this.state.curateInputsErrors}
                    setMgwState={this.setMgwState}
                    validateCurate={this.validateCurateInputs}
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
                !this.state.deleteModal &&
                !this.state.collectionModal
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
      articlesLatest:
        articles.main.totalCount > 2 ? [...transformed].slice(0, 3) : [],
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
    if (
      this.state.articlePosted &&
      prevState.articlePosted !== this.state.articlePosted
    ) {
      this.fetchLocationsTagged();
      this.fetchArticles(helper.exploreView);
      this.fetchArticlesLatest();
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
      this.setState({
        pageNumber: 1,
        actionModal: false,
      });
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
        name === "subcatIds" ? opts.subcatIds : this.state.filterOpts.subcatIds;
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
      const { filterOpts, sortIndex } = this.state;
      const sortOptions = helper.sortOptions[sortIndex];
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
        delete params["rating"];
      } else if (viewType === helper.articleView) {
        params = { articleId: filterOpts.id };
      }

      await getArticles(params, viewType, sortOptions, this.state.pageNumber)
        .then(async (resp) => {
          if (resp.data.results?.length) {
            const { articlesLocations, allCategories } = this.state;
            const transformed = await helper.transformArticlesForRead(
              resp.data.results,
              articlesLocations,
              allCategories
            );
            viewType === helper.articleView
              ? this.setState({
                  articleDetail: [...transformed][0],
                  isLoaded: true,
                  requestError: "",
                })
              : this.setState({
                  articlesFetched: [...transformed],
                  articlesTotal: resp.data.totalCount,
                  isLoaded: true,
                  requestError: "",
                });
          } else {
            viewType === helper.articleView
              ? this.setState({
                  articleDetail: [],
                  isLoaded: true,
                  requestError: "",
                })
              : this.setState({
                  articlesFetched: [],
                  articlesTotal: 0,
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

  fetchArticlesLatest = async () => {
    await getArticles({}, helper.exploreView)
      .then(async (resp) => {
        if (resp.data.results && resp.data.totalCount > 2) {
          const { articlesLocations, allCategories } = this.state;
          const transformed = await helper.transformArticlesForRead(
            resp.data.results.slice(0, 3),
            articlesLocations,
            allCategories
          );
          this.setState({
            articlesLatest: [...transformed] || [],
          });
        } else {
          this.setState({
            articlesLatest: [],
          });
        }
      })
      .catch((err) => {
        console.log("Failed to load latest articles");
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
        const {
          createActiveStep,
          editActiveStep,
          deleteActiveStep,
          articleInputs,
          userEmail,
        } = this.state;

        if (type === "create") {
          if (createActiveStep === helper.createSteps.length - 1) {
            const pd = helper.transformArticleForUpdate(articleInputs);
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
        } else if (type === "edit") {
          if (
            editActiveStep === 0 &&
            articleInputs.email &&
            articleInputs.allowPublic
          ) {
            await this.verifyArticleUser(
              { ...articleInputs, articleId: articleInputs._id },
              type
            );
            if (!this.state.userEmail) {
              const newContributorValidation = ["displayName", "name"]
                .map((fieldName) => {
                  return helper.validate(
                    fieldName,
                    articleInputs,
                    "newContributor"
                  );
                })
                .filter((v) => v)
                .reduce((a, v) => ({ ...a, [v.fieldName]: v.message }), {});
              this.setState({
                articleInputsErrors: {
                  ...this.state.articleInputsErrors,
                  ...newContributorValidation,
                },
              });
            }
          } else if (editActiveStep === 0 && articleInputs.email) {
            await this.verifyArticleUser(
              { ...articleInputs, articleId: articleInputs._id },
              type
            );
          } else if (editActiveStep === helper.editSteps.length - 1) {
            const pd = helper.transformArticleForUpdate(
              articleInputs,
              userEmail?.length
            );
            await updateArticle(pd)
              .then((resp) => {
                this.setState({
                  articleErrors: {},
                  editActiveStep: 0,
                  articlePosted: resp.data.results.insertedId,
                  requestSuccess:
                    "Article updated successfully, close the modal to view the updates",
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
        } else if (type === "delete") {
          if (deleteActiveStep === 0 && articleInputs.email) {
            await this.verifyArticleUser(
              { ...articleInputs, articleId: articleInputs._id },
              type
            );
          } else if (deleteActiveStep === helper.deleteSteps.length - 1) {
            const articleId = articleInputs._id;
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

  verifyArticleUser = async ({ articleId, email, name, allowPublic }, type) => {
    await getArticleContributor({ articleId, email })
      .then((resp) => {
        const contributors = resp.data.count
          ? resp.data.results[0].contributors
          : [];
        const stateUpdate = {
          userEmail: "",
          userVerifyErrorMsg: "",
          requestError: "",
          isNewUser: false,
        };
        if (contributors.length) {
          stateUpdate.userEmail = email;
          if (type === "edit" && this.state.editActiveStep === 0) {
            stateUpdate.editActiveStep = 1;
          }
          if (type === "delete" && this.state.deleteActiveStep === 0) {
            stateUpdate.deleteActiveStep = 1;
          }
          this.setState(stateUpdate);
        } else if (
          type === "edit" &&
          allowPublic &&
          this.state.editActiveStep === 0
        ) {
          if (!name) {
            stateUpdate.userVerifyErrorMsg = helper.templates.userPublic;
          } else {
            stateUpdate.userVerifyErrorMsg = "";
            stateUpdate.editActiveStep = 1;
          }
        } else {
          stateUpdate.userVerifyErrorMsg = helper.templates.user;
        }

        this.setState(stateUpdate);
      })
      .catch((err) => {
        this.setState({
          requestError: "Failed to get contributor with " + articleId,
        });
      });
  };

  fetchLocationsTagged = async (articleId = "") => {
    const promise = articleId.length
      ? getLocationsTagged({ articleId })
      : getLocationsTagged({});
    await promise.then((resp) => {
      if (resp.data.count) {
        this.setState({
          articlesLocations: [...resp.data.results],
        });
      }
    });
  };

  fetchArticleRating = async (articleId) => {
    const dtl = { ...this.state.articleDetail } || {};
    if (
      articleId &&
      articleId === dtl._id &&
      dtl.rating &&
      Object.keys(dtl.rating).length
    ) {
      await getRating({ articleId })
        .then((resp) => {
          if (resp.data.count) {
            const newRating = { ...dtl.rating, ...resp.data.results[0].rating };
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
    const dtl = { ...this.state.articleDetail } || {};
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
      .map((fieldName) =>
        helper.validate(fieldName, { ...this.state.commentInputs }, "comments")
      )
      .filter((v) => v)
      .reduce((a, v) => ({ ...a, [v.fieldName]: v.message }), {});

    this.setState({ commentInputsErrors: validation || {} }, async () => {
      if (!Object.entries(validation)?.length) {
        const bodyContent = { ...this.state.commentInputs, articleId };
        await postComment(bodyContent)
          .then((resp) => {
            this.fetchArticleComments(articleId);
            this.setState({
              requestError: "",
            });
          })
          .catch((err) => {
            this.setState({
              requestError: "Failed to post article comment",
            });
          });
      }
    });
  };

  fetchCollection = async () => {
    const { curateEmail } = { ...this.state.curateInputs };
    const { articlesLocations, allCategories } = this.state;

    if (curateEmail) {
      await getCollection({ curateEmail })
        .then(async (resp) => {
          if (resp.data.count) {
            const transformed = await helper.transformArticlesForRead(
              resp.data.results,
              articlesLocations,
              allCategories
            );
            this.setState({
              curatedFetched: [...transformed],
              curateEmail: curateEmail,
              requestError: "",
            });
          }
        })
        .catch((err) => {
          this.setState({
            requestError: "Failed to get collection with " + curateEmail,
          });
        });
    }
  };

  validateCurateInputs = (fields) => {
    const { collectionAction, curateInputs } = this.state;
    const validation = fields
      .map((fieldName) =>
        helper.validate(fieldName, { ...curateInputs }, "curate")
      )
      .filter((v) => v)
      .reduce((a, v) => ({ ...a, [v.fieldName]: v.message }), {});

    this.setState({ curateInputsErrors: validation || {} }, async () => {
      if (!Object.entries(validation)?.length) {
        if (collectionAction === "add") {
          await postCollectionItem({ ...curateInputs })
            .then((resp) => {
              this.fetchCollection();
              this.setState({
                curateErrors: {},
                requestSuccess: "Article successfully added to your collection",
                requestError: "",
              });
            })
            .catch((err) => {
              this.setState({
                curateErrors: {},
                requestError: "Failed to add article to collection",
                requestSuccess: "",
              });
            });
        } else if (collectionAction === "delete") {
          await deleteCollectionItem({ ...curateInputs })
            .then((resp) => {
              this.fetchCollection();
              this.setState({
                requestSuccess:
                  "Article successfully removed from your collection",
                requestError: "",
              });
            })
            .catch((err) => {
              this.setState({
                requestError: "Failed to remove article from your collection",
                requestSuccess: "",
              });
            });
        } else {
          this.fetchCollection();
        }
      }
    });
  };
}
