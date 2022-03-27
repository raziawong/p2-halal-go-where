import { createTheme, alpha } from "@mui/material";

const mgwColors = {
  primary: "#1C7C54",
  secondary: "#F0BCD4",
  priText: "#0A2E36",
  secText: "#ECA72C",
  priAccent: "#C6C5B9",
  secAccent: "#EBB9DF",
  background: "#F7F7FF"
}

const mgwTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1C7C54",
      contrastText: "#F7F7FF",
    },
    secondary: {
      main: "#D7BCC8",
    },
    text: {
      primary: "#0A2E36",
      secondary: "#ECA72C",
    },
  },
  typography: {
    fontFamily: "Raleway, sans-serif",
    body1: {
      fontFamily: "Rubik, sans-serif",
    },
    body2: {
      fontFamily: "Rubik, sans-serif",
    },
    button: {
      fontFamily: "Rubik, sans-serif",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(mgwColors.background, 0.5)
        }
      }
    }
  }
});

export { mgwColors };
export default mgwTheme;
