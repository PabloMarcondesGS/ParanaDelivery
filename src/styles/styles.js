import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export const global = () => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      outline: 0,
      boxSizing: 'border-box',
      focus: {
        outline: 0,
      },
    },
    body: {
      webkitFontSmoothing: 'antialiased',
      backgroundColor: colors.lightSecondary,
    },
    'body, input, button': {
      fontSize: 14,
      fontFamily: ['Roboto', '"helvetica"'].join(','),
    },
    a: {
      textDecoration: 'none',
    },
    button: {
      cursor: 'pointer',
    },
  },
});

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4c5993',
      main: '#caad32',
      dark: '#162154',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e9e9e9',
      main: '#caad32',
      dark: '#D0D0D0',
      contrastText: '#000',
    },
    error: {
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
      contrastText: '#fff',
    },
    warning: {
      light: '#fddf5d',
      main: '#fdd835',
      dark: '#D0B12C',
      contrastText: '#fff',
    },
    info: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    success: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
  },

  typography: {
    fontFamily: ['Roboto', '"helvetica"'].join(','),
  },
});
