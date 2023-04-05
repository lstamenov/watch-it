import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../providers/ToastProvider';
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
  const [isValid, setIsValid] = useState(false);
  const { pushMessage } = useContext(ToastContext);
  const { t } = useTranslation();

  useEffect(() => {}, [username, password, email, confirmPassword]);

  const getErrorMessages = () => {
    const currentMessages: string[] = [];

    if (!isValidEmail(email)) {
      currentMessages.push(t('INVALID_EMAIL'));
    }

    if (!isVaildPassword(password)) {
      currentMessages.push(t('REGISTRATION_INVALID_PASSWORD'));
    }

    if (!isNotEmptyField(username) || !isNotEmptyField(confirmPassword)) {
      currentMessages.push(t('NO_EMPTY_FIELDS'));
    }

    if (!arePasswordsMatch(password, confirmPassword)) {
      currentMessages.push(t('PASSWORDS_MATCH_ERROR'));
    }

    setIsValid(currentMessages.length === 0);

    if (!isValid) {
      pushMessage(currentMessages[0], 'error');
    }
  };

  return { isValid, getErrorMessages };
};

export default useRegisterValidations;
