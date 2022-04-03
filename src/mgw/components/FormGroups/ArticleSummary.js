import helper from "../../utils/helper";
import { Autocomplete, Grid, TextField } from "@mui/material";


export default function ArticleSummary({
  articleState,
  setArticleState,
  articleError,
  locationOpts
}) {
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          required
          label="Title"
          arial-label="Title"
          name="title"
          value={articleState.title}
          onChange={setArticleState}
          error={!!articleError?.title}
          helperText={articleError?.title}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          required
          multiline
          minRows={3}
          label="Description"
          arial-label="Description"
          name="description"
          value={articleState.description}
          onChange={setArticleState}
          error={!!articleError?.description}
          helperText={articleError?.description}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Address"
          arial-label="Address"
          name="address"
          value={articleState.address}
          onChange={setArticleState}
          error={!!articleError?.address}
          helperText={articleError?.address}
        />
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          autoSelect
          fullWidth
          name="country"
          value={articleState.country}
          options={locationOpts}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="Country"
              aria-label="Country"
              error={!!articleError?.countryId}
              helperText={articleError?.countryId}
            />
          )}
          onChange={(evt, value) => {
            const arg = { target: { name: "country", value: value } };
            setArticleState(arg);
          }}
        />
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          autoSelect
          fullWidth
          name="cityId"
          disabled={!articleState.countryId}
          value={articleState.city}
          options={helper.cityObj(locationOpts, articleState.countryId)}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="City"
              aria-label="City"
              error={!!articleError?.cityId}
              helperText={articleError?.cityId}
            />
          )}
          onChange={(evt, value) => {
            const arg = { target: { name: "city", value: value } };
            setArticleState(arg);
          }}
        />
      </Grid>
    </Grid>
  );
}
