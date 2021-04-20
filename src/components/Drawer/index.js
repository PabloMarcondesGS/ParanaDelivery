import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Hidden, IconButton, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { StyledDrawer, Row, Logo } from './styles';

import dashboardIcon from '~/assets/icons/dashboard-icon.png';
import groupsIcon from '~/assets/icons/groups-black-48dp.svg';
import file from '~/assets/icons/file.png';
import Item from './Components/Item';
// import folder from '~/assets/icons/icons8-folder-100.png';
// import app from '~/assets/icons/icons8-smartphone-tablet-64.png';

import logoImg from '~/assets/images/log.png';
import { useAuth } from '~/hooks/Auth';

const DrawerMenu = ({ handleDrawer, visibleDrawer, drawerWidth, location }) => {
  const [itemMenu, setItemMenu] = useState(0);
  const [itemSubMenu, setItemSubMenu] = useState(null);
  const { user, language } = useAuth();
  const currentLink = location.pathname.substr(location.pathname.indexOf('/'));

  const currentLinkSplit = location.pathname
    .substr(location.pathname.indexOf('/'))
    .split('/');

  // value: 'recipient',
  // value: 'laboratory_analyst',
  // value: 'cetesb_analyst',

  let listMenu = null;
  if (user.level === 'admin') {
    listMenu = [
      {
        id: 1,
        name: 'Dashboard',
        link: '/dashboard',
        icon: dashboardIcon,
      },
      {
        id: 2,
        name: language ? 'Users' : 'Usuários',
        icon: groupsIcon,
        link: '/dashboard/users',
      },
      {
        id: 3,
        name: 'Pedidos',
        icon: file,
        link: '/dashboard/deliveries',
      },
    ];
  }

  function checkSelected(itemLink) {
    if (itemLink) {
      if (currentLinkSplit[currentLinkSplit.length - 1] === 'add') {
        const newCurrentLink = currentLink.substr(
          0,
          currentLink.length -
            currentLinkSplit[currentLinkSplit.length - 1].length -
            1
        );

        return itemLink === newCurrentLink;
      }

      if (currentLinkSplit[currentLinkSplit.length - 2] === 'edit') {
        const newCurrentLink = currentLink.substr(
          0,
          currentLink.length -
            (currentLinkSplit[currentLinkSplit.length - 2].length +
              currentLinkSplit[currentLinkSplit.length - 1].length +
              2)
        );

        return itemLink === newCurrentLink;
      }

      return itemLink === currentLink;
    }

    return false;
  }

  const ItemsDrawer = () => {
    return (
      <>
        <Row>
          <Logo>
            <img alt="EAD" src={logoImg} />
          </Logo>
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon color="secondary" />
          </IconButton>
        </Row>
        <Divider />

        <List>
          {listMenu.map(item => (
            <Item
              key={item.id}
              item={item}
              checkSelected={checkSelected}
              itemMenu={itemMenu}
              setItemMenu={setItemMenu}
              itemSubMenu={itemSubMenu}
              setItemSubMenu={setItemSubMenu}
              icon={item.icon}
            />
          ))}
        </List>
      </>
    );
  };

  return (
    <>
      <Hidden smDown>
        <StyledDrawer
          variant="persistent"
          anchor="left"
          ModalProps={{
            disableScrollLock: true,
          }}
          drawerwidth={drawerWidth}
          open={visibleDrawer}
        >
          {ItemsDrawer()}
        </StyledDrawer>
      </Hidden>

      <Hidden mdUp>
        <StyledDrawer
          variant="temporary"
          anchor="left"
          drawerwidth={drawerWidth}
          open={visibleDrawer}
          onClose={handleDrawer}
          ModalProps={{
            keepMounted: true,
            disableScrollLock: true,
          }}
        >
          {ItemsDrawer()}
        </StyledDrawer>
      </Hidden>
    </>
  );
};

export default withRouter(DrawerMenu);

DrawerMenu.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
  visibleDrawer: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
