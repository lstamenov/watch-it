import { Button, Typography } from '@mui/material';
import React from 'react';

type Props = { title: string; onClick: () => void };

const AutoCompleteResult: React.FC<Props> = ({ title, onClick }) => {
  return (
    <Button sx={{ width: '100%', textAlign: 'left', color: 'white' }} onClick={onClick}>
      <Typography sx={{ width: '100%' }}>{title}</Typography>
    </Button>
  );
};

export default AutoCompleteResult;
