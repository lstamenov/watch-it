import { useEffect, useState } from 'react';
import {
  isValidEmail,
  isVaildPassword,
  isNotEmptyField,
  arePasswordsMatch,
} from '../utils/registerValidations';

const useRegisterValidations = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const currentMessages: string[] = [];

    if (!isValidEmail(email)) {
      currentMessages.push('Invalid email');
    }

    if (!isVaildPassword(password)) {
      currentMessages.push('Password must be at least 8 characters long');
    }

    if (!isNotEmptyField(username) || !isNotEmptyField(confirmPassword)) {
      currentMessages.push('There can not be empty fields');
    }

    if (!arePasswordsMatch(password, confirmPassword)) {
      currentMessages.push('Passwords do not match');
    }

    setIsValid(currentMessages.length === 0);
    setErrorMessages(currentMessages);
  }, [username, password, email, confirmPassword]);

  return { errorMessages, isValid };
};

export default useRegisterValidations;
