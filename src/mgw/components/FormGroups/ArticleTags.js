import helper from "../../utils/helper";
import {
  Autocomplete,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function ArticleTags({
  articleState,
  setArticleState,
  articleError,
  catOpts,
  tagOpts,
}) {
  const handleTagChange = (evt, value) => {
    // let tags = [...articleState.tags];
    setArticleState({
      target: {
        name: "tags",
        value: value,
      },
    });
  };
  return (
    <Grid container spacing={4} sx={{ justifyContent: "center" }}>
      <Grid item xs={8}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="create-cat-label" error={!!articleError?.catIds}>
            Categories
          </InputLabel>
          <Select
            multiple
            fullWidth
            displayEmpty
            label="Categories"
            arial-label="Categories"
            labelId="create-cat-label"
            name="catIds"
            value={articleState.catIds}
            onChange={setArticleState}
            renderValue={(vals) =>
              vals.length
                ? catOpts
                    .filter((c) => vals.includes(c._id))
                    .map((f) => {
                      console.log(f);
                      return f.name;
                    })
                    .join(", ")
                : ""
            }
            error={!!articleError?.catIds}
          >
            <MenuItem value=""></MenuItem>
            {helper.categoriesOptDispay(
              catOpts?.length > 0 ? catOpts : [],
              articleState.catIds
            )}
          </Select>
          { articleError?.catIds &&
            <FormHelperText error={!!articleError?.catIds}>
              {articleError?.catIds}
            </FormHelperText>
          }
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel
            id="create-subcat-label"
            error={!!articleError?.subcatIds}
          >
            Sub-Categories
          </InputLabel>
          <Select
            multiple
            fullWidth
            displayEmpty
            labelId="create-subcat-label"
            label="Sub-Categories"
            arial-label="Sub-Categories"
            name="subcatIds"
            value={articleState.subcatIds}
            onChange={setArticleState}
            renderValue={(vals) =>
              vals.length
                ? catOpts
                    .reduce((pv, cv) => {
                      return pv.concat(
                        cv.subcats.filter((sc) => vals.includes(sc._id))
                      );
                    }, [])
                    .map((f) => f.name)
                    .join(", ")
                : ""
            }
            error={!!articleError?.subcatIds}
          >
            <MenuItem value=""></MenuItem>
            {helper.subcategoriesOptDispay(
              catOpts?.length > 0 ? catOpts : [],
              articleState.catIds,
              articleState.subcatIds
            )}
          </Select>
          { articleError?.subcatIds &&
            <FormHelperText error={!!articleError?.subcatIds}>
              {articleError?.subcatIds}
            </FormHelperText>
          }
        </FormControl>
      </Grid>
      <Grid item xs={8}>
        <Autocomplete
          autoSelect
          freeSolo
          multiple
          fullWidth
          name="tags"
          options={tagOpts}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!articleError?.tags}
              helperText={articleError?.tags}
              label="Tags"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, i) => (
              <Chip
                variant="outlined"
                key={i}
                label={option}
                {...getTagProps({ i })}
              />
            ))
          }
          onChange={handleTagChange}
        />
      </Grid>
    </Grid>
  );
}
