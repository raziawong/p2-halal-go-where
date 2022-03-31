import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import helper from "./utils/helper";
import { convertToRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { default as Editor } from "mui-rte";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { AddCircleOutlineSharp, RemoveCircleOutlineSharpIcon } from '@mui/icons-material';

export default function Create(props) {
  const { tagOpts, article, submitArticle } = props;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: { ...article } });

  const liftData = (data) => {
    console.log(data);
    submitArticle(data);
  };

  const changeDetail = (evt, index) => {
    let { name, value } = evt.target;
  };

  const removeDetail = () => {

  };

  const addDetail = () => {

;  }

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
                  pattern: helper.regex.displayName,
                })}
                {...helper.validate(errors.displayName, {
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
                  pattern: helper.regex.displayName,
                })}
                {...helper.validate(errors.name, {
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
                  pattern: helper.regex.email,
                })}
                {...helper.validate(errors.email, { pattern: "email" })}
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
                  pattern: helper.regex.displayName,
                })}
                {...helper.validate(errors.title, {
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
                {...helper.validate(errors.description, {
                  length: 150,
                  pattern: "displayName",
                })}
              />
            </Grid>
            <Grid item md={12}>
              <Box sx={{ m: 4 }}>
                <TextField
                  fullWidth
                  label="Header"
                  name="header"
                  {...register("header", {
                    maxLength: 50,
                    pattern: helper.regex.displayName,
                  })}
                  {...helper.validate(errors.header, {
                    length: 50,
                    pattern: "displayName",
                  })}
                />
                <Editor
                  toolbarButtonSize="small"
                  controls={helper.rteControls}
                  inlineToolbar
                  label="Start typing"
                  onChange={(evt) => 
                    {
                      let rte = draftToMarkdown(
                        convertToRaw(evt.getCurrentContent())
                      );
                      return rte;
                    }
                  }
                />             
              </Box>

              <IconButton color="primary" aria-label="Add Details">
                <AddCircleOutlineSharp />
              </IconButton>
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
                {...helper.validate(errors.country)}
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
                {...helper.validate(errors.city)}
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
                {...helper.validate(errors.country)}
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
                {...helper.validate(errors.city)}
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
