import { MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HamburgerItem.module.css';

interface Props {
  title: string;
  path: string;
  isClicked: boolean;
  onClick: Function;
}

const HamburgerItem: React.FC<Props> = ({ title, path, isClicked, onClick }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(path);
    onClick();
  };

  return (
    <MenuItem className={isClicked ? styles.clickedItem : styles.item} onClick={onClickHandler}>
      {title}
    </MenuItem>
  );
};

export default HamburgerItem;