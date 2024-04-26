import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setRedirectLocation, userLogout } from '../../store/slices/authSlice';
import ConfirmationPopup from '../ui/ConfirmationPopup';
import { useAuth } from '../../hooks/hooks';
import { setWishlist } from '../../store/slices/courseSlice';
import { toast } from 'react-toastify';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const { redirectLocation } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    console.log('logout');
    dispatch(setRedirectLocation(window.location.pathname));
    dispatch(userLogout());
    dispatch(setWishlist());
    navigate(redirectLocation);
    toast.success("Logged out successfully",
          {
            position: "top-center",
            autoClose: 2000
          });
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {popup && (
        <ConfirmationPopup
          heading="Confirm Logout"
          message="Are you sure you want to logout?"
          acceptButton="Logout"
          onAccept={handleLogout}
          onCancel={() => setPopup(false)}
        />
      )}
      <div
        onClick={() => setOpen(!open)}
        className={`relative border-b-4 mx-6 border-transparent py-3 ${
          open ? 'border-indigo-700' : ''
        } cursor-pointer`}
      >
        <div className="relative flex justify-center items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 dark:border-white border-gray-200">
            <img
              src="https://i.pinimg.com/736x/ba/d7/86/bad786dfe4f227555be6fa2484b0b9a3.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {open && (
        <div className="absolute px-4 py-2 z-10 right-0 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col">
            <Link
              to="/student/profile"
              onClick={() => setOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className="fas fa-user mr-2"></i>
              Profile
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="pl-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className="fas fa-bookmark mr-2"></i>
              Notifications <span className="ml-1 p-1 px-2 font-semibold text-xs text-white bg-red-500 rounded-full">12</span>
            </Link>
            <hr className="dark:border-gray-700" />
            <Link
              onClick={() => {
                setPopup(true);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
