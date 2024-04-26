import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader, CardMedia, Typography, IconButton, Button, Divider } from '@mui/material';
import { IconShare, IconStar } from '@tabler/icons';
import GradientButton from '../form/GradientButton';
import { ChartBar, Clock } from '@phosphor-icons/react';
import { Question } from '@phosphor-icons/react/dist/ssr';
import GradientLink from '../form/GradientLink';
import { useCreateTestSessionMutation } from '../../store/api/lmsApi';
import { toast } from 'react-toastify';
import LoadingOverlay from '../molecules/LoadingOverlay';
import { flushTest } from '../../store/slices/testSlice';
import NormalLink from '../form/NormalLink';


const TestCard = ({test}) => {
    const [createTestSessionMutation,{isLoading}]=useCreateTestSessionMutation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleStartTest = async() => {
        const result=await createTestSessionMutation(test?._id);
        if(result?.data){
            dispatch(flushTest());
            navigate(`/test/${result?.data?.testSession?.testId}?session=${result?.data?.testSession?._id}`);
            
        }else{
            console.log(result?.error);
            toast.error("Failed to start test", {
                position: "top-center",
                autoClose: 2000,
              });
        }
    }
    return (
       <>
        {(isLoading) && (
        <LoadingOverlay
          open={isLoading}
          message="Starting Test, please wait..."
        />
      )}
        <Card sx={{
            margin: 'auto',
            borderRadius: "8px",
            border: '1px solid #4B4B4D18',
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            padding: '0 auto',
        }}>
            <CardHeader
                sx={{ width: '100%',p:'0', pt:'0.5rem' }}
                title={
                    <Typography sx={{ fontWeight: 'bold',color:'black', fontSize: '1rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
                        {test?.title}
                    </Typography>
                }
            />
            <CardContent sx={{padding:'0 !important'}}>
               <div className='my-4'>
               <Typography sx={{ fontWeight: 'bold',display:'flex',alignItems:'center',justifyContent:'start',mt:'10px' }}>
                   <Clock size={24} style={{marginRight:'10px'}} /> {test?.duration} Minutes
                </Typography>
                <Typography sx={{ fontWeight: 'bold',display:'flex',alignItems:'center',justifyContent:'start',mt:'10px' }}>
                   <Question size={24} style={{marginRight:'10px'}} /> {test?.totalQuestions} Questions
                </Typography>
                <Typography sx={{ fontWeight: 'bold',display:'flex',alignItems:'center',justifyContent:'start' ,mt:'10px'}}>
                   <ChartBar size={24} style={{marginRight:'10px'}} /> {test?.totalMarks} Marks
                </Typography>
               </div>
                <Divider sx={{color:'black',my:'10px'}} />
                {test?.attempted==='true' &&<NormalLink to={`${test?._id}?test=${test?.title}`} text='View Details' />}     
                {test?.attempted==='false' &&<GradientButton onClick={handleStartTest} text='Attempt Test' />}
            </CardContent>
        </Card></>
    );
};

export default TestCard;
