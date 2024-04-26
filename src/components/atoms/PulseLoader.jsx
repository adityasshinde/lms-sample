import React from 'react';
import CompanyLogo from '../../asset/images/logo-circle.png'; 
import { Grid } from '@mui/material';
import pulse from '../../asset/Animations/pulse.json'; 
import Lottie from 'lottie-react';

const PulseLoader = () => {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            25% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(1);
            }
            75% {
              transform: scale(1.2);
            }
            100% {
              transform: scale(1);
            }
          }
          .logo {
            width: 50px; /* Adjust size as needed */
            height: 50px; /* Adjust size as needed */
            animation: pulse 2000ms ease-in-out infinite;
          }
        `}
      </style>
      <img
        src={CompanyLogo}
        alt="Company Logo"
        className="logo"
        style={{ zIndex: 2 }}
      />
      <Lottie animationData={pulse} style={{width:'150px',position:'absolute',top:'40%',left:'45%',zIndex:0}} />
    </Grid>
  );
};

export default PulseLoader;
