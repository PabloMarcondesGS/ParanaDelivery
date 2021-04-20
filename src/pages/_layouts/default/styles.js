import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
`;

export const ContentMenu = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 60px 0px 20px;
  margin-left: ${props =>
    props.visibleDrawer ? `${props.drawerWidth}px` : '0px'};
  transition: all 0.5s ease-in-out;

  @media (max-width: 960px) {
    margin-left: 0;
  }
`;
