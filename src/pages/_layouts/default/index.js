import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

import Drawer from '~/components/Drawer';
import Header from '~/components/Header';

const DefaultLayout = ({ children }) => {
  const [visibleDrawer, setVisibleDrawer] = useState(true);

  const drawerWidth = 270;

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

  function handleDrawer() {
    setVisibleDrawer(!visibleDrawer);
  }

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 960) {
      setVisibleDrawer(false);
    }
  }, [width]);
  return (
    <Wrapper>
      <Header
        handleDrawer={handleDrawer}
        visibleDrawer={visibleDrawer}
        drawerWidth={drawerWidth}
      />
      <Drawer
        handleDrawer={handleDrawer}
        visibleDrawer={visibleDrawer}
        drawerWidth={drawerWidth}
      />
      <Content visibleDrawer={visibleDrawer} drawerWidth={drawerWidth}>
        {children}
      </Content>
    </Wrapper>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
