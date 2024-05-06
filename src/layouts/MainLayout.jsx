import { Box, Container, styled, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavHeader from "../components/navbar/Header";
import Sidebar from "../components/navbar/Sidebar";
// import Customizer from '../components/common/Customizer';
import { useDispatch } from "react-redux";
import Backdrop from "../components/atoms/Backdrop";
import Footer from "../components/footer/Footer";
import { useAuth, useCustomizer } from "../hooks/hooks";
import LoginPage from "../pages/LoginPage";
import {
  setAuthState,
} from "../store/slices/authSlice";


const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100vw",
  backgroundColor: "#070F2B",
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

const MainLayout = () => {
  const dispatch = useDispatch();
  const customizer = useCustomizer();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { authState,isAuth} = useAuth();
  const theme = useTheme();
  const closeLoginPopup = () => {
    dispatch(setAuthState(0));
  };

  return (
    <div className="relative overflow-hidden">
      {(isAuth && authState!==7 && authState!==8)?<Navigate to='/lms/my_courses' />
      :<MainWrapper
      className={
        customizer.activeMode === "dark"
          ? "darkbg mainwrapper"
          : "mainwrapper"
      }
    >
    {(authState > 0 && authState < 10) &&  <Backdrop open={authState > 0 && authState < 10}>
        <LoginPage close={closeLoginPopup} />
      </Backdrop>}
      {/* <Sidebar /> */}

      <PageWrapper
        className="page-wrapper"
        sx={{
          [theme.breakpoints.up("lg")]: {
            ml: `0`,
            width: "calc(100%)",
          },
        }}
      >
        <NavHeader />

        <Container
          sx={{
            padding: "0px !important",
            maxWidth:
              customizer.isLayout === "boxed" ? "lg" : "100%!important",
              mt: "87px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Outlet />
            <div style={{ height: 100 }}></div>
            <Footer />
          </Box>
        </Container>
        {/* <Customizer /> */}
      </PageWrapper>
    </MainWrapper>}
    </div>
  );
};

export default MainLayout;
