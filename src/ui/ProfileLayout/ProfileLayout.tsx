import { Button, Typography } from '@mui/material';
import React from 'react';
import Dialog from '../../components/Dialog/Dialog';
import Avatar from '../Avatar/Avatar';
import avatars from '../../utils/avatars';
import styles from './ProfileLayout.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
  avatar: string;
  username: string;
  onAvatarClick: () => void;
  onPickAvatarClick: (src: string) => void;
  handleLogout: () => void;
  onAvatarsModalClose: () => void;
  shouldOpenAvatarsModal: boolean;
}

export const ProfileLayout: React.FC<Props> = ({
  avatar,
  username,
  handleLogout,
  onAvatarClick,
  onPickAvatarClick,
  onAvatarsModalClose,
  shouldOpenAvatarsModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <Avatar onClick={onAvatarClick} src={avatar || ''} />
          <Typography color='#AA7489' variant='h5'>@{username}</Typography>
        </div>
        <Button className={styles.btn} variant='contained' onClick={onAvatarClick}>{t('CHANGE_AVATAR')}</Button>
        <Button className={styles.btn} variant='contained' onClick={handleLogout}>{t('LOG_OUT')}</Button>
      </div>
      <Dialog className={styles.modal} isClicked={shouldOpenAvatarsModal} onClose={onAvatarsModalClose}>
        <div className={styles.avatarsContainer}>
          {avatars.map(a => <Avatar key={a} src={a} onClick={() => onPickAvatarClick(a)} />)}
        </div>
      </Dialog>
    </div>
  );
};

export default ProfileLayout;
