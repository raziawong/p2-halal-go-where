import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import valHelper, { valPatterns } from "../utils/validation";
import { default as Editor } from "mui-rte";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

export default function Create(props) {
  const { tagOpts, article, submitArticle } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...article } });
  const liftData = (data) => {
    submitArticle(data);
  };

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Display Name"
                name="displayName"
                {...register("displayName", {
                  maxLength: 80,
                  pattern: valPatterns.displayName,
                })}
                {...valHelper(errors.displayName, {
                  pattern: "displayName",
                  length: 80,
                })}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Contact Name"
                name="name"
                {...register("name", {
                  required: true,
                  maxLength: 80,
                  pattern: valPatterns.displayName,
                })}
                {...valHelper(errors.name, {
                  length: 80,
                  pattern: "displayName",
                })}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: valPatterns.email,
                })}
                {...valHelper(errors.email, { pattern: "email" })}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                {...register("title", {
                  required: true,
                  maxLength: 50,
                  pattern: valPatterns.displayName,
                })}
                {...valHelper(errors.title, {
                  length: 50,
                  pattern: "displayName",
                })}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                {...register("description", { required: true, maxLength: 150 })}
                {...valHelper(errors.description, {
                  length: 150,
                  pattern: "displayName",
                })}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Header"
                name="header"
                {...register("header", {
                  maxLength: 50,
                  pattern: valPatterns.displayName,
                })}
                {...valHelper(errors.header, {
                  length: 50,
                  pattern: "displayName",
                })}
              />
            </Grid>
            <Grid item md={12}>
              <Editor
                toolbarButtonSize="small"
                controls={[
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "highlight",
                  "undo",
                  "redo",
                  "link",
                  "numberList",
                  "bulletList",
                  "quote",
                  "code",
                ]}
                inlineToolbar
                label="Start typing"
                onChange={(value) => {}}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                {...register("address")}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                select fullWidth
                label="Country"
                name="country"
                defaultValue="none"
                {...register("country", { required: true })}
                {...valHelper(errors.country)}
              >
                <MenuItem value="none">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6}>
              <TextField
                select fullWidth
                label="City"
                name="city"
                defaultValue="none"
                {...register("city", { required: true })}
                {...valHelper(errors.city)}
              >
                <MenuItem value="none">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6}>
              <TextField
                select fullWidth
                label="Categories"
                name="categories"
                defaultValue="none"
                {...register("country", { required: true })}
                {...valHelper(errors.country)}
              >
                <MenuItem value="none">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6}>
              <TextField
                select fullWidth
                label="City"
                name="city"
                defaultValue="none"
                {...register("city", { required: true })}
                {...valHelper(errors.city)}
              >
                <MenuItem value="none">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6}>
              <Autocomplete
                autoSelect freeSolo multiple fullWidth
                name="tags"
                options={tagOpts}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                }
                onChange={(evt, value) => console.log(value)}
              />
            </Grid>
            <Grid item md={12}>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(liftData)}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}
