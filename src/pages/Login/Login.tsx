import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from '../../components/Form/Form';
import Link from '../../components/Link/Link';
import TransparentLoader from '../../components/TransparentLoader/TransparentLoader';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { selectMessage, selectUser } from '../../store/user/selectors';
import { login } from '../../store/user/thunk';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

  const isLoading = useAppSelector(selectLoader);
  const message = useAppSelector(selectMessage);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setHasError(message !== '' && numberOfTries !== 0 ? true : false);
  }, [message, numberOfTries]);

  useEffect(() => {
    if (user || localStorage.getItem('user')) {
      navigate(path !== '/login' ? path : '/');
    }
  }, [user]);

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

  const onSubmit = async () => {
    setNumberOfTries(numberOfTries + 1);
    dispatch(login({ username, password }));
  };

  return (
    <AnimatedPage>
      <FormLayout title='sign in'>
        <Form btnText='sign in' inputs={items} onSubmit={onSubmit} />
        <Link text={'Don\'t have an account?'} url='/register' />
        {isLoading && <TransparentLoader />}
        {hasError && <ErrorMessage message={message} />}
      </FormLayout>
    </AnimatedPage>
  );
};

export default Login;