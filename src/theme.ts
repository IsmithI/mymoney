import { createMuiTheme } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const primary: PaletteOptions["primary"] = {
  main: '#E37222',
};

const secondary: PaletteOptions['secondary'] = {
  main: '#07889B'
}

export const theme = createMuiTheme({
  palette: {
    primary,
    secondary,
    background: {
      paper: '#fff'
    }
  },
  shape: {
    borderRadius: 24
  },
  typography: {
    title: {
      fontWeight: 'bold'
    }
  },
});