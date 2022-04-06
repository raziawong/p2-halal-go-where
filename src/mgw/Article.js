import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import helper from "./utils/helper";
import { Container, Box, IconButton, Typography } from "@mui/material";
import { EditSharp, DeleteOutlineSharp } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import EditModal from "./components/article/EditModal";
import DeleteModal from "./components/article/DeleteModal";
import NotFound from "./NotFound";
import ArticleComments from "./components/article/ArticleComments";

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
  return (
    <Fragment>
      {article.title && loaded && (
        <Container maxWidth="xl" disableGutters>
          <Box sx={{ my: 4, mx: 6 }}>
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
              <Typography component="h2" variant="h2">
                {article.country?.name}
                {", "}
                {article.city?.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{article.description}</Typography>
            </Box>
            {article.details &&
              article.details.length > 0 &&
              article.details.map((d, i) => (
                <Fragment key={i}>
                  <h4>{d.sectionName}</h4>
                  <ReactMarkdown children={d.contentMd} />
                </Fragment>
              ))}
            <Box>
              <Typography>Address: {article.address}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 3,
              }}
            >
              <Box>
                <Typography>
                  Added By:{" "}
                  {article.contributors
                    ? article.contributors.filter((c) => c.isAuthor)[0]
                        .displayName
                    : ""}
                </Typography>
                <Typography>Last Modified: {article.lastModified}</Typography>
              </Box>
              <Box>
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
