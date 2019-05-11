import React from "react";
import { StoresProvider } from "./providers";
import { AppRouter, AppContainer } from "./components";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import "./App.css";

export default () => (
  <StoresProvider>
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <AppRouter />
      </AppContainer>
    </MuiThemeProvider>
  </StoresProvider>
);
