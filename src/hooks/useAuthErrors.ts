import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../providers/ToastProvider';
import { useUser } from '../store';

export const useAuthErrors = () => {
  const { t } = useTranslation();
  const { pushMessage } = useContext(ToastContext);
  const {
    user: { error },
  } = useUser();

  useEffect(() => {
    if (error?.message) {
      pushMessage(t(error.message), 'error');
    }
  }, [error]);
};
