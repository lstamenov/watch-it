import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollTopButton.module.css';

const ScrollTopButton: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  console.log(visible);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <>
      {children}
      <FontAwesomeIcon
        className={styles.button}
        icon={faCircleChevronUp}
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      />
    </>
  );
};

export default ScrollTopButton;
