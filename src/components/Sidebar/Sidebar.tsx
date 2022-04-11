import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import HamburgerItem from '../HamburgerItem/HamburgerItem';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Sidebar.module.css';

interface Props {
  items: {
    title: string,
    path: string,
    isClicked: boolean,
  }[];
}

const Sidebar: React.FC<Props> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };

  const list = () => (
    <Box
      sx={{ backgroundColor: '#4F4F4F' }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {items.map(item => <HamburgerItem key={item.title} {...item} />)}
      </List>
    </Box>
  );

  return (
    <div>
          <FontAwesomeIcon
          onClick={toggleDrawer()}
          className={styles.menu}
          icon={faBars}
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded="false"
        /> 
          <Drawer
            anchor={'bottom'}
            open={isOpen}
            onClose={toggleDrawer()}
          >
            {list()}
          </Drawer>
    </div>
  );
};

export default Sidebar;
