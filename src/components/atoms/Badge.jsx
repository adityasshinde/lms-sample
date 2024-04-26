import { Typography } from '@mui/material';
import React from 'react'

const Badge = ({type}) => {
    let color = '';
    let bgColor = '';
    if(type === 'Ongoing'){
        color = '#005AE9';
        bgColor = '#005AE918';
    }
    else if(type === 'Completed'){
        color = '#22933B';
        bgColor = '#22933B18';
    }
    else{
        color = '#F59158';
        bgColor = '#F5915818';
    }
  return (
    <Typography component='span' sx={{bgcolor:bgColor,color:color,px:'10px',py:'6px',borderRadius:'16px'}}>{type}</Typography>
  )
}

export default Badge;