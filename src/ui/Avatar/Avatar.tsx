import React from 'react';
import { default as AvatarUI } from '@mui/material/Avatar';
import styles from './Avatar.module.css';

interface Props {
  src: string;
  onClick?: () => void;
  isOnHeader?: boolean;
  hasMarginLeft?: boolean;
}

export const Avatar: React.FC<Props> = ({
  src,
  onClick,
  isOnHeader = false,
  hasMarginLeft = false,
}) => {
  return (
    <div style={hasMarginLeft ? { marginLeft: '20px' } : undefined} onClick={onClick}>
      <AvatarUI className={isOnHeader ? styles.headerAvatar : styles.avatar} src={src} />
    </div>
  );
};

export default Avatar;
