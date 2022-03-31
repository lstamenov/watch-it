import React, { useRef, useState } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CarouselProps } from './types';
import { Grid, StyledEngineProvider, Typography } from '@mui/material';
import styles from './Carousel.module.css';

const Carousel: React.FC<CarouselProps> = ({
  title,
  isTransparent = false,
  children,
}) => {
  const contentElement = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  const scrollLeftHandler = (): void => {
    const contentWrapper = contentElement.current;

    if (!contentWrapper) return;

    contentWrapper.scrollTo({
      top: 0,
      left: scrollAmount - 210,
      behavior: 'smooth',
    });

    setScrollAmount(scrollAmount - 210);

    if (scrollAmount < 0) {
      setScrollAmount(0);
    }
  };

  const scrollRightHandler = (): void => {
    const contentWrapper = contentElement.current;

    if (!contentWrapper) return;

    if (scrollAmount >= 2505) {
      contentWrapper.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setScrollAmount(0);
    } else {
      contentWrapper.scrollTo({
        top: 0,
        left: scrollAmount + 210,
        behavior: 'smooth',
      });

      setScrollAmount(scrollAmount + 210);
    }

    if (scrollAmount >= 2505) {
      setScrollAmount(0);
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.carouselWrapper}>
        <Typography className={styles.title} variant="h4" color="white">
          {title}
        </Typography>
        <Grid container className={styles.carousel}>
          <div
            onClick={scrollLeftHandler}
            className={
              isTransparent
                ? styles.transparentLeftArrow
                : styles.leftArrowWrapper
            }
          >
            <FontAwesomeIcon className={styles.arrow} icon={faAngleLeft} />
          </div>
          <div ref={contentElement} className={styles.content}>
            {children}
          </div>
          <div
            onClick={scrollRightHandler}
            className={
              isTransparent
                ? styles.transparentRightArrow
                : styles.rightArrowWrapper
            }
          >
            <FontAwesomeIcon className={styles.arrow} icon={faAngleRight} />
          </div>
        </Grid>
      </div>
    </StyledEngineProvider>
  );
};

export default Carousel;
