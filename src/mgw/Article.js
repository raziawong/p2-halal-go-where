import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import helper from "./utils/helper";

export default function Article(props) {
  const { articleInputs, article, loaded, setMgwState, setFilterOpts, execSearch } = props;
  const view = article[0] || {};
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
          <Box sx={{ m: 4}}>
            <h1>{view.title}</h1>
            <h5>{view.description}</h5>
            {
              view.details && view.details.length > 0 && view.details.map((d, i) =>
                <Fragment key={i}>
                  <h6>{d.sectionName}</h6>
                  {d.content}
                </Fragment>
              )
            }
          </Box>
        )}
      </Container>
    </Fragment>
  );
}
