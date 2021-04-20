import styled from 'styled-components';
import { Button, Paper, Icon } from '@material-ui/core';
import colors from '~/styles/colors';

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

export const ButtonStyled = styled(Button)`
  background-color: ${colors.green};
`;

export const IconStyled = styled(Icon)`
  font-size: 18px;
  margin-right: 2px;
`;
