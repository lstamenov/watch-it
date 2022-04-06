import React from 'react';
import { Button } from '@mui/material';
import styles from './FormButton.module.css';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const FormButton: React.FC<Props> = ({ onClick, text }) => (
  <Button className={styles.btn} variant="contained" onClick={onClick}>
    {text}
  </Button>
);

export default FormButton;
