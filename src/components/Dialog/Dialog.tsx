import React from 'react';
import { Modal, Fade, Box, Backdrop } from '@mui/material';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Dialog.module.css';

interface Props {
  isClicked: boolean;
  setIsClicked: Function;
  className: string;
}

const Dialog: React.FC<Props> = ({ isClicked, setIsClicked, className, children }) => (
  <Modal
    open={isClicked}
    onClose={() => setIsClicked(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={isClicked}>
      <Box className={className}>
        <FontAwesomeIcon
          onClick={() => setIsClicked(false)}
          className={styles.xIcon}
          color="#b45177"
          size={'3x'}
          icon={faXmark}
        />
        {children}
      </Box>
    </Fade>
  </Modal>
);

export default Dialog;