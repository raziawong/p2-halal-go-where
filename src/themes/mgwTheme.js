import { createTheme } from "@mui/material";

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
          backgroundColor: "#F7F7FF"
        }
      }
    }
  }
});

export default mgwTheme;
