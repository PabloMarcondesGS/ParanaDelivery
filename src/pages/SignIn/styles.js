import styled from 'styled-components';
import { darken } from 'polished';
import { Container, Grid, Button, Icon, Typography } from '@material-ui/core';
import { Form } from 'formik';

import colors from '~/styles/colors';
import { breakpoints } from '~/utils/breakpoints';

export const StyledContainer = styled(Container)`
  background: ${colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 10px;
  ${breakpoints('padding', 'px', [
    {
      400: 10,
    },
  ])}
  ${breakpoints('padding', 'px', [
    {
      500: 10,
    },
  ])}
`;

export const StyledGridItem = styled(Grid)`
  width: 100%;
  ${breakpoints('width', '%', [
    {
      400: 95,
    },
  ])}
  ${breakpoints('width', '%', [
    {
      500: 95,
    },
  ])}
  margin-top: ${props => props.marginTop || 15}px;
`;

export const Error = styled(Typography)`
  color: ${colors.error};
  margin-top: 8px;
`;

export const IconStyled = styled(Icon)`
  margin-right: 10px;
`;

export const StyledSubmitButton = styled(Button)`
  margin-left: 10px;
  background: ${props => props.background};
  color: ${props => props.color};
  transition: background 1s;
  min-width: 250px;
  min-height: 50px;
  width: 100%;
  ${breakpoints('min-width', 'px', [
    {
      400: 150,
    },
  ])}
  ${breakpoints('min-width', 'px', [
    {
      50: 150,
    },
  ])}
  &:hover {
    background: ${props => darken(0.06, props.background || colors.darkWhite)};
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
  ${breakpoints('width', '%', [
    {
      400: 70,
    },
  ])}
  ${breakpoints('width', '%', [
    {
      500: 70,
    },
  ])}
  display: flex;
  flex-direction: column;
  img {
    align-self: center;
  }
`;
