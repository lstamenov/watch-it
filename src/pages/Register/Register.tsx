import React, { useState } from 'react';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import Form from '../../components/Form/Form';
import { useDispatch } from 'react-redux';
import { register } from '../../store/user/thunk';

const Register: React.FC = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const items = [
    {
      placeholder: 'username',
      onChange: setUsername,
      value: username,
    },
    {
      placeholder: 'email',
      onChange: setEmail,
      value: email,
    },
    {
      placeholder: 'password',
      onChange: setPassword,
      value: password,
      isPassword: true,
    },
    {
      placeholder: 'confirm password',
      onChange: setConfirmPassword,
      value: confirmPassword,
      isPassword: true,
    },
  ];

  const onSubmit = () => {
    dispatch(register({ username, email, password, confirmPassword }));
  };

  return (
    <FormLayout title='sign up'>
      <Form btnText='sign up' inputs={items} onSubmit={onSubmit}/>
    </FormLayout>
  );
};

export default Register;