import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const DonutChart = ({ progress, thickness,color, size,fontSize,text,number }) => {
  return (
    <Box sx={{ position: 'relative', display:'flex',alignItems:'center',margin:'10px'}}>
      <CircularProgress   sx={{color:color?color:'#207EB8',strokeLinecap:'round'}} variant="determinate" value={progress} thickness={thickness} size={size}/>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="caption" sx={{color:color?'black':'#207EB8',fontWeight:'bold',fontSize:fontSize,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} component="div" color="textSecondary">
          {(number)?<>{number}<br/><span style={{color:'#4b4b4d', fontWeight:'300',fontSize:'0.6rem',textAlign:'center'}}>{text}</span></>
          :<>{`${Math.round(progress)}%`}</>}
          </Typography>
      </Box>
    </Box>
  );
};

export default DonutChart;
