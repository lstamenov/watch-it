import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../components/Form/Form';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import { login } from '../../store/user/thunk';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const items = [
    {
      placeholder: 'username',
      onChange: setUsername,
      value: username,
    },
    {
      placeholder: 'password',
      onChange: setPassword,
      value: password,
      isPassword: true,
    },
  ];

  const onSubmit = () => {
    dispatch(login({ username, password }));
  };

  return (
    <FormLayout title='sign in'>
      <Form btnText='sign in' inputs={items} onSubmit={onSubmit}/>
    </FormLayout>
  );
};

export default Login;