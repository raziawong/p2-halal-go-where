import { Link } from "react-router-dom";
import { mgwCategoriesMap } from "../../utils/data";
import helper from "../../utils/helper";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Grid,
  Pagination,
  PaginationItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { Fragment } from "react";

export default function Listing({
  articles,
  articlesTotal,
  allCategories,
  pageNumber,
  setMgwState,
}) {
  const smQ = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdQ = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const getCol = () => (smQ ? 1 : mdQ ? 2 : articles?.length < 3 ? 2 : 3);
  const showPagination = () => articles?.length < articlesTotal;
  const pageCount = () => Math.ceil(articlesTotal / helper.articlesLimit);
  const handleChange = (evt, val) => {
    setMgwState({
      pageNumber: val,
    });
  };
  return (
    <Fragment>
      <Masonry columns={getCol()} spacing={2}>
        {articles.map((card) => {
          const catId = card.categories.length ? card.categories[0].catId : "";
          const catObj = allCategories.filter((c) => c._id === catId);
          const imgUrl = card.photos.length
            ? card.photos[0]
            : catObj.length
            ? mgwCategoriesMap[catObj[0].value].default
            : mgwCategoriesMap.attractions.default;
          return (
            <Card key={card._id}>
              <CardMedia component="img" image={imgUrl} />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h5">
                  {card.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="h6">
                  {([card.country?.name, card.city?.name] || "").join(", ")}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  {card.catLabels?.map((tag) => (
                    <Typography
                      key={tag._id}
                      variant="subtitle2"
                      component="span"
                      color="primary"
                    >
                      {tag.name}
                    </Typography>
                  ))}
                  {card.tags?.map((tag, i) => (
                    <Typography
                      key={tag}
                      variant="subtitle2"
                      component="span"
                      color="info.dark"
                    >
                      {tag}
                    </Typography>
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
                  Find out more
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
      {showPagination() ? (
        <Grid container sx={{py: 2, mb: 4}}>
          <Grid item xs={12}>
            <Pagination
              size="large"
              showFirstButton={pageNumber > 3}
              showLastButton={pageNumber > 3}
              count={pageCount()}
              page={pageNumber}
              onChange={handleChange}
              sx={{ display: "flex", justifyContent: "center" }}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/explore${item.page === 1 ? "" : `/${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Grid>
        </Grid>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
