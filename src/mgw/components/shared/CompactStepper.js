import React from "react";
import helper from "../../utils/helper";
import { Link } from "react-router-dom";
import { Alert, Box, Button, Icon, MobileStepper, Paper, Typography} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, WarningAmber} from '@mui/icons-material';
import NewAuthor from "../formfields/NewAuthor";
import VerifyAuthor from "../formfields/VerifyAuthor";
import ArticleSummary from "../formfields/ArticleSummary";
import ArticleDetails from "../formfields/ArticleDetails";
import ArticleTags from "../formfields/ArticleTags";
import ConfirmDelete from "../formfields/ConfimDelete";

export default function CompactStepper({
    countryOpts,
    catOpts,
    tagOpts,
    activeStep,
    articleState,
    setArticleState,
    articleError,
    userVerifyErrorMsg,
    validateArticle,
    setArr,
    removeArr,
    setMgwState,
    type,
    articleActedOn,
    requestError,
    requestSuccess
  }) {
    const stepState =
    type === "create"
      ? "createActiveStep"
      : type === "edit"
      ? "editActiveStep"
      : "deleteActiveStep";
  const stepsList =
    type === "create"
      ? helper.createSteps
      : type === "edit"
      ? helper.editSteps
      : helper.deleteSteps;
  const hasError = Object.entries(articleError)?.length !== 0;
  const handleNext = () => {
    validateArticle(stepsList[activeStep].fields, type);
  };
  const handleBack = () => {
    setMgwState({ [stepState]: activeStep - 1 });
  };      
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" }, mt: 2 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "5vh",
          bgcolor: "background.default",
        }}
      >
        {hasError && (
          <Icon>
            <WarningAmber fontSize="small" color="error" />
          </Icon>
        )}
        <Typography
          component="h4"
          variant="h4"
          color={hasError ? "error.main" : "primary"}
          sx={{ textDecoration: "underline" }}
        >
          {stepsList[activeStep].title}
        </Typography>
      </Paper>
      <Box sx={{ py: 2 }}>
        {requestSuccess && (
          <Alert
            square
            severity="success"
            action={
              type === "create" &&
              articleActedOn && (
                <Button
                  component={Link}
                  aria-label="View article"
                  to={`/article/${articleActedOn}`}
                  size="small"
                  color="secondary"
                >
                  View Article
                </Button>
              )
            }
          >
            {requestSuccess}
          </Alert>
        )}
        {requestError && (
          <Alert square severity="error">
            {requestError}
          </Alert>
        )}
      </Box>
      <Box sx={{ p: 2 }}>
        {activeStep === 0 && type === "create" && (
          <NewAuthor
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
          />
        )}
        {activeStep === 0 && (type === "edit" || type === "delete") && (
          <VerifyAuthor
            type={type}
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
            userVerifyErrorMsg={userVerifyErrorMsg}
          />
        )}
        {activeStep === 1 && (type === "create" || type === "edit") && (
          <ArticleSummary
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
            countryOpts={countryOpts}
          />
        )}
        {activeStep === 1 && type === "delete" && <ConfirmDelete />}
        {activeStep === 2 && (
          <ArticleDetails
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
            setArr={setArr}
            removeArr={removeArr}
          />
        )}
        {activeStep === 3 && (
          <ArticleTags
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
            catOpts={catOpts}
            tagOpts={tagOpts}
          />
        )}
      </Box>
      <MobileStepper
        variant="dots"
        steps={stepsList.length}
        position="bottom"
        activeStep={activeStep}
        sx={{ "& .MuiMobileStepper-dot": { width: "12px", height: "12px" } }}
        nextButton={
          <Button aria-label="submit step and go to next" onClick={handleNext}>
            {activeStep === stepsList.length - 1
              ? type === "delete"
                ? "Confirm"
                : "Submit"
              : "Next"}{" "}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            aria-label="previous step"
            disabled={!!Object.entries(articleError).length}
            onClick={handleBack}
            color="secondary"
            sx={{ visibility: activeStep === 0 ? "hidden" : "" }}
          >
            <KeyboardArrowLeft /> Back
          </Button>
        }
      />
    </Box>
  );
}