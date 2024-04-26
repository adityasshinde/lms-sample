import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import { TextField, Typography, Button } from '@mui/material';
import GradientButton from '../form/GradientButton';
import { IconGenderFemale, IconMars } from '@tabler/icons';
import SelectDropDown from '../form/Select';
import { useCompleteStudentProfileMutation, useSendOtpToEmailMutation, useUpdateStudentProfileMutation } from '../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setAuthState, setEmail, setLoading, setUser } from '../../store/slices/authSlice';
import LoadingButton from '../form/LoadingButton';
import { useAuth } from '../../hooks/hooks';

const CustomDatePicker = styled(DatePicker)({
  width: '80%',
  outline: 'none !important',
  '& .MuiInputBase-root': {
    border: 'none', // Remove border
    outline: 'none', // Remove outline
  },
});

const CompleteProfile = () => {
  const {email}=useAuth();
  const [name, setName] = useState('');
  const [emailInput, setEmailInput] = useState(email);
  const [interest, setInterest] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('male');
  // const [updateStudentProfileMutation,{isLoading:loading}] = useUpdateStudentProfileMutation();
  const [completeStudentProfileMutation,{isLoading:loading}] = useCompleteStudentProfileMutation();
  const dispatch = useDispatch();
  const [sendOtpToEmailMutation,{isLoading:loadingEmailOtp}] = useSendOtpToEmailMutation();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange=(e)=>{
    setEmailInput(e.target.value);
  }

  const handleInterestChange = (e) => {
    setInterest(e.target.value);
  };

  const handleDobChange = (date) => {
    setDob(date);
  };

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Validate the input fields
    const isNameValid = /^[a-zA-Z\s]+$/.test(name);
    const isEmailValid= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput);
    const isInterestValid = /^(12th|JEE|NEET|CUET|other)$/.test(interest);
    // const isDobValid = dayjs(dob).isValid();
    const isGenderValid = /^(male|female)$/.test(gender);

    // Check if all validations pass
    if (isNameValid && isInterestValid && isEmailValid && isGenderValid) {
      // If all validations pass, update the student profile
      const personalInformation = {
        dateOfBirth: dob,
        fullName: name,
        gender,
        Bio:'',
        Class:interest
      }
      console.log(personalInformation);
      const updatedStudent = await completeStudentProfileMutation({ personalInformation,email:emailInput });
      if (updatedStudent.error) {
        toast.error(updatedStudent.error?.data, {
          position: 'top-center',
          autoClose: 2000
        });
        return;
      }
      const result = await sendOtpToEmailMutation({
        email: emailInput,
        type: "SIGNUP",
      });
      if (result.data && updatedStudent.data) {
        dispatch(setUser(updatedStudent.data));
          dispatch(setEmail(emailInput));
          dispatch(setAuthState(8));
          toast.success("OTP sent successfully", {
            position: "top-center",
            autoClose: 2000,
          });
      } else {
        toast.error("Error while sending otp to email",
          {
            position: "top-center",
            autoClose: 2000
          });
      }

    } else {
      // Log errors for each field
      if (!isNameValid) {
        toast.error('Invalid name format. Only letters and spaces are allowed.', {
          position: 'top-center',
          autoClose: 2000
        });
        return;
      }
      if(!isEmailValid){
        toast.error('Invalid emailInput format.', {
          position: 'top-center',
          autoClose: 2000
        });
        return;
      }
      if (!isInterestValid) {
        toast.error('Invalid interest. Choose a valid option.', {
          position: 'top-center',
          autoClose: 2000
        });
        return;
      }
      // if (!isDobValid) {
      //   toast.error('Invalid date of birth.', {
      //     position: 'top-center',
      //     autoClose: 2000
      //   });
      //   return;
      // };
      if (!isGenderValid) {
        toast.error('Invalid gender.', {
          position: 'top-center',
          autoClose: 2000
        });
        return;
      }

    }
  };

  return (
    <div style={{ width: '100%',height:'100%', padding:'0 1rem' }}>
      <Typography variant="h6" sx={{ fontSize: '1.3rem', fontWeight: 'semibold', mb: 6, textAlign: 'center', color: '#4B4B4D' }}>Complete Your Profile</Typography>

      {/* Name Field */}
      <div style={{fontSize:'1rem',marginBottom:'1rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
        <label htmlFor="name" style={{width:'40%', color: '#404040', cursor: 'pointer' }}>Name</label>
        <TextField
          id="name"
          name="name"
          variant="standard"
          
          sx={{width:'80%',outline: 'none', cursor: 'pointer',
          '& input': {
            fontWeight: 'bold',
            paddingX: '0.5rem',
          },
      
         }}
          value={name}
          onChange={handleNameChange}
        />
      </div>
      {/* Email Field */}
      <div style={{fontSize:'1rem',marginBottom:'1rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
        <label htmlFor="emailInput" style={{width:'40%', color: '#404040', cursor: 'pointer' }}>Email</label>
        <TextField
          id="emailInput"
          name="emailInput"
          variant="standard"
          
          sx={{width:'80%',outline: 'none', cursor: 'pointer',
          '& input': {
            fontWeight: 'bold',
            paddingX: '0.5rem',
          },
      
         }}
          value={emailInput}
          onChange={handleEmailChange}
        />
      </div>

      {/* Interest Field */}
      <div style={{fontSize:'1rem',marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', }}>
        <label htmlFor="interest" style={{ width:'40%',color: '#404040', cursor: 'pointer' }}>Interest</label>
        <div style={{borderBottom:'1px solid #404040',margin:'0',width:'80%'}}>
        <SelectDropDown
         options={['12th', 'JEE', 'NEET', 'CUET', 'other']}
         id='interest'
         width='100%'
         onChange={handleInterestChange}
         value={interest}
         />
        </div>
      </div>

      {/* Date of Birth Field */}
      {/* <div style={{fontSize:'1rem',marginBottom: '2rem', display: 'flex',alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <label htmlFor="dob" style={{ display: 'block', color: '#404040', width:'40%', cursor: 'pointer' }}>Date of Birth</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDatePicker
            name="dob"
            value={dob}
            onChange={handleDobChange}
          />
        </LocalizationProvider>
      </div> */}

      {/* Gender Field */}
      <div style={{fontSize:'1rem',marginBottom: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <label style={{width:'40%', display: 'block', color: '#404040', cursor: 'pointer' }}>Gender</label>
        <div style={{ width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight:'0.5rem', cursor: 'pointer' }}>
            <IconMars
              size={32}
              color={gender === 'male' ? 'white' : '#404040'}
              style={{ padding: '0.3rem', borderRadius: '50%', color: '#404040', backgroundColor: gender === 'male' ? '#207EB8' : '#e0dede', text: gender === 'male' ? 'white' : '#404040' }}
              onClick={() => handleGenderChange('male')}
            />
            <label htmlFor="male" style={{fontSize:'0.8rem', marginLeft:'0.2rem',cursor: 'pointer',color:gender === 'male' ? '#207EB8' : '#404040' }} onClick={() => handleGenderChange('male')}>Male</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft:'0.5rem', cursor: 'pointer' }}>
            <IconGenderFemale
               size={32}
               color={gender === 'female' ? 'white' : '#404040'}
              style={{ padding: '0.3rem', borderRadius: '50%',color: '#404040', backgroundColor: gender === 'female' ? '#207EB8' : '#e0dede', text: gender === 'female' ? 'white' : '#404040' }}
              onClick={() => handleGenderChange('female')}
            />
            <label htmlFor="female" style={{fontSize:'0.8rem', marginLeft:'0.2rem',cursor: 'pointer',color:gender === 'female' ? '#207EB8' : '#404040'}} onClick={() => handleGenderChange('female')}>Female</label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {(!loading && !loadingEmailOtp) ?
      <GradientButton
      text='Continue'
      onClick={handleSubmit}
      type='submit'
      disable={name === '' || interest === '' || emailInput === ''}
      />
      :<LoadingButton message='Processing request...' />}
    </div>
  );
};

export default CompleteProfile;
