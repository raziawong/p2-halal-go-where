import helper from "../../utils/helper";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import NewAuthor from "../formgroups/NewAuthor";
import ArticleSummary from "../formgroups/ArticleSummary";
import ArticleDetails from "../formgroups/ArticleDetails";
import ArticleTags from "../formgroups/ArticleTags";

export default function HorizontalStepper({
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
}) {
  const hasError = Object.entries(articleError)?.length !== 0;
  const isOptional = (step) => {
    return step === 2;
  };
  const handleSkip = () => {
    if (!isOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setMgwState({ createActiveStep: activeStep + 1 });
  };
  const handleNext = () => {
    validateArticle(helper.createSteps[activeStep].fields);
  };
  const handleBack = () => {
    setMgwState({ createActiveStep: activeStep - 1 });
  };

  return (
    <Box sx={{ m: 4 }}>
      <Stepper activeStep={activeStep}>
        {helper.createSteps.map((step, i) => (
          <Step key={step.title}>
            <StepLabel error={activeStep === i && hasError}>
              {step.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ m: 4 }}>
        {activeStep === 0 && (
          <NewAuthor
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
          />
        )}
        {activeStep === 1 && (
          <ArticleSummary
            articleState={articleState}
            setArticleState={setArticleState}
            articleError={articleError}
            locationOpts={locationOpts}
          />
        )}
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
          disabled={!!Object.entries(articleError).length}
          onClick={handleBack}
          sx={{ mr: 1, display: activeStep === 0 ? "none" : "" }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isOptional(activeStep) && (
          <Button
            disabled={!!Object.entries(articleError).length}
            onClick={handleSkip}
            sx={{ mr: 1 }}
          >
            Skip
          </Button>
        )}
        <Button onClick={handleNext}>
          {activeStep === helper.createSteps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
