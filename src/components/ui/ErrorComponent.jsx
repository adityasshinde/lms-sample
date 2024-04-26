import React from 'react';
import { MdError } from 'react-icons/md';

const ErrorComponent = ({ onRetry }) => {
  return (
    <div className="flex p-8 flex-col items-center justify-center rounded-lg shadow-md mt-12">
        <MdError size='2rem' style={{color:'red'}} />
        <p className=" mb-8 mt-2">Error while processing</p>
        <button
          className='blog-btn'
          onClick={onRetry}
        >
          Retry
        </button>
      
    </div>
  );
};

export default ErrorComponent;
