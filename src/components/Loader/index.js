import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Styles from './styles';
import { useAuth } from '~/hooks/Auth';

const Loading = props => {
  const { size, type } = props;
  const { language } = useAuth();
  const fontSize = size / 5;
  return (
    <div className={Styles.root}>
      <Loader type={type} color="#114C78" height={size} width={size} />
      <Typography variant="46" style={{ fontSize, marginTop: -20 }}>
        {language ? 'Loading...' : 'Carregando...'}
      </Typography>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.node.isRequired,
  type: PropTypes.node.isRequired,
};

export default withStyles(Styles)(Loading);
