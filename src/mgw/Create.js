import React, { useEffect } from "react";
import FormStepper from "./components/shared/FormStepper";
import helper from "./utils/helper";

export default function Create(props) {
  const { setMgwState } = props;
  useEffect(() => {
    return setMgwState({
      articlePosted: "",
      articleInputs: {...helper.initArticleInputs},
      articleInputsErrors: {},
      createActiveStep: 0,
      requestError: "",
      requestSuccess: ""
    });
  }, [setMgwState]);

  return (
    <FormStepper {...props} type="create"/>
  );
}
