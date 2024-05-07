import React from 'react'
import WithScrollAnimation from './WithScrollAnimation';
import { Box } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { IconPlaystationTriangle } from '@tabler/icons';

const PromoVideo = () => {
    return (
        <WithScrollAnimation>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',mb:'5rem'}}>
                <Typography fontWeight={900} sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'start', letterSpacing: '2px', fontSize: '36px', textAlign: 'left', lineHeight: '35px', my: '2rem' }}>
                    <Divider sx={{ width: "300px", ml: '1rem', height: "2px", mr: '1rem', backgroundColor: "white" }} /> Our Success Story <Divider sx={{ width: "300px", ml: '1rem', height: "2px", backgroundColor: "white" }} />
                </Typography>
                <Typography variant="body1" color="white" sx={{ textAlign: 'center', fontWeight: '400', fontSize: '20px', lineHeight: '30px', mb: '2rem' }}>
                Lorem ipsum dolor sit amet consectetur. Pulvinar et pulvinar enim<br/> pharetra condimentum viverra.
                </Typography>
                <div style={{width:'80%',height:'400px',backgroundColor:'#1B1A55',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <IconPlaystationTriangle style={{ transform: "rotate(-30deg)", marginRight: '10px',cursor:'pointer' }} color='#6874BB' size={60} stroke={1.5} />
                </div>
                {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width='80%' height='400px' controls={true} /> */}
            </Box>
        </WithScrollAnimation>
    )
}

export default PromoVideo;