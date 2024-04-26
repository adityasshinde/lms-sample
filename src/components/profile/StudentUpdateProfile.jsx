import React, { useState } from "react";
import StudentImage from "../../assets/img/course/course-student.png";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAuth } from "../../hooks/hooks";
import { useUpdateStudentProfileMutation } from "../../store/api/authApi";
import { toast } from 'react-toastify';
import LoadingOverlay from "../ui/LoadingOverlay";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";



const StudentUpdateProfile = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [dob, setDob] = useState(user?.personalInformation.dateOfBirth);
  const [fullname, setFullname] = useState(user?.personalInformation.fullName);
  const [Bio, setBio] = useState(user?.personalInformation.Bio);
  const [gender, setGender] = useState(user?.personalInformation.gender);
  const [Class, setClass] = useState(user?.personalInformation.Class);
  const [updateStudentProfileMutation,{isLoading:loading}] = useUpdateStudentProfileMutation();
  const handleDobChange = (e) => {
    //create the format of saving date and update
    //set format of date like 2000-08-07T18:30:00.000+00:00
    const date = dayjs(e).startOf('day').format();
    setDob(date);
    // setDob(newValue);
  }
  const handlefullnameChange = (e) => {
    setFullname(e.target.value);
  }
  const handlebioChange = (e) => {
    setBio(e.target.value);
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  const handleClassChange = (e) => {
    setClass(e.target.value);
  }
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    //add logic for whether the data is changed by user not
    const personalInformation = {
      dateOfBirth: dob,
      fullName: fullname,
      gender,
      Bio,
      Class
    }

    //check for no changes
    if (user?.personalInformation.fullName === personalInformation.fullName
      && user?.personalInformation.dateOfBirth === personalInformation.dateOfBirth
      && user?.personalInformation.gender === personalInformation.gender
      && user?.personalInformation.Bio === personalInformation.Bio
      && user?.personalInformation.Class === personalInformation.Class) {
      toast.error("No changes made",
        {
          position: "top-center",
          autoClose: 2000
        });
      return;
    }
    const updatedStudent = await updateStudentProfileMutation({ personalInformation });
    if (updatedStudent.data) {
      dispatch(setUser(updatedStudent.data));
      toast.success("Profile updated successfully",
        {
          position: "top-center",
          autoClose: 2000
        });
    } else {
      toast.error("Error while updating profile",
        {
          position: "top-center",
          autoClose: 2000
        });
    }
  }
  return (
    <>
      {loading && <LoadingOverlay message="Updating your profile please wait" />}
      <div className="student-profile-enroll">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="profileA"
            role="tabpanel"
            aria-labelledby="profileA-tab"
          >
            <div className="student-profile-settings">
              <div className="student-profile-setting-img my-4 flex items-center justify-center">
                <div className="student-profile-setting-author-img">
                  <div className="mx-auto w-64 text-center">
                    <label htmlFor="file" className="relative w-64 cursor-pointer hover:opacity-50">
                      <img
                        className="w-40"
                        src="https://i.pinimg.com/736x/ba/d7/86/bad786dfe4f227555be6fa2484b0b9a3.jpg"
                        alt=""
                      />
                      <input type='file' id="file" className="hidden"></input>
                      <img className="mx-auto w-8 absolute top-[40%] left-[-50%]" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" />
                    </label>
                  </div>
                </div>
              </div>
              <form action="#">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="FirstName">Full Name</label>
                      <input
                        id="FirstName"
                        value={fullname}
                        onChange={handlefullnameChange}
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="dob-input mx-2 mb-8">
                      <label htmlFor="dob" className="mt-1 font-semibold" >D.O.B</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{
                            outline:'none !important'
                          }}
                          value={dayjs(dob)}
                          onChange={handleDobChange}
                          className="w-full outline-none"
                          name="dob" />
                      </LocalizationProvider>
                    </div>
                  </div>
                  {/* <div className="md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="User">User Name</label>
                      <input id="User" type="text" placeholder="User Name" />
                    </div>
                  </div> */}
                  <div className="w-full md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="Email">Email</label>
                      <input id="Email" value={user.email} type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="Phone">Phone </label>
                      <input id="Phone" value={`+91 ${user.phoneNumber}`} type="text" placeholder="Phone" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="Class">Class</label>
                      <select
                        id="Class"
                        value={Class}
                        onChange={handleClassChange}
                      >
                        <option value="12th">12th</option>
                        <option value="JEE">JEE</option>
                        <option value="NEET">NEET</option>
                        <option value="CUET">CUET</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={handleGenderChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="md:w-1/2">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="Occupation">Occupation </label>
                      <input
                        id="Occupation"
                        type="text"
                        placeholder="Occupation "
                      />
                    </div>
                  </div> */}
                  <div className="w-full md:w-full">
                    <div className="contact-from-input mb-8 mx-2">
                      <label htmlFor="Bio">Bio </label>
                      <textarea id="Bio" placeholder="Bio"
                        value={Bio}
                        onChange={handlebioChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full sm:w-full">
                    <div className="cont-btn mb-8 mt-4 mx-2">
                      <button onClick={handleUpdateProfile} className="cont-btn">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div
            className="tab-pane fade"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <StudentPasswordForm/>
          </div> */}
          {/* <div
            className="tab-pane fade"
            id="completedA"
            role="tabpanel"
            aria-labelledby="completedA-tab"
          >
            <div className="student-social-profile-link">
              <span className="mb-8">Social Profile Link</span>
              <SocialProfileFrom/>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StudentUpdateProfile;
