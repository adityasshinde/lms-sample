import Lottie from 'lottie-react';
import React from 'react';
import planePaper from '../../asset/Animations/paperPlane.json';

const LoadingOverlay = ({ message }) => {

  return (
    <div id="loading-overlay" className="fixed inset-0 z-[1010] flex flex-col items-center justify-center bg-white bg-opacity-70 bg-blend-darken-900">
      <Lottie animationData={planePaper} style={{height:'300px', width:'300px'}} />
      {/* <p className="text-black text-1xl text-center font-bold w-1/3">{message}</p> */}
    </div>
  );
};

export default LoadingOverlay;
