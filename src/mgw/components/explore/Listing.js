import { Link, useNavigate } from "react-router-dom";
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
import { Fragment, useEffect } from "react";

export default function Listing({
  articles,
  articlesTotal,
  allCategories,
  pageNumber,
  setMgwState,
}) {
  const navigate = useNavigate();
  const smQ = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdQ = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const colNum = smQ ? 1 : mdQ ? 2 : articles?.length < 3 ? 2 : 3;
  const showPagination = articles?.length < articlesTotal;
  const pageCount = Math.ceil(articlesTotal / helper.articlesLimit);
  const handleChange = (evt, val) => {
    setMgwState({
      pageNumber: val
    });
  };
  useEffect(() => {
    if (pageNumber > pageCount) {
      navigate("/explore/1");
    }
  }, [navigate, pageNumber, pageCount])
  return (
    <Fragment>
      <Masonry columns={colNum} spacing={2}>
        {articles.map((card) => {
          return (
            <Card key={card._id}>
              <CardMedia component="img" image={helper.getImg(card)} />
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
      {showPagination ? (
        <Grid container sx={{py: 2, mb: 4}}>
          <Grid item xs={12}>
            <Pagination
              size="large"
              showFirstButton={pageCount > 3}
              showLastButton={pageCount > 3}
              count={pageCount}
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
