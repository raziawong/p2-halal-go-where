import { createTheme, alpha, responsiveFontSizes } from "@mui/material";

const mgwColors = {
  primary: "#1A957D",
  secondary: "#E89D5C",
  tertiary: "#125E8A",
  priText: "#2E2E3A",
  secText: "#2B193D",
  priContrast: "#F0FFF1",
  secContrast: "#F3EFF5",
  priBg: "#FFFCFF",
  secBg: "#F0F3F5",
  darkBg: '#283044'
};

let mgwTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: mgwColors.primary,
      contrastText: mgwColors.priContrast,
    },
    secondary: {
      main: mgwColors.secondary,
      contrastText: mgwColors.secContrast,
    },
    tertiary: {
      main: mgwColors.tertiary,
      contrastText: mgwColors.secContrast
    },
    text: {
      primary: mgwColors.priText,
      secondary: mgwColors.secText
    },
    background: {
      default: mgwColors.priBg
    }
  },
  typography: {
    fontFamily: "Reem Kufi, sans-serif",
    body1: {
      fontFamily: "Raleway, sans-serif",
    },
    body2: {
      fontFamily: "Raleway, sans-serif",
    },
    button: {
      fontFamily: "Reem Kufi, sans-serif",
    },
  },
  components: {
    overrides: {
      MuiCssBaseline: {
        styleOverrides: `
          h1,h2,h3,h4,h5,h6: {
            color: ${mgwColors.priText}
          }
        `,
        body: {
          backgroundColor: mgwColors.priBg,
          color: mgwColors.secText
        },
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(mgwColors.secBg, 0.95),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mgwColors.priBg,
        },
        elevation1: {
          boxShadow: "0px 2px 1px -1px rgb(18 94 138 / 20%), 0px 1px 1px 0px rgb(18 94 138 / 14%), 0px 1px 3px 0px rgb(18 94 138 / 12%)"
        },
        elevation3: {
          boxShadow: "0px 2px 4px -1px rgb(18 94 138 / 20%), 0px 4px 5px 0px rgb(18 94 138 / 14%), 0px 1px 10px 0px rgb(18 94 138 / 12%)"
        }
      },
    },
    MUIRichTextEditor: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          marginTop: "20px",
        },
        container: {
          width: "100%",
          margin: 0,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
        },
        toolbar: {
          width: "100%",
          flexShrink: 0,
        },
        placeHolder: {
          position: "static",
        },
        editor: {
          flexGrow: 1,
          overflowY: "auto",
          borderBottom: "1px solid gray",
        },
      },
    },
  },
});

mgwTheme = responsiveFontSizes(mgwTheme);
export default mgwTheme;
export { mgwColors };
