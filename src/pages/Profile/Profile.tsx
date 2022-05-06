import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/user/thunk';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onClick = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/login');   
    }, 500);
  };

  return (
    <AnimatedPage>
      <div style={{ margin: '100px' }}>
        <Button variant='outlined' onClick={onClick}>LOGOUT</Button>
      </div>
    </AnimatedPage>
  );
};

export default Profile;