import helper from "../../utils/helper";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import HorizontalStepper from "./HorizontalStepper";

export default function EditModal({
  type,
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
  userVerified,
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
  };
  const handleClose = () => {
    let inputs = helper.initArticleInputs;
    if (userVerified) {
      inputs.email = userEmail;
    }
    setMgwState({
      editModal: false,
      articleInputs: inputs,
      articleInputsErrors: {},
    });
  };
  return (
    <Modal
      aria-labelledby="title"
      open={editModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={editModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <HorizontalStepper {...hsProps} />
        </Box>
      </Fade>
    </Modal>
  );
}
