import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import helper from "../../utils/helper";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Button,
  IconButton,
  Typography,
  CardHeader,
  useMediaQuery,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import {
  ArrowRightAlt,
  BookmarkAddSharp,
  BookmarkRemoveSharp,
} from "@mui/icons-material";

export default function ArticleMasonry({
  articles,
  type,
  curateState,
  setMgwState,
}) {
  const smQ = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdQ = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const colNum = smQ ? 1 : mdQ ? 2 : articles?.length < 3 ? 2 : 3;

  const handleCollectionClick = (articleId, action) => {
    setMgwState({
      curateInputs: { ...curateState, articleId },
      collectionModal: true,
      collectionAction: action,
      requestSuccess: "",
      requestError: ""
    });
  };

  return (
    <Fragment>
      <Masonry
        columns={colNum}
        spacing={{ xs: 1, md: 2 }}
        sx={{ alignItems: { xs: "center", sm: "unset" } }}
      >
        {articles?.map((card) => {
          return (
            <Card key={card._id}>
              <CardHeader
                title={card.title}
                subheader={([card.city?.name, card.country?.name]).join(
                  ", "
                )}
                action={
                  type === helper.collectionView ? (
                    <IconButton
                      size="small"
                      aria-label="Remove from Collection"
                      onClick={(evt) => handleCollectionClick(card._id, "delete")}
                    >
                      <BookmarkRemoveSharp fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      aria-label="Add to Collection"
                      onClick={(evt) => handleCollectionClick(card._id, "add")}
                    >
                      <BookmarkAddSharp fontSize="small" />
                    </IconButton>
                  )
                }
              />
              <CardMedia component="img" image={helper.getImg(card)} />
              <CardContent>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {card.catLabels?.map((tag) => (
                    <Chip
                      key={tag._id}
                      label={tag.name}
                      color="tertiary"
                      size="small"
                      variant="outlined"
                    ></Chip>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  component={Link}
                  to={`/article/${card._id}`}
                  size="small"
                  color="primary"
                  sx={{"&:hover": { animation: "bounce 1s ease-in-out infinite" }}}
                >
                  Read More <ArrowRightAlt />
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
    </Fragment>
  );
}
