import React, { Fragment } from "react";
import { Box, Container } from "@mui/material";
import { HorizontalStepper } from "./site";

export default function Create(props) {
  const {
    tagOpts,
    article,
    countries,
    categories,
    setArr,
    removeArr,
    submitArticle,
    active,
    setMgwState,
  } = props;

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <HorizontalStepper 
            articleWatch={article}
            countries={countries}
            categories={categories}
            tagOpts={tagOpts}
            active={active}
            setMgwState={setMgwState}
            setArr={setArr}
            removeArr={removeArr}
          />
        </Box>
      </Container>
    </Fragment>
  );
}
