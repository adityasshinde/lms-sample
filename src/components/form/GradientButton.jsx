import React from 'react';
import { Button } from '@mui/material';

const GradientButton = ({ text, onClick, type,disable,endIcon,startIcon}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disable}
      sx={{
        backgroundImage: 'linear-gradient(to right, #2B527A, #207EB8)',
        color: 'white !important',
        padding: '8px 24px',
        margin: '0',
        width:'100%',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize:'1rem',
        textTransform: 'none',
        fontFamily: 'inherit',
        opacity: disable ? 0.6 : 1,
        cursor: 'pointer',
      }}
      endIcon={endIcon?endIcon:null}
      startIcon={startIcon?startIcon:null}
    >
      {text}
    </Button>
  );
};

export default GradientButton;
