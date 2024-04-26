import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '../../hooks/hooks';
import { setAuthState, setProfileTab, setRedirectLocation, userLogout } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { setWishlist } from '../../store/slices/courseSlice';
import { toast } from 'react-toastify';
import ConfirmationPopup from '../ui/ConfirmationPopup';


const SideNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [popup, setPopup] = useState(false);
    const location = useLocation();
    const {user,isAuth}=useAuth();
    const dispatch=useDispatch();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    const changeProfileTab=(tab)=>{
    dispatch(setProfileTab(tab));
    closeSidebar();
        
    }
    const handleLogout = () => {
        dispatch(userLogout());
        dispatch(setWishlist());
        toast.success("Logged out successfully",
              {
                position: "top-center",
                autoClose: 2000
              });
      };

    return (
        <>
        {popup && (
        <ConfirmationPopup
          heading="Confirm Logout"
          message="Are you sure you want to logout?"
          acceptButton="Logout"
          onAccept={handleLogout}
          onCancel={() => setPopup(false)}
        />
      )}
            <FaBars
                size='1.5rem'
                onClick={toggleSidebar} />
            {isSidebarOpen && (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 bg-gray-800 bg-opacity-50 z-40"
                    onClick={closeSidebar}
                ></div>
            )}
            <div
                className={`fixed right-0 top-0 bottom-0 bg-white ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform ease-in-out duration-300 z-50`}
            >
                <div className="relative flex flex-col bg-white text-gray-700 h-screen w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="mb-2 ">
                        {isAuth ? <div className="mx-6 cursor-pointer">
                            <div className="relative inline-block text-left">
                                <button
                                    id="dropdownAvatarNameButton"
                                    onClick={() => setOpenProfile(!openProfile)}
                                    data-dropdown-toggle="dropdownAvatarName"
                                    className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                                    type="button"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 me-2 rounded-full"
                                        src="https://i.pinimg.com/736x/ba/d7/86/bad786dfe4f227555be6fa2484b0b9a3.jpg"
                                        alt="user photo"
                                    />
                                    {user?.personalInformation?.fullName}
                                    <svg
                                        className="w-2.5 h-2.5 ms-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown menu */}
                                {openProfile && <div
                                    id="dropdownAvatarName"
                                    className="z-60 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownAvatarNameButton">
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(1)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i className="mr-2 fas fa-tachometer-alt-fast"></i> Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(2)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i className="mr-2 fas fa-user"></i> Personal Info</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(3)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i className="mr-2 fas fa-graduation-cap"></i> Enrolled courses</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(4)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> <i className="mr-2 fas fa-bookmark"></i> Wishlist</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(5)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i className="mr-2 fas fa-cubes"></i> My Quiz Attempts</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(6)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> <i className="mr-2 fas fa-cart-plus"></i> Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="/student/profile" onClick={()=>{changeProfileTab(7)}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i className="mr-2 fas fa-cog"></i> Settings</Link>
                                        </li>
                                    </ul>
                                    <div className="py-2" onClick={()=>{setPopup(true);closeSidebar()}}>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><i className="mr-2 fas fa-sign-out-alt"></i> Logout</a>
                                    </div>
                                </div>}
                            </div>
                        </div>:
                        <Link
                        onClick={() => { dispatch(setAuthState(1));closeSidebar(); }}
                        className="underline ml-4 hover:text-blue-800 cursor-pointer flex font-semibold"
                      >
                        Login / Register
                      </Link>
                        }
                    </div>
                    <hr className='my-4'></hr>
                    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                        <div onClick={closeSidebar} className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                            <Link to='/' className={`hover:text-blue-500 ${location.pathname === '/' && 'text-blue-500'}`}>Home</Link>
                        </div>
                        <div onClick={closeSidebar} className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                            <Link to='/courses' className={`hover:text-blue-500 ${location.pathname === '/courses' && 'text-blue-500'}`}>Courses</Link>

                        </div>
                        <div onClick={closeSidebar} className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                            <Link to='/study' className={`hover:text-blue-500 ${location.pathname === '/study' && 'text-blue-500'}`}>Study Material</Link>

                        </div>
                        <div onClick={closeSidebar} className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                            <Link to='/about-us' className={`hover:text-blue-500 ${location.pathname === '/about-us' && 'text-blue-500'}`}>About Us</Link>

                        </div>
                        {/* Add other navigation items here */}
                    </nav>
                    <div className="">
                    <hr className='my-4'></hr>
                        <div className="header-top-inner">
                            <div className="flex flex-col items-center justify-between relative">
                                <div className="flex flex-col justify-center">
                                    <div className="header-top-icon">
                                        <Link to="tel:(555)674890556">
                                            <i className="fas fa-phone-alt"></i>(555) 674 890 556
                                        </Link>
                                        <Link to="mailto:info@example.com">
                                            <i className="fal fa-envelope"></i>info@example.com
                                        </Link>
                                        <Link>
                                            <i className="fal fa-map-marker-alt"></i>
                                            <span>3rd Avenue, San Francisco</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start items-center mt-4">
                        <div className="header-top-login flex items-center justify-center">
                            <div className="header-social">
                                <Link to="https://www.Linknkedin.com" target="_blank">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link to="https://twitter.com/" target="_blank">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link to="https://instagram.com/" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link to="https://www.facebook.com/" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideNavbar;
