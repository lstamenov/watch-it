import { Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from './Input.module.css';

interface Props {
  value: string;
  placeholder?: string;
  onChange: Function;
  isPassword?: boolean;
}

const Input: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  isPassword = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={isFocused || value !== '' ? styles.focused : styles.wrapper}>
      <label className={styles.label}>
        <Typography>{placeholder}</Typography>
      </label>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        type={isPassword ? 'password' : 'text'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default Input;
