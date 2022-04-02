import helper from "../../utils/helper";
import { Autocomplete, Chip, Grid, MenuItem, TextField } from "@mui/material";

export default function ArticleTags(props) {
  const { articleWatch, categories, tagOpts } = props;

  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item md={6}>
        <TextField
          select
          fullWidth
          label="Categories"
          name="catIds"
        >
          <MenuItem value="none">None</MenuItem>
          {/* {helper.categoriesOptDispay(categories)} */}
        </TextField>
      </Grid>
      <Grid item md={6}>
        <TextField
          select
          fullWidth
          label="Sub-categories"
          name="subcatIds"
        >
          <MenuItem value="none">None</MenuItem>
        </TextField>
      </Grid>
      <Grid item md={6}>
        <Autocomplete
          autoSelect freeSolo multiple fullWidth
          name="tags"
          options={tagOpts}
          renderInput={(params) => <TextField {...params} label="Tags" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(evt, value) => console.log(value)}
        />
      </Grid>
    </Grid>
  );
}
