import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import helper from "./utils/helper";

export default function Article(props) {
  const { articleInputs, article, loaded, setMgwState, setFilterOpts, execSearch } = props;
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
          <Box sx={{ m: 4, display: "flex" }}>{article[0].title}</Box>
        )}
      </Container>
    </Fragment>
  );
}
