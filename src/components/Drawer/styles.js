import styled from 'styled-components';
import { Drawer } from '@material-ui/core';
import colors from '~/styles/colors';

export const StyledDrawer = styled(Drawer)`
  flex-shrink: 0;

  .MuiDrawer-paper {
    background: ${colors.black};
    color: ${colors.secondary};
    width: ${props => props.drawerwidth}px;
    overflow: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 12px;
      background: ${colors.secondary};

      border-right: 1px solid ${colors.primary};
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.blue};
    }
  }

  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }

  svg {
    color: ${colors.secondary};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export const RowPlans = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px;
`;

export const ButtonMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    color: #fff;
  }
`;

export const Logo = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 45px;
    padding: 2px 0;
    margin-left: 8px;
  }
`;
