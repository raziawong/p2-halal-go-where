import React, { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import helper from "./utils/helper";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { default as Editor } from "mui-rte";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddCircleOutlineSharp, Menu, RemoveCircleOutlineSharp } from '@mui/icons-material';

export default function Create(props) {
  const { tagOpts, article, countries, categories,
      setDetail, removeDetail, submitArticle } = props;
  const { getValues, register, control, formState: { errors }, handleSubmit, reset } = 
    useForm({ defaultValues: { ...article } });
  const { fields, append, remove } = useFieldArray({ name: "details", control });

  const liftData = (data) => {
    console.log(data);
    //submitArticle(data);
  };

  const changeDetail = (evt, index) => {
    if (evt.target) {
    let { name, value } = evt.target;
    console.log(name, value);
    } else {
      console.log(evt)
    }
  };

  const handleRemoveDetail = (evt, i) => {
    removeDetail(i);
    remove(i);
  };

  const handleAddDetail = (evt) => {
    setDetail(helper.emptyDetail);
    append(helper.emptyDetail);
  };

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormControl sx={{ width: "100%" }}>
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
              </FormControl>
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
              {article.details.map((dtl, i) => {
                return (
                  <Fragment key={i}>
                    <Box sx={{ m: 4 }}>
                      <TextField
                        fullWidth
                        label="Header"
                        name={`details[${i}]sectionName`}
                        onChange={(evt) => changeDetail(evt, i)}
                        {...register(`details.${i}.sectionName`, {
                          maxLength: 50,
                          pattern: helper.regex.displayName,
                        })}
                        {...helper.validate(errors.details, {
                          length: 50,
                          pattern: "displayName",
                        })}
                      />
                      <Editor
                        toolbarButtonSize="small"
                        controls={helper.rteControls}
                        inlineToolbar
                        label="Insert content for section"
                        name={`details[${i}]content`}
                        onChange={(evt) => changeDetail(evt, i)}
                        // onChange={(evt) => {
                        //   let rte = draftToMarkdown(
                        //     convertToRaw(evt.getCurrentContent())
                        //   );
                        //   return rte;
                        // }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {article.details.length !== 1 && (
                        <IconButton
                          color="secondary"
                          aria-label="Remove Detail"
                          onClick={(evt) => handleRemoveDetail(evt, i)}
                        >
                          <RemoveCircleOutlineSharp />
                        </IconButton>
                      )}
                      {article.details.length - 1 === i && (
                        <IconButton
                          color="primary"
                          aria-label="Add Details"
                          onClick={handleAddDetail}
                        >
                          <AddCircleOutlineSharp />
                        </IconButton>
                      )}
                    </Box>
                  </Fragment>
                );
              })}
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
              <Select
                fullWidth displayEmpty
                label="Country"
                arial-label="Country"
                name="countryId"
                {...register("countryId", { required: true })}
                {...helper.validate(errors.countryId)}
              >
                {helper.countryOptDisplay(countries.results)}
              </Select>
            </Grid>
            <Grid item md={6}>
              <Select
                fullWidth
                displayEmpty
                arial-label="City"
                name="cityId"
                {...register("cityId", { required: true })}
                {...helper.validate(errors.cityId)}
              >
                {helper.cityOptDisplay(countries, getValues("countryId"))}
              </Select>
            </Grid>
            <Grid item md={6}>
              <TextField
                select
                fullWidth
                label="Categories"
                name="catIds"
                {...register("catIds", { required: true })}
                {...helper.validate(errors.catIds)}
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
                {...register("subcatIds", { required: true })}
                {...helper.validate(errors.subcatIds)}
              >
                <MenuItem value="none">None</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={6}>
              <Autocomplete
                autoSelect
                freeSolo
                multiple
                fullWidth
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
