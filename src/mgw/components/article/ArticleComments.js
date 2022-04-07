import React, { Fragment } from "react";
import helper from "../../utils/helper";
import Moment from "react-moment";
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
import NewComment from "../formgroups/NewComment";

export default function ArticleComments({
  rating,
  comments,
  articleId,
  updateRating,
  commentState,
  commentError,
  validateComment,
  setCommentState,
}) {
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        justifyContent: "center",
        width: { xs: "100%", md: "75%" },
        my: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          flexWrap: { xs: "wrap", md: "nowrap" },
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography component="h5" variant="h5">
          {`${comments?.length || 0} Comment(s)`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
            my: 3,
          }}
        >
          <ArticleRating
            {...rating}
            articleId={articleId}
            updateRating={updateRating}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <List sx={{ width: "100%", maxWidth: "90vw" }}>
          {comments?.map((comment, i) => (
            <Fragment key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar {...helper.stringAvatar(comment.name)} />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Fragment>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          component="p"
                          variant="h6"
                          color="text.primary"
                        >
                          {comment.name}{" "}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ textAlign: "right" }}
                        >
                          <Moment format="DD MMM YYYY">
                            {comment.createdDate}
                          </Moment>
                        </Typography>
                      </Box>
                    </Fragment>
                  }
                  secondary={
                    <Fragment>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {comment.title || ""}
                      </Typography>
                      <Typography
                        component="p"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.content}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "100%", textAlign: { xs: "center", lg: "right" } }}>
        <NewComment
          commentState={commentState}
          commentError={commentError}
          validateComment={validateComment}
          setCommentState={setCommentState}
        />
        <IconButton
          color="primary"
          aria-label="Add a comment"
          onClick={() =>
            validateComment(articleId, Object.keys(helper.initCommentInputs))
          }
        >
          <AddCommentSharp />
          <Typography variant="body2" sx={{ mx: 0.5 }}>
            Add a comment
          </Typography>
        </IconButton>
      </Box>
    </Container>
  );
}
