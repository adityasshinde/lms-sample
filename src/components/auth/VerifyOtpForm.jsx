import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useSendOtpToEmailMutation, useSendOtpToPhoneMutation, useVerifyOtpEmailMutation, useVerifyOtpPhoneMutation } from '../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/hooks';
import { MdEdit } from "react-icons/md";
import { setAuthState, setAuthenticated, setLoading, setUser, userLoginRetry } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GradientButton from '../form/GradientButton';
import { Typography } from '@mui/material';
import LoadingButton from '../form/LoadingButton';

const VerifyOtpForm = () => {
  const { phone, redirectLocation, email, authState } = useAuth();
  const [otp, setOtp] = useState('');
  const [verifyOtpPhoneMutation, { isLoading: verifyingPhoneOtp }] = useVerifyOtpPhoneMutation();
  const [verifyOtpEmailMutation, { isLoading: verifyingEmailOtp }] = useVerifyOtpEmailMutation();
  const [sendOtpToPhoneMutation, { isLoading: loadingPhoneOtp }] = useSendOtpToPhoneMutation();
  const [sendOtpToEmailMutation, { isLoading: loadingEmailOtp }] = useSendOtpToEmailMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    // Function to handle the countdown logic
    const interval = setInterval(() => {
      // Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      // When seconds reach 0, decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          // Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          // Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000); // Run this effect every 1000ms (1 second)

    return () => {
      // Cleanup: stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds]); // Re-run this effect whenever 'seconds' changes

  // Function to resend OTP
  const resendOTP = async (e) => {
    e.preventDefault();
    if(loadingEmailOtp|| loadingPhoneOtp) return;
    let result;
    if (authState === 2) {
      result = await sendOtpToPhoneMutation({
        phoneNumber: phone,
        type: "LOGIN",
      });
    }
    if (authState === 6) {
      result = await sendOtpToPhoneMutation({
        phoneNumber: phone,
        type: "SIGNUP",
      });
    }
    if (authState === 4) {
      result = await sendOtpToEmailMutation({
        email,
        type: "LOGIN",
      });
    }
    if (authState === 8) {
      result = await sendOtpToEmailMutation({
        email,
        type: "SIGNUP",
      });
    }
    console.log(result?.data);
    if (result.data) {
      toast.success("OTP sent successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    if (result.error) {
      toast.error(result.error.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setMinutes(1);
    setSeconds(59);
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      try {
        // dispatch(setLoading(true));
        let result;
        if (authState === 2 || authState === 6) {
          result = await verifyOtpPhoneMutation({
            phoneNumber: phone,
            otp,
          });
        }
        if (authState === 4 || authState === 8) {
          result = await verifyOtpEmailMutation({
            phoneNumber: phone,
            email,
            otp,
          });
        }
        console.log(result.data);
        if (result.data) {
          dispatch(setAuthenticated(result.data.token));
          dispatch(setUser(result.data.data));
          console.log(result.data.data);
          if (authState === 2 || authState == 4) {
            dispatch(setAuthState(10));
            toast.success("Logged in successfully",
              {
                position: "bottom-right",
                autoClose: 2000
              });
              navigate('/lms/my_courses');
            return;
          }
          console.log(result.data.data);
          console.log(result.data.data.emailVerified);
          console.log(result.data.data.profileComplete);
          console.log(authState);
          if ((authState === 2 || authState === 6) && (!result.data.data.emailVerified || !result.data.data.profileComplete)) {
            console.log("here");
            dispatch(setAuthState(7));
            return;
          }
          if (result.data.data.emailVerified && result.data.data.phoneVerified && result.data.data.profileComplete) {
            dispatch(setAuthState(10));
            toast.success("Signup Successful!",
              {
                position: "top-center",
                autoClose: 2000
              });
              navigate('/lms/dashboard');
              return;
          }
        }
        if (result.error) {
          //setError(result.error.data.error);
          toast.error(result.error.data.error,
            {
              position: "top-center",
              autoClose: 2000
            });
        }
      } catch (error) {
        // Handle error
        console.error('Error verifying OTP:', error);
      }
    } else {
      toast.warning("Please enter a valid 6-digit OTP",
        {
          position: "top-center",
          autoClose: 2000
        });
    }
  };
  const expirationTime = '0' + { minutes } + ':' + { seconds };

  return (
    <div className='w-full'>
      <Typography style={{ color: '#4B4B4D', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
        Verify OTP
      </Typography>
      {(authState === 2 || authState === 6) && <div className="flex text-sm items-center mb-4 justify-center text-[#252525]">
        <span>Enter the OTP sent to</span>
        <span className='text-[#207EB8] font-bold ml-1'> +91{phone}</span>
        <span onClick={() => dispatch(userLoginRetry(authState - 1))} className='text-[#207EB8] hover:text-blue-800 cursor-pointer ml-1'> <MdEdit /></span>
      </div>}
      {(authState === 4 || authState === 8) && <div className="flex text-sm items-center mb-4 justify-center text-[#252525]">
        <span>Enter the OTP sent to</span>
        <span className='text-[#207EB8] font-bold ml-1'>{email}</span>
        <span onClick={() => dispatch(userLoginRetry(authState - 1))} className='text-[#207EB8] hover:text-blue-800 cursor-pointer ml-1'> <MdEdit /></span>
      </div>}
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        placeholder='000000'
        inputStyle='otp-input'
        containerStyle='flex items-center items-center justify-between w-full pt-4'
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={true}
      />
      {(minutes === 0 && seconds === 0) ? <p onClick={resendOTP} style={{ fontWeight: 'bold',marginBottom:'2rem', textAlign: 'center', marginTop: '1rem', cursor: 'pointer', textDecoration: (loadingEmailOtp||loadingPhoneOtp)?"none":'underline' }}>{(loadingEmailOtp||loadingPhoneOtp)?"Resending otp...":"Resend OTP"}</p>
        : <p className='mb-8 mt-4 text-center'>Resend OTP in 0{minutes}:{seconds > 9 ? seconds : '0' + seconds}s</p>}
      {(verifyingPhoneOtp || verifyingEmailOtp) ? <LoadingButton message='Verifying OTP...' />
        : <GradientButton onClick={verifyOtpHandler} disable={otp.length !== 6} text='Verify' type='submit' />}
      <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
        <Typography sx={{ fontSize: '1rem' }}>
          Having trouble? Write us on{" "}
          <span style={{ color: '#4B4B4D', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { dispatch(setAuthState(1)); }}>
            help@taksh.com
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
