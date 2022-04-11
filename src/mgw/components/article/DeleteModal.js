import React from "react";
import helper from "../../utils/helper";
import { useNavigate } from "react-router-dom";
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

export default function DeleteModal({
  activeStep,
  articleState,
  setArticleState,
  articleError,
  validateArticle,
  setMgwState,
  deleteModal,
  userEmail,
  userVerifyErrorMsg,
  requestError,
  requestSuccess
}) {
  const navigate = useNavigate();
  const stepperProps = {
    activeStep,
    articleState,
    setArticleState,
    articleError,
    validateArticle,
    setMgwState,
    userVerifyErrorMsg,
    requestError,
    requestSuccess
  };
  const handleClose = () => {
    const inputs = helper.initArticleInputs;
    if (!userVerifyErrorMsg) {
      inputs.email = userEmail;
      navigate('/explore');
    }
    setMgwState({
      deleteModal: false,
      articleInputs: inputs,
      articleInputsErrors: {},
      deleteActiveStep: 0,
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
      open={deleteModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Delete Article
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
        <FormStepper {...stepperProps} type="delete" />
      </DialogContent>
    </Dialog>
  );
}
