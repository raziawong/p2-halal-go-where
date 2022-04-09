import React from "react";
import helper from "../../utils/helper";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import NewAuthor from "../formgroups/NewAuthor";
import VerifyAuthor from "../formgroups/VerifyAuthor";
import ArticleSummary from "../formgroups/ArticleSummary";
import ArticleDetails from "../formgroups/ArticleDetails";
import ArticleTags from "../formgroups/ArticleTags";
import ConfirmDelete from "../formgroups/ConfimDelete";

export default function HorizontalStepper({
  locationOpts,
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
  articlePosted,
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
  const isOptional = (step) => {
    return step === 2;
  };
  const handleSkip = () => {
    if (!isOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setMgwState({ [stepState]: activeStep + 1 });
  };
  const handleNext = () => {
    validateArticle(stepsList[activeStep].fields, type);
  };
  const handleBack = () => {
    setMgwState({ [stepState]: activeStep - 1 });
  };

  return (
    <Box sx={{ m: 4, display: { xs: "none", md: "block" } }}>
      {requestSuccess && (
        <Box sx={{ mb: 4 }}>
          <Alert
            square
            severity="success"
            action={
              type === "create" &&
              articlePosted && (
                <Button
                  component={Link}
                  aria-label="View article"
                  to={`/article/${articlePosted}`}
                  size="small"
                  color="secondary"
                >
                  View Article
                </Button>
              )
            }
          >
            <AlertTitle>Success</AlertTitle>
            {requestSuccess}
          </Alert>
        </Box>
      )}
      {requestError && (
        <Box sx={{ mb: 4 }}>
          <Alert square severity="error">
            <AlertTitle>Error</AlertTitle>
            {requestError}
          </Alert>
        </Box>
      )}
      <Stepper activeStep={activeStep}>
        {stepsList.map((step, i) => (
          <Step key={step.title}>
            <StepLabel error={activeStep === i && hasError}>
              {step.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ m: 4 }}>
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
            locationOpts={locationOpts}
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
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          aria-label="previous step"
          disabled={!!Object.entries(articleError).length}
          onClick={handleBack}
          sx={{ mr: 1, display: activeStep === 0 ? "none" : "" }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isOptional(activeStep) && (
          <Button
            aria-label="skip step"
            disabled={!!Object.entries(articleError).length}
            onClick={handleSkip}
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
        )}
        <Button aria-label="submit step and go to next" onClick={handleNext}>
          {activeStep === stepsList.length - 1
            ? type === "delete"
              ? "Confirm"
              : "Submit"
            : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
