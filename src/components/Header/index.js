import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton, Fade, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';

import {
  StyledAppBar,
  StyledToolbar,
  Row,
  StyledIconButton,
  WrapperTitle,
  ListItemIconStyled,
  ListItemTextStyled,
  MenuItemStyled,
  MenuStyled,
} from './styles';

import { useAuth } from '~/hooks/Auth';
import history from '~/services/history';
// import Can from '~/components/Can';
// import colors from '~/styles/colors';

const Header = ({ handleDrawer, visibleDrawer, drawerWidth, location }) => {
  const splitTitle = location.pathname.split('/');

  const { user, signOut, language } = useAuth();
  const routeMaster = splitTitle[2];
  const routeMasterSubMenu = splitTitle[3];
  const subRoute = splitTitle[splitTitle.length - 2];
  const routeName = splitTitle[splitTitle.length - 1];

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [title, setTitle] = useState('');

  const menuUser = [
    {
      id: 1,
      content: language ? 'SignOut' : 'Sair',
      link: '/',
      icon: <ExitToAppIcon fontSize="small" />,
      disabled: false,
    },
  ];

  const handleClickMenuUser = useCallback(event => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseMenuUser = useCallback(
    async item => {
      if (item) {
        if (item.id === 1) {
          await signOut();
        }

        if (item.link) {
          history.push(item.link);
        }
      }

      setAnchorElUser(null);
    },
    [signOut]
  );

  useEffect(() => {
    switch (routeMaster) {
      // case 'farm': {
      //   if (routeMaster !== routeName) {
      //     if (routeName === 'add') {
      //       setTitle('Cadastrar Fazenda');
      //     } else {
      //       setTitle('Editar Fazenda');
      //     }
      //   } else {
      //     setTitle('Fazendas');
      //   }

      //   break;
      // }
      default:
        setTitle('Dashboard');
        break;
    }
  }, [routeMaster, routeMasterSubMenu, routeName, splitTitle, subRoute]);

  return (
    <StyledAppBar
      position="fixed"
      drawerwidth={drawerWidth}
      visible={visibleDrawer ? 1 : 0}
      width={{
        sm: '100%',
        md: visibleDrawer ? `calc(100% - ${drawerWidth}px)` : '100%',
      }}
    >
      <StyledToolbar>
        <Row>
          <StyledIconButton
            color="secondary"
            onClick={handleDrawer}
            edge="start"
            visible={visibleDrawer ? 1 : 0}
          >
            <MenuIcon color="secondary" />
          </StyledIconButton>
          <WrapperTitle>
            <Typography variant="h6" color="secondary" noWrap display="block">
              {title}
            </Typography>
          </WrapperTitle>
        </Row>

        <Row>
          <IconButton
            edge="end"
            aria-label="Conta de usuário"
            aria-haspopup="true"
            onClick={handleClickMenuUser}
            color="secondary"
          >
            {user.avatar ? (
              <Avatar
                src={user.avatar}
                alt={user.name}
                style={{ height: '1.3em', width: '1.3em' }}
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>

          <MenuStyled
            id="fade-menu"
            anchorEl={anchorElUser}
            keepMounted
            disableScrollLock
            open={Boolean(anchorElUser)}
            onClose={() => handleCloseMenuUser()}
            TransitionComponent={Fade}
            elevation={2}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {menuUser.map(item => (
              <div key={item.id}>
                <MenuItemStyled
                  disabled={item.disabled}
                  onClick={() => handleCloseMenuUser(item)}
                >
                  <ListItemIconStyled>{item.icon}</ListItemIconStyled>
                  <ListItemTextStyled
                    primary={item.content}
                    color="secondary"
                  />
                </MenuItemStyled>
              </div>
            ))}
          </MenuStyled>
        </Row>
      </StyledToolbar>
    </StyledAppBar>
  );
};

Header.propTypes = {
  handleDrawer: PropTypes.func.isRequired,
  visibleDrawer: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Header);
