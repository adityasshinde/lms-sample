import { Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const QuestionResponse = ({ responses }) => {
    const getStatusColor = (status) => {
        if (status === 'Correct') {
            return '#008001';
        } else if (status === 'Incorrect') {
            return '#cf0000';
        } else {
            return '#FBA63C';
        }
    }
    return (
        <div className='my-8 w-[90%]'>
            <Typography variant="h4" gutterBottom textAlign='left' mb={2}>
                Test Questions Review
            </Typography>
            <div style={{ display: 'flex',flexDirection:'column', width: '100%' }}>
               {responses?.map((response,index)=>(
                 <Card sx={{my:'1rem'}} key={index}>
                 <div>
                     <Typography sx={{ color: '#85878D', fontSize: '1rem', fontWeight: 'bold' }}>Question {index+1} of {responses?.length}</Typography>
                     <Box sx={{ fontSize: '1rem', fontWeight: 'bold', my: '1rem' }}>
                         <div dangerouslySetInnerHTML={{ __html: response?.questionText }} />
                         {response?.questionImage && <img className='my-2' src={response?.questionImage} />}
                     </Box>
                     <Box sx={{ fontSize: '1rem', fontWeight: 'bold', my: '1rem' }}>
                     <Typography sx={{ color: '#85878D', fontSize: '1rem', fontWeight: 'bold',my:'15px' }}>Your Answer: <div dangerouslySetInnerHTML={{ __html: response?.userAnswer }} /></Typography>
                     <Typography sx={{ color: '#85878D', fontSize: '1rem', fontWeight: 'bold',my:'15px' }}>Correct Answer: <div dangerouslySetInnerHTML={{ __html: response?.correctAnswer }} /></Typography>
                     <Typography sx={{ color: '#85878D', fontSize: '1rem', fontWeight: 'bold',my:'15px' }}>Status: <span style={{color:getStatusColor(response?.status)}}>{response?.status}</span></Typography>
                     </Box>
                 </div>
             </Card>)
             )}
            </div>
        </div>
    )
}

export default QuestionResponse;