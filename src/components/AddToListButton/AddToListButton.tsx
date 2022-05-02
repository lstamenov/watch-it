import React, { useState } from 'react';

interface Props {
  children: (props: {
    onClick: () => void;
    shouldShowMessage: boolean;
    onMessageClosed: () => void;
  }) => JSX.Element;
}

const AddToListButton: React.FC<Props> = ({ children }) => {
  const [shouldShowMessage, setShouldShowMessage] = useState(false);

  const handleClick = () => setShouldShowMessage(true);

  const handleCloseMessage = () => setShouldShowMessage(false);
  
  return children({
    onClick: handleClick,
    shouldShowMessage,
    onMessageClosed: handleCloseMessage,
  });
};

export default AddToListButton;
