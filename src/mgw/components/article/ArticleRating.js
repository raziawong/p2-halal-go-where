import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function ArticleRating({ avg, count }) {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          minWidth: "75%",
          mt: 2
        }}
      >
        <Rating
          name="simple-controlled"
          value={avg}
          onChange={(event, newValue) => {
            console.log(newValue);
          }}
        />
        <Typography component="legend">
          {count === 0 ? "No Rating" : `${count} Votes`}
        </Typography>
      </Box>
    </Container>
  );
}
