import React from 'react';
import { Typography } from '@mui/material';
import styles from './Input.module.css';

type Props = {
  value: string;
  label: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ value, label, onChange, onEnter, type = 'text' }) => {
  return (
    <div className={styles.wrapper}>
      <label>
        <Typography className={styles.label}>{label}</Typography>
      </label>
      <input
        className={styles.input}
        onKeyPress={onEnter}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
