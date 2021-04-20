import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { StyledListItem, StyledListItemSub, IconImg } from './styles';

import history from '~/services/history';

const Item = ({
  item,
  checkSelected,
  setItemMenu,
  itemMenu,
  setItemSubMenu,
  itemSubMenu,
  icon,
}) => {
  const [collapse, setCollapse] = useState(false);
  const [subCollapse, setSubCollapse] = useState(false);

  const handleNav = link => {
    if (link === '/dashboard') {
      setItemMenu(0);
    }

    history.push(link);
  };

  const handleCollapse = ({ id }) => {
    if (itemMenu === id) {
      setItemMenu(0);
    } else {
      setItemMenu(id);
    }

    setItemSubMenu(null);
  };

  const handleSubCollapse = ({ id }) => {
    if (itemSubMenu === id) {
      setItemSubMenu(null);
    } else {
      setItemSubMenu(id);
    }
  };

  useEffect(() => {
    if (itemMenu === item.id) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  }, [item, item.id, itemMenu]);

  useEffect(() => {
    if (item.itens && item.id === itemMenu) {
      const currentSubMenu = item.itens.find(
        it => it.id === itemSubMenu && it.itens
      );

      if (currentSubMenu) {
        setSubCollapse(true);
      } else {
        setSubCollapse(false);
      }
    }
  }, [item, itemMenu, itemSubMenu]);

  return (
    <div key={item.id}>
      {!item.itens ? (
        <List component="div" disablePadding>
          <ListItem
            button
            selected={checkSelected(item.link)}
            disabled={item.disabled}
            onClick={() => handleNav(item.link)}
          >
            <IconImg>
              <img src={icon} alt="logo" />
            </IconImg>
            <ListItemText primary={item.name} />
          </ListItem>
        </List>
      ) : (
        <>
          <ListItem button onClick={() => handleCollapse(item)}>
            <IconImg>
              <img src={icon} alt="logo" />
            </IconImg>
            <ListItemText primary={item.name} />
            {collapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.itens.map(subItem => (
                <div key={subItem.id}>
                  {subItem.itens ? (
                    <>
                      <StyledListItem
                        key={subItem.id}
                        selected={checkSelected(subItem.link)}
                        disabled={subItem.disabled}
                        button
                        onClick={() => handleSubCollapse(subItem)}
                      >
                        <ListItemText primary={subItem.name} />
                        {subCollapse ? <ExpandLess /> : <ExpandMore />}
                      </StyledListItem>

                      <Collapse in={subCollapse} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {subItem.itens.map(itemSubItem => (
                            <StyledListItemSub
                              key={itemSubItem.id}
                              button
                              selected={checkSelected(itemSubItem.link)}
                              disabled={itemSubItem.disabled}
                              onClick={() => handleNav(itemSubItem.link)}
                            >
                              <ListItemText primary={itemSubItem.name} />
                            </StyledListItemSub>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <StyledListItem
                      button
                      key={subItem.id}
                      selected={checkSelected(subItem.link)}
                      disabled={subItem.disabled}
                      onClick={() => handleNav(subItem.link)}
                    >
                      <ListItemText primary={subItem.name} />
                    </StyledListItem>
                  )}
                </div>
              ))}
            </List>
          </Collapse>
        </>
      )}
    </div>
  );
};

Item.defaultProps = {
  itemSubMenu: null,
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    link: PropTypes.string,
    disabled: PropTypes.bool,
    itens: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  checkSelected: PropTypes.func.isRequired,
  setItemMenu: PropTypes.func.isRequired,
  itemMenu: PropTypes.number.isRequired,
  setItemSubMenu: PropTypes.func.isRequired,
  itemSubMenu: PropTypes.number,
  icon: PropTypes.string.isRequired,
};

export default Item;
