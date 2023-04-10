import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useAuthErrors } from '../../hooks/useAuthErrors';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import { ToastContext } from '../../providers/ToastProvider';
import { useUser } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { isVaildPassword } from '../../utils/registerValidations';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { pushMessage } = useContext(ToastContext);
  const {
    changePassword,
    user: { changePasswordStatus, user },
  } = useUser();
  const { t } = useTranslation();
  useAuthErrors();

  if (!user) return null;

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  useEffect(() => {
    if (changePasswordStatus === 'fulfilled') {
      navigate('/profile');
    }
  }, [changePasswordStatus]);

  const items = [
    {
      label: t('CURRENT_PASSWORD'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value),
      value: oldPassword,
      type: 'password',
    },
    {
      label: t('NEW_PASSWORD'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value),
      value: newPassword,
      type: 'password',
    },
    {
      label: t('CONFIRM_NEW_PASSWORD'),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value),
      value: confirmNewPassword,
      type: 'password',
    },
  ];

  const isNewPasswordValid = () => {
    if (newPassword !== confirmNewPassword) {
      pushMessage(t('PASSWORDS_MATCH_ERROR'), 'error');
      return false;
    }

    if (!isVaildPassword(newPassword)) {
      pushMessage(t('REGISTRATION_INVALID_PASSWORD'), 'error');
      return false;
    }

    return true;
  };

  const handleChangePassword = () => {
    if (isNewPasswordValid()) {
      changePassword(oldPassword, newPassword);
    }
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleChangePassword();
    }
  };

  return (
    <AnimatedPage isLoading={changePasswordStatus === 'pending'}>
      <FormLayout title={t('CHANGE_PASSWORD')}>
        <Form
          onEnter={handlePressEnter}
          onSubmit={handleChangePassword}
          inputs={items}
          btnText={t('CHANGE_PASSWORD')}
        />
      </FormLayout>
    </AnimatedPage>
  );
};

export default ChangePassword;
