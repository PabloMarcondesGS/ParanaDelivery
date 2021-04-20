import React from 'react';
import { useTransition } from 'react-spring';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Toast from './Toast';

const ToastContainer = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    }
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

ToastContainer.propTypes = {
  messages: PropTypes.shape().isRequired,
};

export default ToastContainer;
