import { Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectToastMessage } from '../store/toasts/selectors';

const ToastProvider: React.FC = ({ children }) => {
  const { message, type } = useAppSelector(selectToastMessage);
  const [ shouldShowMessage, setShouldShowMessage ] = useState(false);

  useEffect(() => {
    if (message) {
      setShouldShowMessage(true);
    }
  }, [message]);

  const onMessageClosed = () => setShouldShowMessage(false);

  return (
    <>
      {children}
      <Snackbar
        open={shouldShowMessage}
        autoHideDuration={6000}
        onClose={onMessageClosed}
      >
        <Alert severity={type} onClose={onMessageClosed}>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default ToastProvider;
