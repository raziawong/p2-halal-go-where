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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddItemModal({
  curateState,
  curateErrors,
  addItemModal,
  setMgwState,
}) {
  const handleClose = () => {
    setMgwState({
      addItemModal: false,
    });
  };
  return (
    <Dialog
      sx={{ display: { xs: "block", md: "none" } }}
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={addItemModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Add to Collection
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
          curateState={curateState}
          curateErrors={curateErrors}
          setMgwState={setMgwState}
        />
      </DialogContent>
    </Dialog>
  );
}
