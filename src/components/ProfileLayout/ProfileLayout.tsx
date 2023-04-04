import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../store';

interface Props {
  avatar: string;
  username: string;
  children: (props: {
    avatar: string;
    username: string;
    onAvatarClick: () => void;
    onPickAvatarClick: (src: string) => void;
    onAvatarsModalClose: () => void;
    handleLogout: () => void;
    shouldOpenAvatarsModal: boolean;
  }) => JSX.Element;
}

export const ProfileLayout: React.FC<Props> = ({ avatar, username, children }) => {
  const { changeAvatar, authenticate } = useUser();
  const navigate = useNavigate();
  const [shouldOpenAvatarsModal, setShouldOpenAvatarsModel] = useState(false);

  const handleAvatarClick = () => {
    setShouldOpenAvatarsModel(true);
  };

  const handlePickAvatar = (src: string) => {
    setShouldOpenAvatarsModel(false);
    changeAvatar(src);
  };

  const handleAvatarsModalClosed = () => setShouldOpenAvatarsModel(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    authenticate();
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return children({
    avatar,
    username,
    onAvatarClick: handleAvatarClick,
    shouldOpenAvatarsModal,
    onPickAvatarClick: handlePickAvatar,
    onAvatarsModalClose: handleAvatarsModalClosed,
    handleLogout,
  });
};

export default ProfileLayout;
