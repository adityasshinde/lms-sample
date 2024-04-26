import { Box, Container, styled, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ConfirmationPopup from "../components/molecules/ConfirmationPopup";
import { useAuth, useCustomizer } from "../hooks/hooks";
import Backdrop from "../components/atoms/Backdrop";
import LMSHeader from "../components/lms/LMSHeader";
import { useState } from "react";
import Sidebar from "../components/navbar/Sidebar";
import BreadCrumb from "../components/navbar/BreadCrumbs";
import LoginPage from "../pages/LoginPage";
import { setAuthState } from "../store/slices/authSlice";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "white",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "0px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

const LMSLayout = () => {
  const dispatch = useDispatch();
  const customizer = useCustomizer();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { authState, redirectLocation } = useAuth();
  const [exitPopup, setExitPopup] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const openExitPopup = () => {
    setExitPopup(true);
  }
  const closeLoginPopup = () => {
    dispatch(setAuthState(0));
  };
  return (
    <div className="relative overflow-hidden">
      {/* {lgUp && <HeaderLine />} */}
      <MainWrapper
        className={
          customizer.activeMode === "dark"
            ? "darkbg mainwrapper"
            : "mainwrapper"
        }
      >
        {(authState > 0 && authState < 10) &&  <Backdrop open={authState > 0 && authState < 10}>
        <LoginPage close={closeLoginPopup}    />
      </Backdrop>}
        {exitPopup && (
          <ConfirmationPopup
            heading="Confirm Exit"
            message="Are you sure you want to exit?"
            acceptButton="Exit"
            onAccept={()=>{navigate('/courses')}}
            onCancel={() => setExitPopup(false)}
          />
        )}
        <Sidebar />
        <PageWrapper
        className="page-wrapper"
        sx={{
          [theme.breakpoints.up("lg")]: {
            ml: `${customizer.MiniSidebarWidth}`,
            width: "100%",
          },
        }}>
          <LMSHeader exitHandler={openExitPopup} />
          <Container
            maxWidth="100vw"
            sx={{
              padding: "0px !important",
              width: "calc(100%)",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)",width:'100%',bgcolor:'white !important'}}>
              <BreadCrumb/>
              <Outlet />
            </Box>
          </Container>
          {/* <Customizer /> */}
        </PageWrapper>
      </MainWrapper>
    </div>
  );
};

export default LMSLayout;
