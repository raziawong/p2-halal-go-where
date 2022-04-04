import helper from "../../utils/helper";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import HorizontalStepper from "../shared/HorizontalStepper";

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
    userVerifyErrorMsg
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
      userVerifyErrorMsg: ""
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
          <HorizontalStepper {...hsProps} type="edit"/>
        </Box>
      </Fade>
    </Modal>
  );
}
