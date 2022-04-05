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
import HorizontalStepper from "../shared/HorizontalStepper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({
  locationOpts,
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
}) {
  const hsProps = {
    locationOpts,
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
  };
  const handleClose = () => {
    const inputs = helper.initArticleInputs;
    if (!userVerifyErrorMsg) {
      inputs.email = userEmail;
    }
    setMgwState({
      editModal: false,
      articleInputs: inputs,
      articleInputsErrors: {},
      userVerifyErrorMsg: "",
    });
  };
  return (
    <Dialog
      fullWidth keepMounted
      maxWidth="87vw"
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={editModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Edit {articleState.title}
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
        <HorizontalStepper {...hsProps} type="edit" />
      </DialogContent>
    </Dialog>
  );
}
