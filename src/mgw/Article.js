import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import helper from "./utils/helper";
import { Container, Box, IconButton, Typography } from "@mui/material";
import { BookmarkAddSharp } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import NotFound from "./NotFound";
import ArticleChips from "./components/article/ArticleChips";
import AuthorAction from "./components/article/AuthorAction";
import ArticleComments from "./components/article/ArticleComments";
import ImageCarousel from "./components/article/ImageCarousel";

export default function Article({
  tagOpts,
  locationOpts,
  catOpts,
  articleState,
  articleError,
  validateArticle,
  setArticleState,
  setArr,
  removeArr,
  deleteStep,
  activeStep,
  loaded,
  mounted,
  editModal,
  deleteModal,
  userEmail,
  userVerifyErrorMsg,
  setMgwState,
  article,
  setFilterOpts,
  execSearch,
  updateRating,
  commentState,
  commentError,
  validateComment,
  setCommentState,
  curateState,
  requestSuccess,
  requestError,
}) {
  const params = useParams();

  useEffect(() => {
    setFilterOpts({ name: "id", value: params.id });
    return setMgwState({ articlePosted: "" });
  }, [setFilterOpts, setMgwState, params.id]);

  useEffect(async () => {
    if (mounted) {
      return await execSearch(helper.articleView);
    }
    return "";
  }, [mounted, execSearch, params.id]);
  const handleCollectionClick = (articleId, action) => {
    setMgwState({
      curateInputs: { ...curateState, articleId },
      collectionModal: true,
      collectionAction: action,
      requestSuccess: "",
      requestError: ""
    });
  };
  return (
    <Fragment>
      {article.title && loaded && (
        <Container
          component="main"
          disableGutters
          maxWidth="xl"
          sx={{ width: "100vw" }}
        >
          <Box component="article" sx={{ my: { xs: 0.5, lg: 4 }, mx: 0 }}>
            <ImageCarousel images={helper.getImg(article, true)} />
            <Box sx={{ my: { xs: 3, lg: 5 }, mx: { xs: 3, lg: 5 } }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h2">
                  {article.title}
                </Typography>
                <IconButton
                  size="large"
                  aria-label="Add to Collection"
                  onClick={(evt) => handleCollectionClick(article._id, "add")}
                >
                  <BookmarkAddSharp fontSize="small" />
                </IconButton>
              </Box>
              <Typography component="p" variant="h5">
                {article.description}
              </Typography>
              {article.details &&
                article.details.length > 0 &&
                article.details.map((d, i) => (
                  <Fragment key={i}>
                    <Typography sx={{ my: 3 }} component="h3" variant="h4">
                      {d.sectionName}
                    </Typography>
                    <Typography component="span" variant="body1">
                      <ReactMarkdown children={d.contentMd} />
                    </Typography>
                  </Fragment>
                ))}
              <Typography sx={{ my: 3 }} component="h3" variant="h4">
                Location
              </Typography>
              <Typography component="p" variant="body1">
                {[
                  article.address,
                  article.country?.name,
                  article.city?.name,
                ].join(", ")}
              </Typography>
            </Box>
            <ArticleChips
              categories={article.catLabels}
              subCategories={article.subcatLabels}
              userTags={article.tags}
              setMgwState={setMgwState}
              execSearch={execSearch}
            />
            <AuthorAction
              locationOpts={locationOpts}
              catOpts={catOpts}
              tagOpts={tagOpts}
              article={article}
              articleState={articleState}
              setArticleState={setArticleState}
              articleError={articleError}
              validateArticle={validateArticle}
              setArr={setArr}
              removeArr={removeArr}
              setMgwState={setMgwState}
              deleteStep={deleteStep}
              activeStep={activeStep}
              editModal={editModal}
              deleteModal={deleteModal}
              userEmail={userEmail}
              userVerifyErrorMsg={userVerifyErrorMsg}
              requestSuccess={requestSuccess}
              requestError={requestError}
            />
            <ArticleComments
              comments={article.comments}
              commentState={commentState}
              commentError={commentError}
              validateComment={validateComment}
              setCommentState={setCommentState}
              rating={article.rating}
              updateRating={updateRating}
              articleId={article._id}
            />
          </Box>
        </Container>
      )}
      {!article.title && loaded && <NotFound />}
    </Fragment>
  );
}
