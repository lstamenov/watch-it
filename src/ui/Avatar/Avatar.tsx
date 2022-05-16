import React from 'react';
import { default as AvatarUI } from '@mui/material/Avatar';
import styles from './Avatar.module.css';

interface Props {
  src: string;
  onClick?: () => void;
}

export const Avatar: React.FC<Props> = ({ src, onClick }) => {
  if (src?.length > 1 && onClick) {
    return <div onClick={onClick}>
      <AvatarUI className={styles.avatar} src={src} />
    </div>;
  }

  if (src.length > 1) {
    return <AvatarUI className={styles.avatar} src={src} />;
  }

  return <AvatarUI className={styles.avatar}>{src}</AvatarUI>;
};

export default Avatar;
