import React, { useEffect, useState } from 'react';
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
import useRegisterValidations from '../../hooks/useRegisterValidations';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);
  const { errorMessages, isValid } = useRegisterValidations(username, email, password, confirmPassword);

  const isLoading = useAppSelector(selectLoader);
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
    setNumberOfTries(numberOfTries + 1);
    if (isValid) {
      dispatch(register({ username, email, password, confirmPassword }));
    }
  };

  return (
    <FormLayout title='sign up'>
      <Form btnText='sign up' inputs={items} onSubmit={onSubmit}/>
      <Link text={'Already have an account?'} url='/login' />
      {isLoading && <TransparentLoader />}
      {hasError && <ErrorMessage message={message} />}
      {(!isValid && numberOfTries !== 0) && errorMessages.map(mess => <ErrorMessage key={mess} message={mess} />)}
    </FormLayout>
  );
};

export default Register;