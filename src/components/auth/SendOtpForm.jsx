import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/hooks";
import {
  useSendOtpToEmailMutation,
  useSendOtpToPhoneMutation,
} from "../../store/api/authApi";
import {
  setAuthState,
  setEmail,
  setLoading,
  setPhoneNumber,
} from "../../store/slices/authSlice";
import FormInput from "../form/FormInput";
import GradientButton from "../form/GradientButton";
import Select from "../form/Select";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import LoadingButton from "../form/LoadingButton";

const SendOtpForm = () => {
  const { authState, phone, email } = useAuth();
  const [phoneNumber, setphoneNumber] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [sendOtpToPhoneMutation,{isLoading:loadingPhoneOtp}] = useSendOtpToPhoneMutation();
  const [sendOtpToEmailMutation,{isLoading:loadingEmailOtp}] = useSendOtpToEmailMutation();

  const dispatch = useDispatch();

  const onMobileChangeHandler = (e) => {
    setphoneNumber(e.target.value);
  };
  const onEmailChangeHandler = (e) => {
    setEmailInput(e.target.value);
  };
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    // let numberWithCC;
    if (
      /^\d{10}$/.test(phoneNumber) ||
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput)
    ) {
      try {
        // dispatch(setLoading(true));
        // numberWithCC="+91"+phoneNumber;
        let result;
        if (authState === 1) {
          result = await sendOtpToPhoneMutation({
            phoneNumber,
            type: "LOGIN",
          });
        }
        if (authState === 5) {
          result = await sendOtpToPhoneMutation({
            phoneNumber,
            type: "SIGNUP",
          });
        }
        if (authState === 3) {
          result = await sendOtpToEmailMutation({
            email: emailInput,
            type: "LOGIN",
          });
        }
        // if (authState === 7) {
        //   result = await sendOtpToEmailMutation({
        //     email: emailInput,
        //     type: "SIGNUP",
        //   });
        // }
        // dispatch(setLoading(false));
        console.log(result.data);
        if (result.data) {
          dispatch(setAuthState(authState + 1));
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
      } catch (error) {
        console.error("Error sending OTP:", error);
        return;
      }
      if (authState === 1 || authState === 5) {
        dispatch(setPhoneNumber(phoneNumber));
      }
      if (authState === 3 || authState === 7) {
        dispatch(setEmail(emailInput));
      }
    } else {
      toast.warning("Please enter a valid 10-digit mobile number.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' >
      <div className="flex flex-col mb-12">
        {(authState === 1 || authState === 5) && (
          <FormInput
            prependComponent={<Select options={["+91", "+1"]} value="+91" />}
            type="text"
            placeholder="Enter your mobile number"
            onchange={onMobileChangeHandler}
            maxLength={10}
            value={phoneNumber}
          />
        )}
        {(authState === 3 || authState === 7) && (
          <FormInput
            type="email"
            value={email}
            placeholder="Enter your email address"
            onchange={onEmailChangeHandler}
          />
        )}
        <Typography sx={{ fontSize: '1rem',my:'5px' }} >
          We’ll send an OTP for verification
        </Typography>
      </div>
      {(loadingEmailOtp || loadingPhoneOtp) ?<LoadingButton message='Sending OTP...' />
      :<GradientButton type="submit" disable={!phoneNumber && !emailInput} onClick={sendOtpHandler} text="Continue" />}
    </Box>
  );
};

export default SendOtpForm;
