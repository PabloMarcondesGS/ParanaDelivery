import styled from 'styled-components';
import colors from '~/styles/colors';
// import bg from '~/assets/images/bgLogin.jpg';
import { breakpoints } from '~/utils/breakpoints';

export const Wrapper = styled.div`
  height: 100vh;
  background: ${colors.white};

  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Content = styled.div`
  flex: 1;
  min-width: 500px;
  max-width: 600px;
  ${breakpoints('min-width', '%', [
    {
      400: 90,
    },
  ])}
  ${breakpoints('max-width', '%', [
    {
      400: 90,
    },
  ])}
  ${breakpoints('min-width', '%', [
    {
      500: 90,
    },
  ])}
  ${breakpoints('max-width', '%', [
    {
      500: 90,
    },
  ])}
`;
