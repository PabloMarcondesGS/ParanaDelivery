import styled from 'styled-components';
import { Paper, Typography } from '@material-ui/core';

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
  // height: 100vh;
  overflow: auto;
`;

export const TypographyStyled = styled(Typography)`
  font-size: 16;
  font-weight: 500;
`;
