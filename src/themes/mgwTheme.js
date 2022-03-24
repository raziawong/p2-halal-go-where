import { createTheme } from "@mui/material";

const mgwTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1C7C54",
      contrastText: "#F7F7FF",
    },
    secondary: {
      main: "#FE5F55",
    },
    text: {
      primary: "#0A2E36",
      secondary: "#D7BCC8",
    },
  },
  typography: {
    fontFamily: "Raleway, sans-serif",
    body1: {
      fontFamily: "Barlow, sans-serif",
    },
    body2: {
      fontFamily: "Barlow, sans-serif",
    },
    button: {
      fontFamily: "Barlow, sans-serif",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#CDC6A5",
          color: "#1C7C54"
        }
      }
    }
  }
});

export default mgwTheme;
