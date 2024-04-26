import React, { useEffect } from 'react';
import {getPermission, messaging} from '../firebase.js';
import { onMessage } from 'firebase/messaging';

const CloudMessaging = () => {  
    useEffect(() => {
      getPermission();
      onMessage(messaging,(payload) => {
        console.log('Message received. ', payload);
        // ...
      });
    }, [])
    
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h1>Cloud Messaging Page</h1>
            <p>Welcome to the Cloud Messaging page!</p>
        </div>
    );
};

export default CloudMessaging;