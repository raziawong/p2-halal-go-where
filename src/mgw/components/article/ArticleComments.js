import helper from "../../utils/helper";
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export default function ArticleComments({ comments, articleId, setMgwState }) {
  return (
    <Container disableGutters sx={{ width: "100%", my: 4}}>
      <Typography component="h5" variant="h5">
        Comments
      </Typography>
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
