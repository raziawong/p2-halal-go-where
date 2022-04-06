import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, CardMedia } from "@mui/material";

export default function ImageCarousel({ images }) {
  return (
    <Fragment>
      {images.length && images.length > 1 && (
        <Carousel height={450} navButtonsAlwaysVisible>
          {images.map((img, i) => (
            <Fragment key={i}>
              <CardMedia component="img" height="450" image={img} />
            </Fragment>
          ))}
        </Carousel>
      )}
      {images.length && images.length == 1 && (
        <CardMedia component="img" height="450" image={images[0]} />
      )}
    </Fragment>
  );
}
