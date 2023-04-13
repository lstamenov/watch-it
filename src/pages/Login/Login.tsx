import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import Link from '../../components/Link/Link';
import { useAuthErrors } from '../../hooks/useAuthErrors';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import { useUser } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';

const Login: React.FC = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  useAuthErrors();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.user) {
      navigate(path !== 'login' ? path : '/');
    }
  }, [user]);

  const items = [
    {
      label: t('USERNAME'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
      value: username,
    },
    {
      label: t('PASSWORD'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      value: password,
      type: 'password',
    },
  ];

  const handleSubmit = async () => {
    login({ username, password });
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatedPage isLoading={user.status === 'pending'}>
      <Helmet>
        <title>watch365 - {t('SIGN_IN')}</title>
        <meta name="description" content={t('SIGN_IN') || ''} />
      </Helmet>
      <FormLayout title={t('SIGN_IN')}>
        <Form
          onEnter={handlePressEnter}
          btnText={t('SIGN_IN')}
          inputs={items}
          onSubmit={handleSubmit}
        />
        <Link text={t('NO_ACCOUNT')} url="/register" />
      </FormLayout>
    </AnimatedPage>
  );
};

export default Login;
