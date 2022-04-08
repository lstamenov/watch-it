import React from 'react';
import FormButton from '../FormButton/FormButton';
import Input from '../Input/Input';
import styles from './Form.module.css';

interface Props {
  inputs: {
    placeholder: string;
    value: string;
    onChange: Function;
    isPassword?: boolean;
  }[];
  btnText: string;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}

const Form: React.FC<Props> = ({ inputs, btnText, onSubmit }) => (
  <form className={styles.form} autoComplete='off'>
    {inputs.map(item => <Input key={item.placeholder} {...item} />)}
    <FormButton text={btnText} onClick={onSubmit}/>
  </form>
);

export default Form;