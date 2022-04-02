import helper from "../../utils/helper";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import NewAuthor from "../FormGroups/NewAuthor";
import ArticleSummary from "../FormGroups/ArticleSummary";
import ArticleDetails from "../FormGroups/ArticleDetails";
import ArticleTags from "../FormGroups/ArticleTags";

export default function HorizontalStepper(props) {
  const {
    tagOpts,
    article,
    countries,
    categories,
    setArr,
    removeArr,
    submitArticle,
    control,
    register,
    errors,
    getValues,
    active,
    setActive,
  } = props;

  const isOptional = (step) => {
    return step === 2;
  };
  const handleStepContent = (step) => {
    // return <NewUser errors={errors} register={register} />;
  };
  const handleSkip = () => {
    if (!isOptional(active)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActive(active + 1);
  };
  const handleNext = () => {
    setActive(active + 1);
  };
  const handleBack = () => {
    setActive(active - 1);
  };

  return (
    <Box sx={{ m: 4 }}>
      <Stepper activeStep={active}>
        {helper.createSteps.map((label, i) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ m: 4 }}>
        {active === 0 && <NewAuthor register={register} errors={errors} />}
        {active === 1 && (
          <ArticleSummary
            register={register}
            errors={errors}
            countries={countries}
          />
        )}
        {active === 2 && (
          <ArticleDetails
            control={control}
            register={register}
            errors={errors}
            article={article}
            countries={countries}
            setArr={setArr}
            removeArr={removeArr}
          />
        )}
        {active === 3 && (
          <ArticleTags
            register={register}
            errors={errors}
            categories={categories}
            tagOpts={tagOpts}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={active === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isOptional(active) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        {active !== helper.createSteps.length - 1 && (
          <Button onClick={handleNext}>Next</Button>
        )}
      </Box>
    </Box>
  );
}
