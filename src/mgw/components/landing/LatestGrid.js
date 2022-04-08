import React, { Fragment } from "react";
import { Box, Grid, Typography } from "@mui/material";
import helper from "../../utils/helper";
import Carousel from "react-material-ui-carousel";
import { LatestLink } from "../../utils/mgwStyle";
import { ArrowRightAlt } from "@mui/icons-material";

export default function LatestGrid({ latest }) {
  return (
    <Box sx={{ m: 4 }}>
      <Typography component="h2" variant="h3">
        What's New
      </Typography>
      {latest?.length && latest.length > 2 && (
        <Grid
          container
          sx={{
            my: 2,
            maxWidth: "100%",
            justifyContent: "center",
            display: { xs: "none", lg: "flex" },
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              height: "600px",
              backgroundImage: `url(${helper.getImg(latest[0])})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Box
              sx={{ p: 4, height: "100%", bgcolor: "rgba(108, 122, 137, 0.4)" }}
            >
              <Typography component="h3" variant="h3" color="#F7F7FF">
                {latest[0].title}
              </Typography>
              <Typography variant="subtitle1" color="#F7F7FF">
                {latest[0].country?.name} {", " + latest[0].city?.name}
              </Typography>
              <Typography color="#F7F7FF" sx={{ pt: 4 }}>
                {latest[0].description}
              </Typography>
              <Typography sx={{ pt: 4 }}>
                <LatestLink to={`/article/${latest[0]._id}`}>
                  Read More <ArrowRightAlt />
                </LatestLink>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} container sx={{ m: 0 }}>
            <Grid item xs container direction="column">
              <Grid
                item
                xs
                sx={{
                  height: "300px",
                  backgroundImage: `url(${helper.getImg(latest[1])})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "rgba(108, 122, 137, 0.4)",
                  }}
                >
                  <Typography component="h3" variant="h3" color="#F7F7FF">
                    {latest[1].title.length > 60 ? latest[1].title.substr(0, 60) + "..." : latest[1].title}
                  </Typography>
                  <Typography variant="subtitle1" color="#F7F7FF">
                    {latest[1].country?.name} {", " + latest[1].city?.name}
                  </Typography>
                  <Typography sx={{ pt: 3 }}>
                    <LatestLink to={`/article/${latest[1]._id}`}>
                      Read More <ArrowRightAlt />
                    </LatestLink>
                  </Typography>
                </Box>
              </Grid>
              <Grid 
                item
                xs
                sx={{
                  height: "300px",
                  backgroundImage: `url(${helper.getImg(latest[2])})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "rgba(108, 122, 137, 0.4)",
                  }}
                >
                  <Typography component="h3" variant="h3" color="#F7F7FF">
                    {latest[2].title.length > 60 ? latest[2].title.substr(0, 60) + "..." : latest[2].title}
                  </Typography>
                  <Typography variant="subtitle1" color="#F7F7FF">
                    {latest[2].country?.name} {", " + latest[2].city?.name}
                  </Typography>
                  <Typography sx={{ pt: 3 }}>
                    <LatestLink to={`/article/${latest[2]._id}`}>
                      Read More <ArrowRightAlt />
                    </LatestLink>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Carousel
        height={450}
        sx={{  display: { lg: "none" } }}
        animation="slide"
        interval={8000}
        navButtonsAlwaysVisible
      >
        {latest?.slice(0, 3).map((slide, i) => (
          <Grid
            key={i}
            item
            container
            xs
            sx={{
              height: "450px",
              backgroundImage: `url(${helper.getImg(slide)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                py: 5,
                px: 10,
                bgcolor: "rgba(108, 122, 137, 0.4)",
              }}
            >
              <Typography component="h3" variant="h3" color="#F7F7FF">
                {slide.title.length > 60 ? slide.title.substr(0, 60) + "..." : slide.title}
              </Typography>
              <Typography variant="subtitle1" color="#F7F7FF">
                {slide.country?.name} {", " + slide.city?.name}
              </Typography>
              <Typography color="#F7F7FF" sx={{ display: {xs: "none", md: "block"}, pt: 4 }}>
                {slide.description}
              </Typography>
              <Typography sx={{ pt: {xs: 1, sm: 2 } }}>
                <LatestLink to={`/article/${slide._id}`}>
                  Read More <ArrowRightAlt />
                </LatestLink>
              </Typography>
            </Box>
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
}
