import React, { useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

interface Props {
  items: number[];
  onChange: Function;
  prefix: string;
  current?: number;
}

const Dropdown: React.FC<Props> = ({ items, onChange, prefix, current }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (current && selectRef.current) {
      selectRef.current.setAttribute('value', `${prefix} ${current}`);
    }
  }, [current]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <select
      style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}
      className={styles.select}
      value={current}
      ref={selectRef}
      onChange={handleChange}
    >
      {items
        .filter((item) => item !== 0)
        .map((item) => (
          <option
            style={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}
            className={styles.option}
            value={item}
            key={item}
          >
            {`${prefix.toUpperCase()} ${item}`}
          </option>
        ))}
    </select>
  );
};

export default Dropdown;
