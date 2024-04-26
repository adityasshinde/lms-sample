import { Dialog} from '@mui/material';
import React from 'react';
import Loader from '../ui/Loader';
import Lottie from 'lottie-react';
import paperPlane from '../../asset/Animations/paperPlane.json';

const LoadingOverlay = ({ message,open}) => {
  return (
    <Dialog
        open={open}
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            boxShadow: 'none',
          },
        }}
      >
          {/* <Loader message={message} color='white'/> */}
          <Lottie animationData={paperPlane} style={{width:'100px',height:'100px'}}/>
      </Dialog>
  );
};

export default LoadingOverlay;
