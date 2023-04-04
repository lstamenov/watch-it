import { Snackbar, Alert } from '@mui/material';
import React, { createContext, useCallback, useEffect, useState } from 'react';

type MessageType = 'success' | 'warning' | 'error';

type ToastContextType = {
  pushMessage: (message: string, type: MessageType) => void;
};

export const ToastContext = createContext<ToastContextType>({ pushMessage: () => {} });

const ToastProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<{ message: string; type: MessageType } | null>(null);
  const [shouldShowMessage, setShouldShowMessage] = useState(false);

  const onMessagePush = useCallback((toastMessage: string, type: MessageType) => {
    setMessage({ message: toastMessage, type });
  }, []);

  useEffect(() => {
    if (message) {
      setShouldShowMessage(true);
    }
  }, [message]);

  const onMessageClosed = () => setShouldShowMessage(false);

  return (
    <ToastContext.Provider value={{ pushMessage: onMessagePush }}>
      {children}
      <Snackbar open={shouldShowMessage} autoHideDuration={6000} onClose={onMessageClosed}>
        <Alert severity={message?.type} onClose={onMessageClosed}>
          {message?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
