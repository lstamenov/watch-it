import React, { useEffect, useState } from 'react';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import Form from '../../components/Form/Form';
import Link from '../../components/Link/Link';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import useRegisterValidations from '../../hooks/useRegisterValidations';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store';
import { useAuthErrors } from '../../hooks/useAuthErrors';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { getErrorMessages, isValid } = useRegisterValidations(
    username,
    email,
    password,
    confirmPassword,
  );
  useAuthErrors();
  const { user, register } = useUser();

  useEffect(() => {
    if (user.user) {
      navigate('/');
    }
  }, [user]);

  const items = [
    {
      label: t('USERNAME'),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value),
      value: username,
    },
    {
      label: t('EMAIL'),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value),
      value: email,
    },
    {
      label: t('PASSWORD'),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
      value: password,
      isPassword: true,
    },
    {
      label: t('CONFIRM_PASSWORD'),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(event.target.value),
      value: confirmPassword,
      type: 'password',
    },
  ];

  const handleSubmit = () => {
    getErrorMessages();
    if (isValid) {
      register({ username, email, password, confirmPassword });
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatedPage isLoading={user.status === 'pending'}>
      <FormLayout title={t('SIGN_UP')}>
        <Form
          btnText={t('SIGN_UP')}
          inputs={items}
          onSubmit={handleSubmit}
          onEnter={handleEnterPress}
        />
        <Link text={t('HAS_ACCOUNT')} url="/login" />
        {user.error?.message && <ErrorMessage message={user.error.message} />}
      </FormLayout>
    </AnimatedPage>
  );
};

export default Register;
