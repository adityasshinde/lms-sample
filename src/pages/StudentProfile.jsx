import React, { useState } from "react";
import courseStudentImage from "../assets/img/course/course-student.png";
import StudentProfileSidebar from "../components/profile/StudentProfileSidebar";
import DashboardCounter from "../components/profile/DashboardCounter";
import InProgressCourse from "../components/profile/InProgressCourse";
import MyProfile from "../components/profile/MyProfile";
import StudentProfileEnroll from "../components/profile/StudentProfileEnroll";
import StudentProfileReviews from "../components/profile/StudentProfileReviews";
import OrderHistory from "../components/profile/OrderHistory";
import StudentUpdateProfile from "../components/profile/StudentUpdateProfile";
import StudentWishlistCourse from "../components/profile/StudentWishlistCourse";
import '../assets/scss/component/_user-profile.scss';
import { useAuth } from "../hooks/hooks";
import { useDispatch } from "react-redux";
import { setProfileTab } from "../store/slices/authSlice";

const StudentProfile = () => {
  const {user,profileTab}=useAuth();
  const dispatch=useDispatch();
  const handleTabChange = (tab) => {
    dispatch(setProfileTab(tab));
  }
  return (
    <div className="course-details-area pt-4 pb-16 px-4">
      <div className="container mx-auto">
        <div className="flex">
          <StudentProfileSidebar profileTab={profileTab} changeTab={handleTabChange} />
          <div className="w-full xl:w-3/4 lg:w-2/3">
            <div className="student-profile-content">
              <div className="tab-content" id="myTabContent">
                {profileTab===1 && <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="mb-8">Dashboard</h4>
                  <div className="student-profile-content-fact">
                    <DashboardCounter />
                    <div className="flex">
                      <div className="w-full">
                        <h4 className="mb-8">In Progress Courses</h4>
                        <InProgressCourse />
                      </div>
                    </div>
                  </div>
                </div>}
                {/* {profileTab===2 && <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <h4 className="mb-8">Personal Info</h4>
                  <MyProfile user={user} />
                </div>} */}
                {profileTab===3 && <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <h4 className="mb-8">Enrolled Courses</h4>
                  <StudentProfileEnroll />
                </div>}
                {profileTab===4 && <div
                  className="tab-pane fade"
                  id="wishlist"
                  role="tabpanel"
                  aria-labelledby="wishlist-tab"
                >
                  <h4 className="mb-8">Wishlist</h4>
                  <div className="student-profile-wishlist">
                    <div className="flex">
                      <StudentWishlistCourse />
                    </div>
                  </div>
                </div>}
                {profileTab===5 && <div
                  className="tab-pane fade"
                  id="quiz"
                  role="tabpanel"
                  aria-labelledby="quiz-tab"
                >
                  <p>No quiz attempts yet.</p>
                </div>}
                {profileTab===6 && <div
                  className="tab-pane fade"
                  id="history"
                  role="tabpanel"
                  aria-labelledby="history-tab"
                >
                  <h4 className="mb-8">Order History</h4>
                  <OrderHistory userId={user?._id} />
                </div>}
                {/* {profileTab===8 && <div
                  className="tab-pane fade"
                  id="ques"
                  role="tabpanel"
                  aria-labelledby="ques-tab"
                >
                  <p>No question completed yet.</p>
                </div>} */}
                {profileTab===7 && <div
                  className="tab-pane fade"
                  id="setting"
                  role="tabpanel"
                  aria-labelledby="setting-tab"
                >
                  <h4 className="mb-8">Settings</h4>
                  <StudentUpdateProfile />
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
