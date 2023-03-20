import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

  const isLoading = useAppSelector(selectLoader);
  const message = useAppSelector(selectMessage);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    setHasError(message !== '' && numberOfTries !== 0);
  }, [message, numberOfTries]);

  useEffect(() => {
    if (user || localStorage.getItem('user')) {
      navigate(path !== '/login' ? path : '/');
    }
  }, [user]);

  const items = [
    {
      placeholder: t('USERNAME'),
      onChange: setUsername,
      value: username,
    },
    {
      placeholder: t('PASSWORD'),
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
      <Helmet>
        <title>watch-it - Login</title>
        <meta
          name="description"
          content="Log in to your account and start watching everything you like"
        />
      </Helmet>
      <FormLayout title={t('SIGN_IN')}>
        <Form btnText={t('SIGN_IN')} inputs={items} onSubmit={onSubmit} />
        <Link text={t('NO_ACCOUNT')} url="/register" />
        {isLoading && <TransparentLoader />}
        {hasError && <ErrorMessage message={message} />}
      </FormLayout>
    </AnimatedPage>
  );
};

export default Login;
