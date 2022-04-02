import helper from "../../utils/helper";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import NewAuthor from "../formgroups/NewAuthor";
import ArticleSummary from "../formgroups/ArticleSummary";
import ArticleDetails from "../formgroups/ArticleDetails";
import ArticleTags from "../formgroups/ArticleTags";

export default function HorizontalStepper(props) {
  const {
    articleWatch,
    locationOpts,
    catOpts,
    tagOpts,
    activeStep,
    setArr,
    removeArr,
    setMgwState,
  } = props;

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
    setMgwState({ createActiveStep: activeStep + 1 });
  };
  const handleBack = () => {
    setMgwState({ createActiveStep: activeStep - 1 });
  };

  return (
    <Box sx={{ m: 4 }}>
      <Stepper activeStep={activeStep}>
        {helper.createSteps.map((label, i) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ m: 4 }}>
        {activeStep === 0 && <NewAuthor articleWatch={articleWatch} />}
        {activeStep === 1 && (
          <ArticleSummary
            articleWatch={articleWatch}
            locationOpts={locationOpts}
          />
        )}
        {activeStep === 2 && (
          <ArticleDetails
            articleWatch={articleWatch}
            setArr={setArr}
            removeArr={removeArr}
          />
        )}
        {activeStep === 3 && (
          <ArticleTags
            articleWatch={articleWatch}
            catOpts={catOpts}
            tagOpts={tagOpts}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        {activeStep !== helper.createSteps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Box>
  );
}
