import React, { useEffect, useLayoutEffect, useState } from 'react';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import Form from '../../components/Form/Form';
import Link from '../../components/Link/Link';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { selectMessage, selectUser } from '../../store/user/selectors';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import TransparentLoader from '../../components/TransparentLoader/TransparentLoader';
import { useDispatch } from 'react-redux';
import { register } from '../../store/user/thunk';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

  const isLoading = useAppSelector(selectLoader);
  const message = useAppSelector(selectMessage);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setHasError(message !== '' && numberOfTries !== 0 ? true : false);
  }, [message, numberOfTries]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    setHasError(message !== '' && numberOfTries !== 0 ? true : false);
  }, [message, numberOfTries]);

  useLayoutEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

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

  const onSubmit = async () => {
    setNumberOfTries(numberOfTries + 1);
    dispatch(register({ username, email, password, confirmPassword }));
  };

  return (
    <FormLayout title='sign up'>
      <Form btnText='sign up' inputs={items} onSubmit={onSubmit}/>
      <Link text={'Already have an account?'} url='/login' />
      {isLoading && <TransparentLoader />}
      {hasError && <ErrorMessage message={message} />}
    </FormLayout>
  );
};

export default Register;