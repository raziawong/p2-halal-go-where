import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import helper from "./utils/helper";
import ArticleRating from "./components/article/ArticleRating";

export default function Article({
  articleInputs,
  article,
  loaded,
  setMgwState,
  setFilterOpts,
  execSearch,
}) {
  const params = useParams();

  useEffect(async () => {
    setFilterOpts({ name: "id", value: params.id });
    await execSearch(helper.articleView);
    setMgwState({ isRedirectArticle: false });
  }, [execSearch]);

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        {!loaded ? (
          <></>
        ) : (
          <Box sx={{ m: 4 }}>
            <h1>{article.title}</h1>
            <h5>{article.description}</h5>
            {article.details &&
              article.details.length > 0 &&
              article.details.map((d, i) => (
                <Fragment key={i}>
                  <h6>{d.sectionName}</h6>
                  {d.content}
                </Fragment>
              ))}
              <ArticleRating {...article.rating} />
          </Box>
        )}
      </Container>
    </Fragment>
  );
}
