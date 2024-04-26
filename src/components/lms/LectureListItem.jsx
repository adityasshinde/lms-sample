import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography } from '@mui/material';
import GradientButton from '../form/GradientButton';
import {  IconPlaystationTriangle } from '@tabler/icons';
import { Link } from 'react-router-dom';

const LectureListItem = ({ lectureName, lectureImage, subjectId }) => {
  const resumeUrl=`subject/${subjectId}`;
  return (
    <ListItem sx={{my:'1rem',cursor:'pointer',py:'20px',":hover":{bgcolor:'#207EB818'},display:'flex',justifyContent:'space-between',alignItems:'center',width:{xs:'100%',md:'50%'},border:'1px solid #4B4B4D17',borderRadius:'8px',boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
      <div className='flex items-center'>
      <ListItemAvatar>
        <Avatar alt={lectureName} src={lectureImage} />
      </ListItemAvatar>
      <Typography sx={{fontWeight:'bold'}} >{lectureName}</Typography>
      </div>
      <Link to={resumeUrl} style={{width:'120px'}}>
      <GradientButton startIcon={<IconPlaystationTriangle style={{ transform: "rotate(-30deg)"}} size={24} stroke={1.5} />} text='Resume' />
      </Link>
    </ListItem>
  );
};

export default LectureListItem;
