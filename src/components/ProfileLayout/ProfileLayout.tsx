import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, changeAvatar } from '../../store/user/thunk';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shouldOpenAvatarsModal, setShouldOpenAvatarsModel] = useState(false);
  
  const handleAvatarClick = () => {
    setShouldOpenAvatarsModel(true);
  };

  const handlePickAvatar = (src: string) => {
    setShouldOpenAvatarsModel(false);
    dispatch(changeAvatar(src));
  };

  const handleAvatarsModalClosed = () => setShouldOpenAvatarsModel(false);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    dispatch(auth());
    setTimeout(() => {
      navigate('/login');
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
