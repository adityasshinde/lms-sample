import React from 'react';
import Lottie from 'lottie-react';
import paymentSuccessAnimation from '../../asset/Animations/paymentSuccess.json';
import paymentFailedAnimation from '../../asset/Animations/paymentFailed.json';
import { CircularProgress, Typography } from '@mui/material';

const PaymentResponse = ({type,message}) => {
  return (
    <div>
         {type === 'pending' && (
                <div style={{padding:'1rem',}}>
                            <CircularProgress />
                            <Typography variant="body1" sx={{ mt: '2rem',fontSize:'1rem'}}>
                               {message?message:'Processing your request, please do not close this window or press back while we confirm your payment'}
                            </Typography>
                </div>
        )}
         {type === 'success' && (
                 <div>
                 <Lottie animationData={paymentSuccessAnimation} style={{width:'200px'}} />
                   <Typography variant="h5" style={{ marginTop: 16,color:'#00cf00'}}>
                       {message?message:'Payment Successful !'}
                   </Typography>
                   <Typography variant="body1" style={{ marginTop: 16 }}>
                         redirecting to course learning page...
                   </Typography>
                 </div> 
        )}
         {type === 'failed' && (
                <div>
                <Lottie animationData={paymentFailedAnimation} style={{ width: '200px' }} />
                <Typography variant="h5" style={{ marginTop: 16, color: '#fb0000' }}>
                    {message?message:'Payment Failed !'}
                </Typography>
            </div>
        )}

    </div>
  )
}

export default PaymentResponse;