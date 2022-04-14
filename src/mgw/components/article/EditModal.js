import React from "react";
import helper from "../../utils/helper";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { CloseSharp } from "@mui/icons-material";
import FormStepper from "../shared/FormStepper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({
  countryOpts,
  catOpts,
  tagOpts,
  activeStep,
  articleState,
  setArticleState,
  articleError,
  validateArticle,
  setArr,
  removeArr,
  setMgwState,
  editModal,
  userEmail,
  userVerifyErrorMsg,
  requestError,
  requestSuccess
}) {
  const stepperProps = {
    countryOpts,
    catOpts,
    tagOpts,
    activeStep,
    articleState,
    setArticleState,
    articleError,
    validateArticle,
    setArr,
    removeArr,
    setMgwState,
    userVerifyErrorMsg,
    requestError,
    requestSuccess
  };
  const handleClose = () => {
    let inputs = helper.initArticleInputs;
    if (!userVerifyErrorMsg) {
      inputs.email = userEmail;
    }
    setMgwState({
      editModal: false,
      articleInputs: inputs,
      articleInputsErrors: {},
      editActiveStep: 0,
      userVerifyErrorMsg: "",
      articlePosted: "",
      requestError: "",
      requestSuccess: ""
    });
  };
  return (
    <Dialog
      fullWidth keepMounted
      maxWidth="85vw"
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={editModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Edit Article
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormStepper {...stepperProps} type="edit" />
      </DialogContent>
    </Dialog>
  );
}
