import React, { useEffect } from "react";
import FormStepper from "./components/shared/FormStepper";

export default function Create(props) {
  const { setMgwState } = props;
  useEffect(() => {
    return setMgwState({ articlePosted: "" });
  }, [setMgwState]);

  return (
    <FormStepper {...props} type="create"/>
  );
}
