import { MuiThemeProvider } from '@material-ui/core';
import { AppContainer, AppRouter } from 'components';
import { StoresProvider } from 'providers';
import React from 'react';
import './App.css';
import { theme } from './theme';

export default () => (
  <StoresProvider>
    <MuiThemeProvider theme={theme}>
      <AppContainer>
        <AppRouter />
      </AppContainer>
    </MuiThemeProvider>
  </StoresProvider>
);
