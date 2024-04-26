import { Button, Typography, Dialog, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { IconCircle } from '@tabler/icons';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import successAnimation from '../../asset/Animations/success.json';
import { useNavigate } from 'react-router-dom';


const SubmitTest = ({ open, total, answered, unAnswered, markedForReview, SubmitTest, CancelSubmit, status }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'SUCCESS') {
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [status]);
  return (
    <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
      {status === "PENDING" && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <Typography sx={{ color: 'black', margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1.5rem' }}>SUBMIT TEST</Typography>
        <Typography sx={{ color: '#4B4B4D', margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>Before you submit the test, make sure you <br />have attended all the questions.</Typography>
        <div className='w-[280px] px-2'>
          <Typography sx={{ color: 'black', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '1.1rem' }}><span>Total Questions</span>{total}</Typography>
          <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span className='flex items-center justify-start'><IconCircle fill='#8BC34B' style={{ marginRight: '10px' }} color='#8BC34B' size={20} />Answered</span>{answered}</Typography>
          <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span className='flex items-center justify-start'><IconCircle fill='#D94214' style={{ marginRight: '10px' }} color='#D94214' size={20} />Skipped/Unattempted</span>{unAnswered}</Typography>
          {/* <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', align justifyItems: 'start' Items: 'center', justifyItems: 'start' }}><IconCircle fill='#EEEEEE' style={{ marginRight: '10px' }} color='#EEEEEE' size={20} /> NOT VISITED</Typography> */}
          <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span className='flex items-center justify-start'><IconCircle fill='#634C90' style={{ marginRight: '10px' }} color='#634C90' size={20} />Marked For Review</span>{markedForReview}</Typography>
          {/* <Typography sx={{ color: '#4B4B4D', margin: '1rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyItems: 'start' }}><IconCircle fill='#634C90' style={{ marginRight: '10px' }} color='#634C90' size={20} /> ANSWERED & MARKED FOR REVIEW</Typography> */}
        </div>
        <div className='py-4 flex flex-col items-center'>
          <Button onClick={() => SubmitTest()} variant='contained' style={{ backgroundColor: '#50BA57', margin: '10px 0', color: 'white', padding: '10px 0', fontWeight: 'bold', borderRadius: '8px', width: '280px' }}>SUBMIT</Button>
          <Button onClick={() => CancelSubmit()} variant='contained' style={{ backgroundColor: 'white', margin: '10px 0', color: '#4B4B4D', padding: '10px 0', fontWeight: 'bold', borderRadius: '8px', width: '280px' }}>CANCEL</Button>
        </div>
      </div>}
      {status === 'LOADING' && (
        <div style={{ padding: '2rem', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
          {/* <Typography sx={{ color: 'black', margin: '5px 0', fontWeight: 'bold',textAlign:'center', fontSize: '1.3rem' }}>Time's Up !</Typography> */}
          <Typography variant="body1" sx={{ mt: '2rem', fontSize: '1rem', textAlign: 'center' }}>
            {'Processing your request, please do not close this window or press back while submitting the test'}
          </Typography>
        </div>
      )}
      {status === 'SUCCESS' && (
        <div style={{ padding: '2rem', width: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Lottie animationData={successAnimation} style={{ width: '180px' }} />
          <Typography variant="h5" style={{ marginTop: 16, color: '#00cf00', textAlign: 'center' }}>
            {'Successfully submitted the test !'}
          </Typography>
          <Typography variant="body1" style={{ marginTop: 16, textAlign: 'center' }}>
            redirecting to Test series page...
          </Typography>
        </div>
      )}
    </Dialog>
  )
}

export default SubmitTest;