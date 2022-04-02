import helper from "../../utils/helper";
import { Grid, TextField } from "@mui/material";


export default function ArticleSummary(props) {
  const { articleState, countries } = props;

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Title"
          arial-label="Title"
          name="title"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          multiline
          label="Description"
          arial-label="Description"
          name="description"
          
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Address"
          arial-label="Address"
          name="address"
          defaultValue=""
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          select fullWidth
          label="Country"
          arial-label="Country"
          name="countryId"
          defaultValue=""
        >
          {helper.countryOptDisplay(countries)}
        </TextField>
      </Grid>
      <Grid item xs={8}>
        <TextField
          select fullWidth
          label="City"
          arial-label="City"
          name="cityId"
          defaultValue=""
        >
          {helper.cityOptDisplay(countries, "")}
        </TextField>
      </Grid>
    </Grid>
  );
}
