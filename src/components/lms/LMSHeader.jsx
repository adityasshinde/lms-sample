import React from "react";
import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleSidebar, toggleMobileSidebar } from "../../store/slices/customizerSlice";
import { IconChevronLeft, IconLogout, IconMenu2 } from "@tabler/icons";
import logo from '../../asset/images/takshLogo.png';



// components
// import Notifications from "./Notifications";
import Profile from "../navbar/Profile";
import Search from "../navbar/Search";
import MobileRightSidebar from "../navbar/MobileRightSidebar";
import { useAuth, useCustomizer, useLMS } from "../../hooks/hooks";
import GradientButton from "../form/GradientButton";
import { setAuthState } from "../../store/slices/authSlice";
import NormalButton from "../form/NormalButton";
import { useLocation, useNavigate } from "react-router-dom";
import { setSidebar } from "../../store/slices/lmsSlice";
import { RiMenu2Fill } from "react-icons/ri";

const LMSHeader = ({ exitHandler }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { lmsSidebarOpen } = useLMS();
  const { pathname } = useLocation();
  const isSubjectPage = pathname.split('/').length > 5;
  // drawer
  const customizer = useCustomizer();
  const dispatch = useDispatch();
  // const zIndex = 
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    position: 'sticky',
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
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{ padding: '1rem', marginY: 'auto', display: 'flex', alignItems: 'center', justifyContent: customizer.isSidebarHover ? 'end' : 'space-between', borderBottom: '1px solid #4B4B4D21' }}>
        {/* {!isSubjectPage && <a onClick={exitHandler} style={{color:"#B22222",fontWeight:'bold',display:'flex',fontSize:'1rem',cursor:'pointer'}}><IconChevronLeft style={{cursor:"pointer",}} size={24}/>Back</a>} */}
        {isSubjectPage && !lgUp && <IconMenu2 size={24} onClick={() => dispatch(setSidebar(!lmsSidebarOpen))} />}

        {!customizer.isSidebarHover &&
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: lgUp?'start':'center', gap: '1rem' }}>
            {!lgUp && <RiMenu2Fill
            color="#4B4B4D"
            size="1.5rem"
            onClick={() => dispatch(toggleMobileSidebar())}
          />} 
          <img
              src={logo}
              alt='logo'
              style={{
                width: lgUp ? '10%' : '100px',
                // marginTop: '18px',
                marginLeft: lgUp ? '1rem' : '0',
                cursor: 'pointer'
              }}
              onClick={() => {
                navigate('/');
              }}
            /></div>}
        <Stack spacing={1} direction="row" alignItems="center">
          {/* {lgDown ? <MobileRightSidebar /> : null} */}
          {/* <a onClick={exitHandler}><Typography sx={{display:'flex',color:'#B22222',cursor:'pointer',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}><IconLogout style={{marginRight:'5px',transform: "rotate(-180deg)",}} size={24}/>Exit</Typography></a> */}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

LMSHeader.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default LMSHeader;
