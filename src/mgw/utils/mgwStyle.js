import { alpha, styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Backdrop, Box, Drawer } from "@mui/material";
import { mgwColors } from './mgwTheme';

const SiteContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100vh",
    width: "100vw"
}));

const ViewContainer = styled(Box)(({ theme }) => ({
    top: 0,
    left: 0,
    position: "absolute",
    width: "100%"
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
    justifyContent: "center"
}));

const NavBarLogo = styled(Link)(({ theme }) => ({
    flexGrow: 1,
    cursor: "pointer",
    padding: "0.2rem",
    "& img": {
        maxHeight: "9vh",
        [theme.breakpoints.down("md")]: {
            maxHeight: "6vh"
        }
    }
}));

const NavBarLink = styled(Link)(({ theme }) => ({
    color: mgwColors.priText,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(1),
    "&:hover": {
        color: mgwColors.secText,
        borderBottom: `1px solid ${mgwColors.secText}`
    },
    [theme.breakpoints.down("md")]: {
        margin: "0 0 0 0",
        padding: "0.5rem",
        justifyContent: "flex-start",
    }
}));

const NavBarDrawer= styled(Drawer)(({ theme }) => ({
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.down("md")]: {
        display: "flex"
    },
    "& .MuiDrawer-paper": {
        backgroundColor: mgwColors.background
    }
}));

const HeroBanner = styled(Box, {
    shouldForwardProp: (prop) => prop !== "bgImg",
  })(({ theme, bgImg }) => ({
    minHeight: 600,
    background: bgImg ? `url(${bgImg}) no-repeat space right` : alpha(mgwColors.primary, 0.3),
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    margin: "0 0",
    [theme.breakpoints.down("md")]: {
        minHeight: 450,
        backgroundPosition: "center"
    }
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: alpha(mgwColors.background, 0.4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    flexDirection: "column"
}));

const LatestLink = styled(Link)(({ theme }) => ({
    color: mgwColors.background,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    "&:hover": {
        color: mgwColors.secText,
        borderBottom: `1px solid ${mgwColors.secText}`
    }
}));

export { SiteContainer, ViewContainer, LoaderBackdrop, NavBarDrawer, NavBarLogo, NavBarLink, HeroBanner, HeroOverlay, LatestLink};