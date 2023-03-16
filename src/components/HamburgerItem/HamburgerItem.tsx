import { MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HamburgerItem.module.css';

interface Props {
  title: string;
  path: string;
  isClicked: boolean;
}

const HamburgerItem: React.FC<Props> = ({ title, path, isClicked }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(path);
  };

  return (
    <MenuItem className={isClicked ? styles.clickedItem : styles.item} onClick={onClickHandler}>
      {title}
    </MenuItem>
  );
};

export default HamburgerItem;
