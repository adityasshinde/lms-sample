import React, { useState } from 'react';
import SignUpImg from '../asset/images/sign-up.png';
import { useDispatch } from 'react-redux';


const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const onFirstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const onLastNameChangeHandler = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const onCurrentClassChangeHandler = (e) => {
    setCurrentClass(e.target.value);
    setError('');
  };



  const submitHandler = (event) => {
    event.preventDefault();
    // Regular expressions for validation
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // Validate First Name
    if (!nameRegex.test(firstName.trim())) {
      setError('Invalid First Name');
    }

    // Validate Last Name
    if (!nameRegex.test(lastName.trim())) {
      setError('Invalid Last Name');
    }

    // Validate Email
    if (!emailRegex.test(email.trim())) {
      setError('Invalid Email Address');
    }

    // Validate Current Class
    if (currentClass.trim() === '') {
      setError('Current Class cannot be empty');
    }
    console.log({
      firstName,lastName,currentClass,email
    })
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* {isLoading && !status.isOtpSent && <Overlay message="Sending OTP, please wait...." />}
          {isLoading && status.isOtpSent && !status.isError && <Overlay message="Verifying OTP, please wait...." />} */}
      <div className="container w-full mx-auto">
        <div className="flex justify-center w-full">
          <div className="bg-gray-100 p-8 flex flex-col items-center w-3/10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold">Register</h3>
            </div>
            <div className="mt-4">
              <img src={SignUpImg} className="w-full h-auto" alt="img not found" />
            </div>
          </div>
          <div className="bg-white px-10 w-2/5 ">
            <form className="flex flex-col items-center w-full">
              <div className="text-center p-4 mb-4">
                <h3 className="text-3xl font-bold">"Onboard yourself <br /> with <span className='text-blue-500'>TAKSH</span> "</h3>
              </div>
              <div className="flex w-full mb-6 justify-between">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={onFirstNameChangeHandler}
                  className="flex-grow px-6 w-1/2 py-4 mr-2 text-lg rounded bg-gray-100 focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={onLastNameChangeHandler}
                  className="flex-grow w-1/2 px-6 py-4 ml-2 text-lg rounded bg-gray-100 focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={onEmailChangeHandler}
                className="w-full px-6 py-4 mb-6 text-lg rounded bg-gray-100 focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
              />
              <select
                value={currentClass}
                onChange={onCurrentClassChangeHandler}
                className="w-full px-6 py-4 mb-8 text-lg rounded bg-gray-100 focus:outline-none text-sm"
              >
                <option value="">Select Current Class</option>
                <option value="12th">12th</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="CUET">CUET</option>
                <option value="other">Other</option>
              </select>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                onClick={submitHandler}
                className="bg-0074BA mt-2 mb-4 hover:text-black hover:bg-47D7BC text-white px-4 py-4 rounded w-full"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
