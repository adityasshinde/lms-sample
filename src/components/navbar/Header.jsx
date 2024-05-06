import {
  AppBar,
  Box,
  Collapse,
  IconButton,
  Stack,
  Toolbar,
  styled,
  useMediaQuery,
} from "@mui/material";
import { IconMenu2, IconX } from "@tabler/icons";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../asset/images/takshLogo.png";

// components
// import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useAuth, useCustomizer } from "../../hooks/hooks";
import { setAuthState } from "../../store/slices/authSlice";
import GradientButton from "../form/GradientButton";
import NormalButton from "../form/NormalButton";
import Profile from "./Profile";

const NavHeader = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);

  // drawer
  const customizer = useCustomizer();
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: "#070F2B",
    justifyContent: "center",
    position: "fixed",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled color="default">
      <ToolbarStyled
        sx={{
          padding: "1.5rem 1rem",
          marginY: "auto",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #4B4B4D21",
        }}
      >
        {!lgUp && (
          <>
            {!drop ? (
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => setDrop(true)}
              >
                <IconMenu2 size="24" />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={() => setDrop(false)}
              >
                <IconX size="24" />
              </IconButton>
            )}
          </>
        )}
        <div style={{ width: lgUp ? "25%" : "150px" }}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: lgUp ? "40%" : "100%",
              // marginTop: '18px',
              marginLeft: "2rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        {lgUp && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              width: "40%",
            }}
          >
            {/* <Link to='/courses'><Typography sx={{ color: '#2B527A', fontWeight: 'bold' }}>All Courses</Typography></Link> */}
            <ScrollLink
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
              to="coursetab"
              onClick={() => navigate("/")}
              spy={true}
              smooth={true}
              offset={-100}
            >
              Our Courses
            </ScrollLink>

            <ScrollLink
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
              to="about"
              onClick={() => navigate("/")}
              spy={true}
              smooth={true}
              offset={-100}
            >
              About Us
            </ScrollLink>
            <ScrollLink
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
              to="download"
              onClick={() => navigate("/")}
              spy={true}
              smooth={true}
              offset={-100}
            >
              Mobile App
            </ScrollLink>
            <ScrollLink
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
              to="educators"
              onClick={() => navigate("/")}
              spy={true}
              smooth={true}
              offset={-100}
            >
              Educators
            </ScrollLink>
            <ScrollLink
              style={{
                cursor: "pointer",
                color: "white",
                fontWeight: "bold",
              }}
              to="contact"
              onClick={() => navigate("/")}
              spy={true}
              smooth={true}
              offset={-100}
            >
              Contact
            </ScrollLink>
          </Box>
        )}
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="end"
          width="25%"
        >
          {/* <Language /> */}
          {/* ------------------------------------------- */}
          {/* Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Cart /> */}
          {/* ------------------------------------------- */}
          {/* End Ecommerce Dropdown */}
          {/* ------------------------------------------- */}
          {/* <Notifications /> */}
          {/* ------------------------------------------- */}
          {/* Toggle Right Sidebar for mobile */}
          {/* ------------------------------------------- */}
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          {isAuth ? (
            <Profile />
          ) : (
            <>
              {lgUp && (
                <Box
                  sx={{
                    width: "20vw",
                    marginX: "2rem !important",
                    display: "flex",
                  }}
                >
                  <NormalButton
                    text="Sign-in"
                    onClick={() => {
                      dispatch(setAuthState(1));
                    }}
                  />
                  <GradientButton
                    text="Enroll"
                    onClick={() => {
                      dispatch(setAuthState(5));
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Stack>
      </ToolbarStyled>
      <Collapse in={drop && !lgUp} timeout={500}>
        <Box
          sx={{
            padding: "2rem 0",
            display: "flex",
            flexDirection: "column",
            fontSize: "1.1rem",
            alignItems: "center",
            justifyContent: "start",
            gap: "2rem",
            height: "100vh",
            width: "100%",
          }}
        >
          <ScrollLink
            style={{ cursor: "pointer", color: "#2B527A", fontWeight: "bold" }}
            to="coursetab"
            onClick={() => {
              navigate("/");
              setDrop(false);
            }}
            spy={true}
            smooth={true}
            offset={-100}
          >
            Our Courses
          </ScrollLink>
          <ScrollLink
            style={{ cursor: "pointer", color: "#2B527A", fontWeight: "bold" }}
            to="about"
            onClick={() => {
              navigate("/");
              setDrop(false);
            }}
            spy={true}
            smooth={true}
            offset={-100}
          >
            About Us
          </ScrollLink>

          <ScrollLink
            style={{ cursor: "pointer", color: "#2B527A", fontWeight: "bold" }}
            to="download"
            onClick={() => {
              navigate("/");
              setDrop(false);
            }}
            spy={true}
            smooth={true}
            offset={-100}
          >
            Mobile App
          </ScrollLink>
          <ScrollLink
            style={{ cursor: "pointer", color: "#2B527A", fontWeight: "bold" }}
            to="educators"
            onClick={() => {
              navigate("/");
              setDrop(false);
            }}
            spy={true}
            smooth={true}
            offset={-100}
          >
            Educators
          </ScrollLink>
          <ScrollLink
            style={{ cursor: "pointer", color: "#2B527A", fontWeight: "bold" }}
            to="contact"
            onClick={() => {
              navigate("/");
              setDrop(false);
            }}
            spy={true}
            smooth={true}
            offset={-100}
          >
            Contact
          </ScrollLink>
          <Box sx={{ margin: "2rem !important" }}>
            <NormalButton
              text="Sign-in"
              onClick={() => {
                dispatch(setAuthState(1));
                setDrop(false);
              }}
            />
            <GradientButton
              text="Enroll"
              onClick={() => {
                dispatch(setAuthState(5));
                setDrop(false);
              }}
            />
          </Box>
        </Box>
      </Collapse>
    </AppBarStyled>
  );
};

NavHeader.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default NavHeader;
