import { alpha, styled } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";
import { Backdrop, Box, Drawer, Paper, Typography } from "@mui/material";
import { mgwColors } from "./mgwTheme";
import { borderRadius } from "@mui/system";

const SiteContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  width: "100vw",
}));

const ViewContainer = styled(Box)(({ theme }) => ({
  top: 0,
  left: 0,
  position: "absolute",
  width: "100%",
}));

const LoaderBackdrop = styled(Backdrop, {
  shouldForwardProp: (prop) => prop !== "width" || prop !== "height",
})(({ width, height, theme }) => ({
  top: 0,
  left: 0,
  width: width || "100vw",
  height: height || "100vh",
  overflow: "hidden",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const NavBarLogo = styled(Link)(({ theme }) => ({
  ...theme.typography.button,
  cursor: "pointer",
  padding: "0.2rem",
  "& img": {
    maxHeight: "9vh",
    [theme.breakpoints.down("md")]: {
      maxHeight: "6vh",
    },
  },
  "& p": {
    ...theme.typography.subtitle2,
    position: "absolute",
    marginTop: "2.5vh",
    color: theme.palette.grey[800]
  }
}));

const NavBarLink = styled(NavLink)(({ theme }) => ({
  color: mgwColors.primary,
  textDecoration: "none",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.h6.fontSize,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: theme.spacing(1),
  "&:hover": {
    color: mgwColors.tertiary,
    borderBottom: `1px solid ${mgwColors.tertiary}`,
  },
  "&.active": {
    color: mgwColors.tertiary,
    backgroundColor: alpha(mgwColors.primary, 0.1),
    padding: "4px",
    borderRadius: "4px",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0 0 0 0",
    padding: "0.5rem",
    justifyContent: "flex-start",
  },
}));

const NavBarDrawer = styled(Drawer)(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
  "& .MuiDrawer-paper": {
    backgroundColor: mgwColors.secBg,
  },
}));

const HeroBanner = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgImg",
})(({ theme, bgImg }) => ({
  minHeight: 600,
  background: `${alpha(
    mgwColors.priBg,
    0.4
  )} url(${bgImg}) no-repeat space right`,
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  margin: "0 0",
  borderRadius: "4px",
  boxShadow:
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  [theme.breakpoints.down("md")]: {
    minHeight: 450,
    backgroundPosition: "center",
  },
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: alpha(mgwColors.priBg, 0.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  flexDirection: "column",
}));

const LatestOverlay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  backgroundColor: alpha(mgwColors.darkBg, 0.5),
}));

const LatestLink = styled(Link)(({ theme }) => ({
  color: mgwColors.secContrast,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: mgwColors.secondary,
    borderBottom: `1px solid ${mgwColors.secondary}`,
  },
}));

const CatStackItem = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "bgImg",
})(({ theme, bgImg }) => ({
  height: "45vh",
  background: `${alpha(mgwColors.primary, 0.4)} url(${bgImg}) no-repeat center`,
  backgroundSize: "cover",
  boxShadow: "none",
}));

const CatStackOverlay = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: alpha(mgwColors.darkBg, 0.5),
}));

const CatStackHeader = styled(Typography)(({ theme }) => ({
  ...theme.typography.h2,
  textAlign: "center",
  color: mgwColors.secContrast,
}));

export {
  SiteContainer,
  ViewContainer,
  LoaderBackdrop,
  NavBarDrawer,
  NavBarLogo,
  NavBarLink,
  HeroBanner,
  HeroOverlay,
  LatestOverlay,
  LatestLink,
  CatStackItem,
  CatStackOverlay,
  CatStackHeader,
};
