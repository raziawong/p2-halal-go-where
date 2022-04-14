import React, { useEffect } from "react";
import { Container } from "@mui/material";
import FormStepper from "./components/shared/FormStepper";
import helper from "./utils/helper";

export default function Create(props) {
  const { setMgwState } = props;
  useEffect(() => {
    return setMgwState({
      articleActedOn: "",
      articleInputs: {...helper.initArticleInputs},
      articleInputsErrors: {},
      createActiveStep: 0,
      requestError: "",
      requestSuccess: ""
    });
  }, [setMgwState]);

  return (
    <Container component="main" disableGutters maxWidth="xl" sx={{width: "100vw"}}>
      <FormStepper {...props} type="create"/>
    </Container>
  );
}
