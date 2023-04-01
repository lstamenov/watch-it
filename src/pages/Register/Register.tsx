import React, { useEffect, useState } from 'react';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import Form from '../../components/Form/Form';
import Link from '../../components/Link/Link';
import { useAppSelector } from '../../store/hooks';
import { selectMessage, selectUser } from '../../store/user/selectors';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useDispatch } from 'react-redux';
import { register } from '../../store/user/thunk';
import { useNavigate } from 'react-router-dom';
import useRegisterValidations from '../../hooks/useRegisterValidations';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useTranslation } from 'react-i18next';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);
  const { errorMessages, isValid } = useRegisterValidations(
    username,
    email,
    password,
    confirmPassword,
  );

  const message = useAppSelector(selectMessage);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (message !== 'succes' && numberOfTries !== 0) {
      setHasError(true);
    }

    if (message === 'success') {
      setHasError(false);
      navigate('/login');
    }
  }, [message, numberOfTries]);

  useEffect(() => {
    if (user) {
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
    setNumberOfTries(numberOfTries + 1);
    if (isValid) {
      dispatch(register({ username, email, password, confirmPassword }));
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AnimatedPage>
      <FormLayout title={t('SIGN_UP')}>
        <Form
          btnText={t('SIGN_UP')}
          inputs={items}
          onSubmit={handleSubmit}
          onEnter={handleEnterPress}
        />
        <Link text={t('HAS_ACCOUNT')} url="/login" />
        {hasError && <ErrorMessage message={message} />}
        {!isValid &&
          numberOfTries !== 0 &&
          errorMessages.map((mess) => <ErrorMessage key={mess} message={mess} />)}
      </FormLayout>
    </AnimatedPage>
  );
};

export default Register;
