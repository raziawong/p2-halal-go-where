import React, {Fragment} from "react";
import HorizontalStepper from "./HorizontalStepper";
import CompactStepper from "./CompactStepper";

export default function FormStepper(props) {
  return (
    <Fragment>
      <HorizontalStepper {...props} />
      <CompactStepper {...props} />
    </Fragment>
  );
}
