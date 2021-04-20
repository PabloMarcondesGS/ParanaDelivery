import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { TextField } from '@material-ui/core';

export const TextFieldStyled = styled(TextField)`
  margin: 8px 0;
  padding: 0 8px;
`;

export const NumberFormatStyled = styled(NumberFormat)`
  margin: 8px 0;
  padding: 0 8px;
`;

export const ErrorMessageText = styled.p`
  color: red;
  padding-bottom: 16px;
  padding-left: 8px;
`;
