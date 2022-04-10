import React, {Fragment} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Mgw from "./mgw/Mgw";
import mgwTheme from "./mgw/utils/mgwTheme";

export default function App() {
  return (
    <Fragment>
      <ThemeProvider theme={mgwTheme}>
      <CssBaseline />
      <Mgw />
      </ThemeProvider>
    </Fragment>
  );
}