import React from 'react';
import PropTypes from 'prop-types';

import { AuthProvider } from './Auth';
import { ToastProvider } from './Toast';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default AppProvider;
