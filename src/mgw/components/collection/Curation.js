import React, { Fragment } from "react";
import ArticleMasonry from "../shared/ArticleMasonry";
import helper from "../../utils/helper";
import { Divider } from "@mui/material";

export default function Curation({ collection }) {
  return (
    <Fragment>
      <Divider />
      {collection?.length && (
        <ArticleMasonry articles={collection} type={helper.collectionView} />
      )}
    </Fragment>
  );
}
