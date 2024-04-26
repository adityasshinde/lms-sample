import React from 'react';
import { Button } from '@mui/material';

const NormalButton = ({ text, onClick, type }) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      sx={{
        backgroundImage: 'white',
        color: '#2B527A',
        padding: '8px 24px',
        margin: '0',
        width:'100%',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize:'1rem',
        textTransform: 'none',
        fontFamily: 'inherit',

        // Disable hover effect
        '&:hover': {
          backgroundColor: 'white',
        color: '#2B527A',
        }
      }}
    >
      {text}
    </Button>
  );
};

export default NormalButton;
