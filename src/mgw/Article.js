import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import helper from "./utils/helper";
import { Avatar, Container, Box, IconButton, Typography } from "@mui/material";
import { EditSharp, DeleteOutlineSharp } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import EditModal from "./components/article/EditModal";
import DeleteModal from "./components/article/DeleteModal";
import NotFound from "./NotFound";
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

  const handleEdit = () => {
    let inputs = { ...helper.initArticleInputs, ...article };
    if (userVerifyErrorMsg) {
      inputs.email = userEmail;
    }
    setMgwState({
      editModal: true,
      articleInputs: inputs,
      articleInputsErrors: {},
    });
  };
  const handleDelete = () => {
    let inputs = { ...helper.initArticleInputs, ...article };
    if (userVerifyErrorMsg) {
      inputs.email = userEmail;
    }
    setMgwState({
      deleteModal: true,
      articleInputs: inputs,
      articleInputsErrors: {},
    });
  };
  const authorName = () => {
    return article.contributors
      ? article.contributors.filter((c) => c.isAuthor)[0].displayName
      : "";
  };
  return (
    <Fragment>
      {article.title && loaded && (
        <Container disableGutters>
          <Box
            sx={{ my: { xs: 0, lg: 4 }, mx: { xs: 0, lg: 6 } }}
          >
            <ImageCarousel images={article.photos} />
            <Box sx={{ my: { xs: 1.5, lg: 0 }, mx: { xs: 3, lg: 0 } }}>
              <Typography component="h1" variant="h1">
                {article.title}
              </Typography>
              <Typography variant="h4">{article.description}</Typography>
              {article.details &&
                article.details.length > 0 &&
                article.details.map((d, i) => (
                  <Fragment key={i}>
                    <h4>{d.sectionName}</h4>
                    <ReactMarkdown children={d.contentMd} />
                  </Fragment>
                ))}
              <Typography>
                <strong>Location: </strong>
                {[
                  article.address,
                  article.country?.name,
                  article.city?.name,
                ].join(", ")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: { xs: 1.5, lg: 0 },
                mx: { xs: 3, lg: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar {...helper.stringAvatar(authorName())} />
                <Box sx={{ px: 1 }}>
                  <Typography>{authorName()}</Typography>
                  <Typography>{article.lastModified}</Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <IconButton
                  color="primary"
                  aria-label="Edit Article"
                  onClick={handleEdit}
                >
                  <EditSharp />
                </IconButton>
                <EditModal
                  locationOpts={locationOpts}
                  catOpts={catOpts}
                  tagOpts={tagOpts}
                  activeStep={activeStep}
                  articleState={articleState}
                  setArticleState={setArticleState}
                  articleError={articleError}
                  validateArticle={validateArticle}
                  setArr={setArr}
                  removeArr={removeArr}
                  setMgwState={setMgwState}
                  editModal={editModal}
                  userEmail={userEmail}
                  userVerifyErrorMsg={userVerifyErrorMsg}
                  requestError={requestError}
                />
                <IconButton
                  color="primary"
                  aria-label="Delete Article"
                  onClick={handleDelete}
                >
                  <DeleteOutlineSharp />
                </IconButton>
                <DeleteModal
                  activeStep={deleteStep}
                  articleState={articleState}
                  setArticleState={setArticleState}
                  articleError={articleError}
                  validateArticle={validateArticle}
                  setMgwState={setMgwState}
                  deleteModal={deleteModal}
                  userEmail={userEmail}
                  userVerifyErrorMsg={userVerifyErrorMsg}
                  requestError={requestError}
                />
              </Box>
            </Box>
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
