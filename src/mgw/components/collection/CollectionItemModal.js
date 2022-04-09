import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CloseSharp } from "@mui/icons-material";
import CurateFields from "../formgroups/CurateFields";
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
}) {
  const handleClose = () => {
    setMgwState({
      collectionModal: false,
      collectionAction: "retrieve",
      curateInputs: { ...helper.initCurateInputs },
      curateInputsErrors: {},
    });
  };

  return (
    <Dialog
      sx={{ display: { xs: "block", md: "none" } }}
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
