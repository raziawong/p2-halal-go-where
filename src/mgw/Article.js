import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import helper from "./utils/helper";
import { Container, Box, IconButton, Typography } from "@mui/material";
import { EditSharp, DeleteOutlineSharp } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import ArticleRating from "./components/article/ArticleRating";
import EditModal from "./components/article/EditModal";

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
  activeStep,
  loaded,
  editModal,
  userEmail,
  verifyUser,
  setMgwState,
  article,
  setFilterOpts,
  execSearch
}) {
  const params = useParams();
  useEffect(async () => {
    setFilterOpts({ name: "id", value: params.id });
    await execSearch(helper.articleView);
    setMgwState({ isRedirectArticle: false });
  }, [execSearch]);

  const handleEdit = () => {
    setMgwState({
      editModal: true,
      articleInputs: article
    });
  };
  const handleDelete = () => {};
  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        {!loaded ? (
          <></>
        ) : (
          <Box sx={{ my: 4, mx: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Typography component="h1" variant="h2">{article.title}</Typography>
              <Typography component="h2" variant="h2">{article.country}{", "}{article.city}</Typography>
            </Box>
            <Box>
            <Typography variant="h4">{article.description}</Typography>
            </Box>
            {article.details &&
              article.details.length > 0 &&
              article.details.map((d, i) => (
                <Fragment key={i}>
                  <h4>{d.sectionName}</h4>
                  <ReactMarkdown children={d.content} />
                </Fragment>
              ))}
            <Box>
              <Typography>Address: {article.location.address}</Typography>
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
                  Added By: {article.contributors[0].displayName}
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
                    verifyUser={verifyUser}
                  />
                <IconButton
                  color="primary"
                  aria-label="Delete Article"
                  onClick={handleDelete}
                >
                  <DeleteOutlineSharp />
                </IconButton>
              </Box>
            </Box>
            <ArticleRating {...article.rating} />
          </Box>
        )}
      </Container>
    </Fragment>
  );
}
