import { alpha, styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import { mgwColors } from './mgwTheme';

const HeroBanner = styled(Box,{
    shouldForwardProp: (prop) => prop !== "bgImg",
  })(({ theme, bgImg }) => ({
    minHeight: 500,
    background: bgImg ? `url(${bgImg}) no-repeat center` : alpha(mgwColors.primary, 0.3),
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: theme.spacing(0 ,0)
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: alpha(mgwColors.background, 0.3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
}));

export { HeroBanner, HeroOverlay };