import styled, { css } from 'styled-components';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { width, breakpoints } from '@material-ui/system';
import colors from '~/styles/colors';

export const StyledAppBar = styled(AppBar)`
  ${breakpoints(width)};
  background: ${colors.black};
  transition: width 0.5s;
`;

export const MenuStyled = styled(Menu)``;

export const MenuItemStyled = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 40px;
`;

export const ListItemIconStyled = styled(ListItemIcon)``;

export const ListItemTextStyled = styled(ListItemText)``;

export const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin: 0px 5px;
  cursor: pointer;

  span {
    color: ${colors.secondary};
  }

  @media (max-width: 600px) {
    width: 100px;

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 450px) {
    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 400px) {
    max-width: 100%;

    span {
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
      font-size: 0.7rem;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: 8px;

  ${props =>
    props.visible &&
    css`
      display: none;
    `}
`;

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    h6 {
      font-size: 1rem;
    }
  }

  @media (max-width: 450px) {
    h6 {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 400px) {
    max-width: 0;
  }
`;
