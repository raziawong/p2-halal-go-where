import { Link } from "react-router-dom";
import { mgwCategoriesMap } from "../utils/data";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Masonry } from "@mui/lab";

export default function Listing(props) {
  return (
    <Masonry columns={3} spacing={2}>
      {props.articles.map((card) => {
        const catId = card.categories.length ? card.categories[0].catId : "";
        const catObj = props.allCategories.filter(c => c._id === catId );
        const imgUrl = card.photos.length ? card.photos[0] : 
            catObj.length ? mgwCategoriesMap[catObj[0].value].default : mgwCategoriesMap.attractions.default;
        return (
          <Card key={card._id}>
            <CardMedia component="img" image={imgUrl} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                {card.title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="h6">
                {card.title}
              </Typography>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {card.description}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                {card.tags.map((tag, i) => (
                  <Typography key={i} variant="subtitle2" component="span">
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
  );
}
