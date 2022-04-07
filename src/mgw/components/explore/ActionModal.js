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
import ActionGroup from "./ActionGroup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ActionModal({
  actionModal,
  setMgwState,
  setFilterOpts,
  detectSearch,
  filterOpts,
  sortIndex,
  sortAnchor,
  countries,
  categories,
}) {
  const handleClose = () => {
    setMgwState({
      actionModal: false
    });
  };
  return (
    <Dialog
      sx={{display: { xs: "block", md: "none" }}}
      TransitionComponent={Transition}
      fullScreen={useMediaQuery(useTheme().breakpoints.down("md"))}
      open={actionModal}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Search, Sort and Filter
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
        <ActionGroup
          setMgwState={setMgwState}
          setFilterOpts={setFilterOpts}
          detectSearch={detectSearch}
          filterOpts={filterOpts}
          sortIndex={sortIndex}
          sortAnchor={sortAnchor}
          countries={countries}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
