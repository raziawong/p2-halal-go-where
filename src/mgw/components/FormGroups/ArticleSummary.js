import helper from "../../utils/helper";
import { Grid, TextField } from "@mui/material";


export default function ArticleSummary(props) {
  const { register, errors, countries } = props;

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Title"
          arial-label="Title"
          name="title"
          defaultValue=""
          error={!!errors?.title}
          helperText={errors?.title?.message}
          {...register("title", {
            required: { value: true, message: helper.templates.required },
            pattern: { value: helper.regex.displayName, message: helper.templates.special },
            maxLength: { value: 50, message: helper.templates.maxLength(50) }
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          multiline
          label="Description"
          arial-label="Description"
          name="description"
          defaultValue=""
          error={!!errors?.description}
          helperText={errors?.description?.message}
          {...register("description", {
            required: { value: true, message: helper.templates.required },
            maxLength: { value: 150, message: helper.templates.maxLength(150) }
          })}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          label="Address"
          arial-label="Address"
          name="address"
          defaultValue=""
          {...register("address")}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          select fullWidth
          label="Country"
          arial-label="Country"
          name="countryId"
          defaultValue=""
          error={!!errors?.countryId}
          helperText={errors?.countryId?.message}
          {...register("countryId", { 
            required: { value: true, message: helper.templates.required } 
          })}
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
          error={!!errors?.cityId}
          helperText={errors?.cityId?.message}
          {...register("cityId", { 
            required: { value: true, message: helper.templates.required } 
          })}
        >
          {helper.cityOptDisplay(countries, "")}
        </TextField>
      </Grid>
    </Grid>
  );
}
