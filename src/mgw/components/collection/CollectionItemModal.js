import React from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CloseSharp } from "@mui/icons-material";
import CurateFields from "../formfields/CurateFields";
import helper from "../../utils/helper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CollectionItemModal({
  curateState,
  curateErrors,
  collectionAction,
  collectionModal,
  validateCurate,
  setMgwState,
  requestSuccess,
  requestError,
}) {
  const handleClose = () => {
    setMgwState({
      collectionModal: false,
      collectionAction: "retrieve",
      curateInputs: { ...helper.initCurateInputs, curateEmail: curateState.curateEmail },
      curateInputsErrors: {},
      requstSuccess: "",
      requestError: "",
    });
  };
  return (
    <Dialog
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={collectionModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {collectionAction === "delete" ? "Remove from" : "Add to"} Collection
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
        <Box sx={{ my: 4 }}>
          {requestSuccess && (
            <Alert square severity="success">
              {requestSuccess}
            </Alert>
          )}
          {requestError && (
            <Alert square severity="error">
              {requestError}
            </Alert>
          )}
        </Box>
        <CurateFields
          collectionAction={collectionAction}
          curateState={curateState}
          curateErrors={curateErrors}
          validateCurate={validateCurate}
          setMgwState={setMgwState}
        />
      </DialogContent>
    </Dialog>
  );
}
