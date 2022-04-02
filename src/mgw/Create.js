import React, { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import helper from "./utils/helper";
import { Box, Button, Container, Step, StepLabel, Stepper, Typography } from "@mui/material";
import {
  AddCircleOutlineSharp,
  Menu,
  RemoveCircleOutlineSharp,
} from "@mui/icons-material";
import { HorizontalStepper } from "./site";

export default function Create(props) {
  const {
    tagOpts,
    article,
    countries,
    categories,
    setArr,
    removeArr,
    submitArticle,
    active,
    setActive,
  } = props;
  const {
    getValues,
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { ...article } });
  const { append: appendDetail, remove: deleteDetail } = useFieldArray({
    name: "details",
    control,
  });
  const { append: appendPhoto, remove: deletePhoto } = useFieldArray({
    name: "photos",
    control,
  });

  const liftData = (data) => {
    console.log(data);
    //submitArticle(data);
  };

  return (
    <Fragment>
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ m: 4 }}>
          <HorizontalStepper 
            article={article}
            countries={countries}
            categories={categories}
            tagOpts={tagOpts}
            register={register}
            control={control}
            errors={errors}
            active={active}
            setActive={setActive}
            setArr={setArr}
            removeArr={removeArr}
          />
        </Box>
      </Container>
    </Fragment>
  );
}
