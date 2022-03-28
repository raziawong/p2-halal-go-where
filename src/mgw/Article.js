import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Container,
    Box,
    Typography
  } from "@mui/material";
import { getArticles } from "./utils/data";

export default async function Article(props) {
  const { article, setMgwState } = props;
  const params = useParams();
  const fetchArticle = async (id) => {
    let articleData = await getArticles({articleId: id});
    setMgwState({
      isLoaded: true,
      articleInputs: articleData.data ? articleData.data : {}
    });
  }

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4, display: "flex" }}>
            Article {params.id}
            
        </Box>
      </Container>
    </Fragment>
  );
}
