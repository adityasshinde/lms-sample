import React, { useState } from "react";
import '../../assets/scss/component/_header.scss';
import '../../assets/scss/component/_common.scss';
import '../../assets/scss/component/_skill.scss';
import '../../assets/css/fontAwesome5Pro.css';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
// import Image from "next/image";
import LogoBlackImage from '../../asset/images/Logo.png';
import HeaderCart from "../cart/HeaderCart";
// import useScrollDirection from "@/hooks/sticky-header";
import { useDispatch, useSelector } from "react-redux";
// import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import useScrollDirection from "../../hooks/stick-header";
import Overlay from "../ui/Overlay";
import LoginPage from "../../pages/LoginPage";
import { useAuth } from "../../hooks/hooks";
import { setAuthState } from "../../store/slices/authSlice";
import ProfileDropdown from "./ProfileDropdown";
import { Drawer, IconButton, Menu } from "@mui/material";
import SideNavbar from "./SideNavbar";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen ] = useState(false);
  const scrollDirection = useScrollDirection(null);
  const [signinOpen, setSignInOpen] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const { authState, isAuth, user } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const closeLoginPopup = () => {
    dispatch(setAuthState(0));
  }
  const handleAuthComplete = () => {
    if (!user.emailVerified) {
      dispatch(setAuthState(7));
    } else if (authState === 9) {
      navigate('/students/register');
    } else {
      navigate('/student/profile');
    }
  }
  // const cartProducts = useSelector(
  //   (state) => state.cart.cartProducts
  // );
  // const uniqueProductIds = new Set();
  // cartProducts.forEach((product) => uniqueProductIds.add(product.id));
  // const quantityProduct = uniqueProductIds.size;

  return (
    <>
      <header>
        {authState > 0 && authState < 10 && <Overlay ><LoginPage close={closeLoginPopup} /></Overlay>}
        <div className="header-top-area hiEnrodden text-gray-500 lg:block px-8">
          <div className="container-fluid hidden sm:block md:block">
            <div className="header-top-inner">
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-start flex-wrap">
                  <div className="header-top-icon">
                    <Link to="tel:(555)674890556">
                      <i className="fas fa-phone-alt"></i>(555) 674 890 556
                    </Link>
                    <Link to="mailto:info@example.com">
                      <i className="fal fa-envelope"></i>info@example.com
                    </Link>
                    <i className="fal fa-map-marker-alt"></i>
                    <span>3rd Avenue, San Francisco</span>
                  </div>
                </div>
                <div className="flex justify-center items-start flex-wrap">
                  <div className="header-top-login flex justify-end">
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
          </div>
        </div>

        <div
          className={`header-area-2 sticky-header ${scrollDirection === "down" ? "sticky" : " "
            }`}
        >
          <div className="container-fluid border-b border-gray-300 px-8">
            <div className="header-main-wrapper">
              <div className="flex items-center h-24 justify-between">
                <div className="flex-shrink-0 md:w-3/12 lg:w-3/12 xl:w-3/12">
                  <div className="header-logo">
                    <Link to="/">
                      {" "}
                      {/* <strong className="text-2xl">TAKSH EDUCATION</strong> */}
                      <img
                        src={LogoBlackImage}
                        style={{ width: "auto", height: "auto" }}
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block flex-shrink-0 w-full sm:w-3/12 md:w-9/12 lg:w-9/12 xl:w-9/12">
                  <div className="header-main-right flex items-center justify-end">
                    <div className="flex items-center justify-center">
                      <Link to='/' className={`mx-6 hover:text-blue-500 ${location.pathname === '/' && 'text-blue-500'}`}>Home</Link>
                      <Link to='/courses' className={`mx-6 hover:text-blue-500 ${location.pathname === '/courses' && 'text-blue-500'}`}>Courses</Link>
                      <Link to='/study' className={`mx-6 hover:text-blue-500 ${location.pathname === '/study' && 'text-blue-500'}`}>Study Material</Link>
                      <Link to='/about-us' className={`mx-6 hover:text-blue-500 ${location.pathname === '/about-us' && 'text-blue-500'}`}>About Us</Link>
                    </div>
                    <div className="header-btn">
                      {/* <div className="cart-wrapper mr-12">
                        <button
                          className="cart-toggle-btn"
                          onClick={() => {
                            setCartOpen(!cartOpen);
                          }}
                        >
                          <div className="header__cart-icon relative">
                            <BsCart3 size='1.5rem' />
                            <span className="item-number">
                              {" "}
                              5{" "}
                            </span>
                          </div>
                        </button>
                      </div> */}
                      {!isAuth ? <div className="flex">
                        <Link
                          onClick={() => { dispatch(setAuthState(1)) }}
                          className="px-12 mr-4 py-3 border border-black rounded-md"
                        >
                          Login
                        </Link>
                        <Link

                          onClick={() => { dispatch(setAuthState(5)) }}
                          className="edu-four-btn"
                        >
                          Enroll now
                        </Link>
                      </div>
                        :
                        <ProfileDropdown />}
                      {/* <button
                        onClick={handleAuthComplete}
                        className="edu-four-btn hidden xl:block"
                      >
                        Profile
                      </button>} */}
                      {/* <div className="menu-bar ml-4">
                        <button
                          onClick={toggleSideMenu}
                          className="side-toggle header-2"
                        >
                          <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                          </span>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <SideNavbar/>
              </div>
            </div>
          </div>
        </div>
        {/* <HeaderCart cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <div
          onClick={() => setCartOpen(false)}
          className={cartOpen ? "body-overlay opened" : "body-overlay"}
        ></div>
        {sideMenu && <MobileMenu toggleSideMenu={toggleSideMenu} />}
        <div
          onClick={toggleSideMenu}
          className={
            sideMenu
              ? "offcanvas-overlay overlay-signin"
              : "offcanvas-overlay"
          }
        ></div> */}
      </header>
    </>
  );
};

export default Navbar;
