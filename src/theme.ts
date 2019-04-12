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
    text: {
      primary: '#fff'
    },
    primary,
    secondary,
    background: {
      default: '#74C1CC',
      paper: '#f2b68c'
    }
  },
  shape: {
    borderRadius: 24
  },
  typography: {
    allVariants: {
      color: '#fff'
    },
    title: {
      fontWeight: 'bold'
    }
  },
});