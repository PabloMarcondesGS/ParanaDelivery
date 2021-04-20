import styled from 'styled-components';
import { Paper, Typography, TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

export const Container = styled.div`
  width: calc(100% - 60px);
  margin: 30px;
`;

export const PaperStyled = styled(Paper)`
  margin-top: 10;
  flex-grow: 1;
  padding: 30px;
  width: 100%;
  height: 200;
  overflow: auto;
`;

export const TypographyStyled = styled(Typography)`
  font-size: 16;
  font-weight: 500;
`;

export const TextFieldStyled = styled(TextField)`
  margin: 8px 0;
  padding: 0 8px;
`;

export const ImageStyled = styled.img`
  max-width: 100px;
  width: 100%;
  height: 100%;
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
