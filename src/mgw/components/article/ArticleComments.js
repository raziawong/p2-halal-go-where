import React, { Fragment } from "react";
import helper from "../../utils/helper";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { AddCommentSharp } from "@mui/icons-material";
import ArticleRating from "./ArticleRating";

export default function ArticleComments({
  rating,
  comments,
  articleId,
  updateRating,
  setMgwState,
}) {
  return (
    <Container disableGutters sx={{ width: "75%", my: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 3,
          }}
        >
          <Typography component="h5" variant="h5">
            Comments
          </Typography>
          <IconButton color="primary" aria-label="Add a comment">
            <AddCommentSharp />
            <Typography variant="body2" sx={{ marginLeft: "5px" }}>
              Add a comment
            </Typography>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            my: 3,
          }}
        >
          <ArticleRating
            {...rating}
            articleId={articleId}
            updateRating={updateRating}
            setMgwState={setMgwState}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <List sx={{ width: "100%", maxWidth: "90vw" }}>
          {comments?.map((comment) => (
            <Fragment key={comment._id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar {...helper.stringAvatar(comment.name)} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.name + " " + (comment.title || "")}
                  secondary={comment.content}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}
