import { createTheme, alpha, responsiveFontSizes } from "@mui/material";

const mgwColors = {
  primary: "#1C7C54",
  secondary: "#F0BCD4",
  priText: "#0A2E36",
  secText: "#ECA72C",
  priAccent: "#C6C5B9",
  secAccent: "#EBB9DF",
  background: "#F7F7FF"
}

let mgwTheme = createTheme({
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
    },
    MUIRichTextEditor: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          marginTop: "20px"
        },
        container: {
          width: "100%",
          margin: 0,
          minHeight: 200,
          display: "flex",
          flexDirection: "column"
        },
        toolbar: {
          width: "100%",
          flexShrink: 0
        },
        placeHolder: {
          position: "static"
        },
        editor: {
          flexGrow: 1,
          overflowY: "auto",
          borderBottom: "1px solid gray"
        }
      }
    }
  }
});

mgwTheme = responsiveFontSizes(mgwTheme);
export default mgwTheme;
export { mgwColors };
