import styled from 'styled-components';
import { ListItem } from '@material-ui/core';

export const StyledListItem = styled(ListItem)`
  padding-left: 63px;
`;

export const StyledListItemSub = styled(ListItem)`
  padding-left: 56px;
`;

export const IconImg = styled(ListItem)`
  width: 45px;
  display: flex;
  justify-content: flex-end;
  img {
    height: 25px;
    align-self: center;
  }
`;
