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
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  CardHeader,
} from "@mui/material";
import { Masonry } from "@mui/lab";

export default function Listing({
  articles,
  articlesTotal,
  pageNumber,
  setMgwState,
}) {
  const smQ = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdQ = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const colNum = smQ ? 1 : mdQ ? 2 : articles?.length < 3 ? 2 : 3;
  const showPagination = articlesTotal > helper.articlesLimit;
  const pageCount = Math.ceil(articlesTotal / helper.articlesLimit);
  const handleChange = (evt, val) => {
    setMgwState({
      pageNumber: val,
    });
  };
  return (
    <Fragment>
      <Typography component="p" variant="subtitle1" sx={{pb: 2}}>
        {`Displaying ${articles.length} `}
        {showPagination
          ? `of ${articlesTotal} results`
          : "result(s)"}
      </Typography>
      <Masonry columns={colNum} spacing={{xs: 1, md: 2}} sx={{alignItems: {xs: "center", sm: "unset"}}}>
        {articles.map((card) => {
          return (
            <Card key={card._id}>
              <CardHeader
                title={card.title}
                subheader={([card.country?.name, card.city?.name] || "").join(
                  ", "
                )}
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
                      color="info"
                      size="small"
                      variant="outlined"
                    ></Chip>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/article/${card._id}`}
                  size="small"
                  color="primary"
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
      {showPagination ? (
        <Grid container sx={{ py: 2, mb: 4 }}>
          <Grid item xs={12}>
            <Pagination
              size="large"
              showFirstButton={pageCount > 3}
              showLastButton={pageCount > 3}
              count={pageCount}
              page={pageNumber}
              onChange={handleChange}
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </Grid>
        </Grid>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
