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
  shouldTriggerValidations: boolean,
) => {
  const [isValid, setIsValid] = useState(false);
  const { pushMessage } = useContext(ToastContext);
  const { t } = useTranslation();

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

    if (currentMessages.length > 0 && shouldTriggerValidations) {
      pushMessage(currentMessages[0], 'error');
    }
  };

  useEffect(() => {
    getErrorMessages();
  }, [username, password, email, confirmPassword, shouldTriggerValidations]);

  return { isValid };
};

export default useRegisterValidations;
