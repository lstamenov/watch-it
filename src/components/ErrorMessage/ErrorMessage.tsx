import { Typography } from '@mui/material';
import React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => <Typography color='red' style={{ textAlign: 'center' }} variant='body1'>{message}</Typography>;

export default ErrorMessage;