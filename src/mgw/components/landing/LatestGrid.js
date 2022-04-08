import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import helper from "../../utils/helper";
import Carousel from "react-material-ui-carousel";
import { LatestLink } from "../../utils/mgwStyle";
import { ArrowRightAlt } from "@mui/icons-material";

export default function LatestGrid({ latestArticles }) {
  return (
    <Box sx={{ m: 4, pt: 4 }}>
      <Typography component="h2" variant="h3">
        What's New
      </Typography>
      {latestArticles?.length && latestArticles.length > 2 && (
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
              height: "50vh",
              backgroundImage: `url(${helper.getImg(latestArticles[0])})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "4px"              
            }}
          >
            <Box
              sx={{ p: 4, height: "100%", bgcolor: "rgba(108, 122, 137, 0.4)" }}
            >
              <Typography component="h3" variant="h3" color="#F7F7FF">
                {latestArticles[0].title}
              </Typography>
              <Typography variant="subtitle1" color="#F7F7FF">
                {latestArticles[0].country?.name} {", " + latestArticles[0].city?.name}
              </Typography>
              <Typography color="#F7F7FF" sx={{ pt: 4 }}>
                {latestArticles[0].description}
              </Typography>
              <Typography sx={{ pt: 4 }}>
                <LatestLink to={`/article/${latestArticles[0]._id}`}>
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
                  height: "25vh",
                  backgroundImage: `url(${helper.getImg(latestArticles[1])})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "4px"
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
                    {latestArticles[1].title.length > 60 ? latestArticles[1].title.substr(0, 60) + "..." : latestArticles[1].title}
                  </Typography>
                  <Typography variant="subtitle1" color="#F7F7FF">
                    {latestArticles[1].country?.name} {", " + latestArticles[1].city?.name}
                  </Typography>
                  <Typography sx={{ pt: 3 }}>
                    <LatestLink to={`/article/${latestArticles[1]._id}`}>
                      Read More <ArrowRightAlt />
                    </LatestLink>
                  </Typography>
                </Box>
              </Grid>
              <Grid 
                item
                xs
                sx={{
                  height: "25vh",
                  backgroundImage: `url(${helper.getImg(latestArticles[2])})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "4px"
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
                    {latestArticles[2].title.length > 60 ? latestArticles[2].title.substr(0, 60) + "..." : latestArticles[2].title}
                  </Typography>
                  <Typography variant="subtitle1" color="#F7F7FF">
                    {latestArticles[2].country?.name} {", " + latestArticles[2].city?.name}
                  </Typography>
                  <Typography sx={{ pt: 3 }}>
                    <LatestLink to={`/article/${latestArticles[2]._id}`}>
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
        height={"50vh"}
        sx={{ my: 2, display: { lg: "none" } }}
        animation="slide"
        interval={8000}
      >
        {latestArticles?.slice(0, 3).map((slide, i) => (
          <Grid
            key={i}
            item
            container
            xs
            sx={{
              height: "50vh",
              backgroundImage: `url(${helper.getImg(slide)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "4px",
              boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "100%",
                py: {xs: 1, md: 5},
                px: {xs: 2, md: 10},
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
