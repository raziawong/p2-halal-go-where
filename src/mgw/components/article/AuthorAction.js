import React from "react";
import helper from "../../utils/helper";
import Moment from "react-moment";
import {
  Avatar,
  Box,
  IconButton,
  Typography
} from "@mui/material";
import { EditSharp, DeleteOutlineSharp } from "@mui/icons-material";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function AuthorAction({
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
  editModal,
  deleteModal,
  userEmail,
  userVerifyErrorMsg,
  setMgwState,
  article,
  requestError
}) {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        my: { xs: 3, lg: 0 },
        mx: { xs: 3, lg: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar {...helper.stringAvatar(authorName())} />
        <Box sx={{ px: 1 }}>
          <Typography>{authorName()}</Typography>
          <Typography>
            <Moment format="DD MMM YYYY, ddd">{article.lastModified}</Moment>
          </Typography>
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
  );
}
