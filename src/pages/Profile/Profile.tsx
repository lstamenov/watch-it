import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/user/thunk';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onClick = () => {
    dispatch(logout());
    navigate('/');    
  };

  return (
    <div style={{ margin: '100px' }}>
      <Button variant='outlined' onClick={onClick}>LOGOUT</Button>
    </div>
  );
};

export default Profile;