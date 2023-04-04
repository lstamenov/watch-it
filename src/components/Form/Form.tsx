import React from 'react';
import Input from '../../ui/Input/Input';
import FormButton from '../FormButton/FormButton';
import styles from './Form.module.css';

interface Props {
  inputs: {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isPassword?: boolean;
    type?: string;
  }[];
  btnText: string;
  onEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const Form: React.FC<Props> = ({ inputs, btnText, onSubmit, onEnter }) => (
  <form className={styles.form} autoComplete="off">
    {inputs.map((item) => (
      <Input key={item.label} {...item} onEnter={onEnter} />
    ))}
    <FormButton text={btnText} onClick={onSubmit} />
  </form>
);

export default Form;
