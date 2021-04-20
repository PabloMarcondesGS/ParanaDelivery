import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  StylesProvider,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { theme, global } from '~/styles/styles';

import Routes from './routes';
import history from './services/history';
import AppProvider from './hooks/index';

const App = () => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <CssBaseline />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <AppProvider>
              <Routes />
            </AppProvider>
          </MuiPickersUtilsProvider>
          <ToastContainer autoClose={3000} />
        </Router>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default withStyles(global)(App);
