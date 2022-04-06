import React, { Fragment } from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia } from "@mui/material";

export default function ImageCarousel({ images }) {
  return (
    <Fragment>
      {images.length ? (
        images.length > 1 ? (
          <Carousel height={480} navButtonsAlwaysVisible>
            {images.map((img, i) => (
              <Fragment key={i}>
                <CardMedia component="img" height="480" image={img} />
              </Fragment>
            ))}
          </Carousel>
        ) : images.length === 1 ? (
          <CardMedia component="img" height="480" image={images[0]} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </Fragment>
  );
}
