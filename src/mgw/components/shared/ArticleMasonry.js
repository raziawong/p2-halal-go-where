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
import CollectionItemModal from "../collection/CollectionItemModal";
import { getThemeProps } from "@mui/styles";

export default function ArticleMasonry({
  articles,
  type,
  curateState,
  curateErrors,
  collectionAction,
  collectionModal,
  validateCurate,
  setMgwState,
  requestSuccess,
  requestError
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
                subheader={([card.country?.name, card.city?.name] || "").join(
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
                >
                  Read More <ArrowRightAlt />
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
      <CollectionItemModal
        collectionAction={collectionAction}
        collectionModal={collectionModal}
        curateState={curateState}
        curateErrors={curateErrors}
        validateCurate={validateCurate}
        setMgwState={setMgwState}
        requestSuccess={requestSuccess}
        requestError={requestError}
      />
    </Fragment>
  );
}
