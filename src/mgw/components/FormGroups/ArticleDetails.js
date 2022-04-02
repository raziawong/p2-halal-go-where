import React, { Fragment } from "react";
import helper from "../../utils/helper";
import { default as Editor } from "mui-rte";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { Box, IconButton, Grid, TextField } from "@mui/material";
import {
  AddCircleOutlineSharp,
  RemoveCircleOutlineSharp
} from "@mui/icons-material";

export default function ArticleDetails(props) {
  const { articleState, setArr, removeArr } = props;

  const handleRemovePhoto = (evt, i) => {
    removeArr("photos", i);
  };

  const handleAddPhoto = (evt) => {
    setArr("photos", "");
  };

  const handleRemoveDetail = (evt, i) => {
    removeArr("details", i);
  };

  const handleAddDetail = (evt) => {
    setArr("details", helper.emptyDetail);
  };

  const changeDetail = (evt, index) => {
    if (evt.target) {
      let { name, value } = evt.target;
      console.log(name, value);
    } else {
      console.log(evt);
    }
  }

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={8}>
        {articleState.photos.map((photo, i) => (
          <Fragment>
              <TextField
                fullWidth
                label="Photo"
                name={`photo[${i}]`}
              />
            <Box sx={{ justifyContent: "flex-end" }}>
              {articleState.photos.length !== 1 && (
                <IconButton
                  color="secondary"
                  aria-label="Remove Photo"
                  onClick={(evt) => handleRemovePhoto(evt, i)}
                >
                  <RemoveCircleOutlineSharp />
                </IconButton>
              )}
              {articleState.photos.length - 1 === i && (
                <IconButton
                  color="primary"
                  aria-label="Add Photo"
                  onClick={handleAddPhoto}
                >
                  <AddCircleOutlineSharp />
                </IconButton>
              )}
            </Box>
          </Fragment>
        ))}
      </Grid>
      <Grid item xs={8}>
        {articleState.details.map((dtl, i) => {
          return (
            <Fragment key={i}>
              <Box sx={{ m: 4 }}>
                <TextField
                  fullWidth
                  label="Header"
                  name={`details[${i}]sectionName`}
                  onChange={(evt) => changeDetail(evt, i)}
                />
                <Editor
                  toolbarButtonSize="small"
                  controls={helper.rteControls}
                  inlineToolbar
                  label="Insert content for section"
                  name={`details[${i}]content`}
                  onChange={(evt) => changeDetail(evt, i)}
                  // onChange={(evt) => {
                  //   let rte = draftToMarkdown(
                  //     convertToRaw(evt.getCurrentContent())
                  //   );
                  //   return rte;
                  // }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {articleState.details.length !== 1 && (
                  <IconButton
                    color="secondary"
                    aria-label="Remove Detail"
                    onClick={(evt) => handleRemoveDetail(evt, i)}
                  >
                    <RemoveCircleOutlineSharp />
                  </IconButton>
                )}
                {articleState.details.length - 1 === i && (
                  <IconButton
                    color="primary"
                    aria-label="Add Details"
                    onClick={handleAddDetail}
                  >
                    <AddCircleOutlineSharp />
                  </IconButton>
                )}
              </Box>
            </Fragment>
          );
        })}
      </Grid>
    </Grid>
  );
}
