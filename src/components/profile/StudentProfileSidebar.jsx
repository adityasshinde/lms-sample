import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Overlay from "../ui/Overlay";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/slices/authSlice";
import ConfirmationPopup from "../ui/ConfirmationPopup";
import { setWishlist } from "../../store/slices/courseSlice";
import { toast } from "react-toastify";

const StudentProfileSidebar = ({ activeTab, changeTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(setWishlist());
    toast.success("Logged out successfully",
          {
            position: "top-center",
            autoClose: 2000
          });
    navigate('/');
  };

  return (
    <div className="xl:w-1/4 lg:w-1/3 hidden sm:block">
      {popup && <ConfirmationPopup
       heading='Confirm Logout'
       message="Are you sure you want to logout?"
       acceptButton="Logout"
       onAccept={handleLogout}
       onCancel={()=>setPopup(false)}      
      />}
      <div className="student-profile-sidebar mb-8">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 1 && `active`}`}
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              onClick={() => changeTab(1)}
            >
              <i className="fas fa-tachometer-alt-fast"></i>
              Dashboard
            </button>
          </li>
          {/* <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 2 && `active`}`}
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={() => changeTab(2)}
            >
              <i className="fas fa-user"></i> Personal Information
            </button>
          </li> */}
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 3 && `active`}`}
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
              onClick={() => changeTab(3)}
            >
              <i className="fas fa-graduation-cap"></i> Enrolled Courses
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 4 && `active`}`}
              id="wishlist-tab"
              data-bs-toggle="tab"
              data-bs-target="#wishlist"
              type="button"
              role="tab"
              aria-controls="wishlist"
              aria-selected="false"
              onClick={() => changeTab(4)}
            >
              <i className="fas fa-bookmark"></i> Wishlist
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 5 && `active`} `}
              id="quiz-tab"
              data-bs-toggle="tab"
              data-bs-target="#quiz"
              type="button"
              role="tab"
              aria-controls="quiz"
              aria-selected="false"
              onClick={() => changeTab(5)}
            >
              <i className="fas fa-cubes"></i> My Quiz Attempts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 6 && `active`} `}
              id="history-tab"
              data-bs-toggle="tab"
              data-bs-target="#history"
              type="button"
              role="tab"
              aria-controls="history"
              aria-selected="false"
              onClick={() => changeTab(6)}
            >
              <i className="fas fa-cart-plus"></i> Order History
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 7 && `active`} `}
              id="setting-tab"
              data-bs-toggle="tab"
              data-bs-target="#setting"
              type="button"
              role="tab"
              aria-controls="setting"
              aria-selected="false"
              onClick={() => changeTab(7)}
            >
              <i className="fas fa-cog"></i> Settings
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button onClick={() => setPopup(true)}
              className="nav-link"
              id="logout-tab"
              data-bs-toggle="tab"
              data-bs-target="#logout"
              type="button"
              role="tab"
              aria-controls="logout"
              aria-selected="false"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StudentProfileSidebar;
