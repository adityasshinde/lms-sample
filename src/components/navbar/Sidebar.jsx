import { Box, Divider, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import logo from "../../asset/images/takshLogo.png";
import {
  hoverSidebar,
  toggleMobileSidebar,
} from "../../store/slices/customizerSlice";
import Scrollbar from "./Scrollbar";
// import LogoutProfile from './LogoutProfile';
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useCustomizer } from "../../hooks/hooks";
import SidebarItems from "./SidebarItems";
import { IconChevronLeft } from "@tabler/icons";

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const customizer = useCustomizer();
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth = !customizer.isSidebarHover
    ? customizer.MiniSidebarWidth
    : customizer.SidebarWidth;

  const onHoverEnter = () => {
    dispatch(hoverSidebar(true));
  };
  // if(lgUp){
  //   dispatch(hoverSidebar(true));
  // }

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  const navigate = useNavigate();

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          position: "absolute",
          boxShadow: "8px 5px 4px rgba(0, 0, 0, 0.2) !important",
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create("width", {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: "border-box",
              boxShadow:
                "0px 2px 16.200000762939453px 0px #66666626 !important",
            },
          }}
        >
          <Box
            sx={{
              backgroundColor:
                customizer.activeSidebarBg === "#ffffff" &&
                customizer.activeMode === "dark"
                  ? customizer.darkBackground900
                  : customizer.activeSidebarBg,
              color: customizer.activeSidebarBg === "#ffffff" ? "" : "white",
              height: "100%",
            }}
          >
            <Box
              px={3}
              alignItems={"center"}
              justifyItems={"center"}
              display={"flex"}
              flexDirection={"column"}
            >
              {customizer.isSidebarHover ? (
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: "65%",
                    height: "60%",
                    marginTop: "28px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                />
              ) : (
                <RiMenu2Fill
                  color="#4B4B4D"
                  size="1.5rem"
                  style={{ marginTop: "27px" }}
                />
              )}
            </Box>
            <Divider
              sx={{
                marginTop: customizer.isSidebarHover ? "1.35rem" : "2.5rem",
                color: "#4B4B4D",
              }}
            />
            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          backgroundColor:
            customizer.activeMode === "dark"
              ? customizer.darkBackground900
              : customizer.activeSidebarBg,
          color: customizer.activeSidebarBg === "#ffffff" ? "" : "white",
          border: "0 !important",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box
        px={3}
        alignItems={"center"}
        justifyItems={"center"}
        display={"flex"}
        position='relative'
        flexDirection={"column"}
      >
        {!lgUp && <div onClick={()=>dispatch(toggleMobileSidebar())} style={{position:'absolute',top:'28px',left:'8px',fontWeight:'800'}}><IconChevronLeft size={28} color="#4B4B4D"  /></div> }
        <img
          src={logo}
          alt="logo"
          style={{
            width: "70%",
            height: "75%",
            marginTop: "18px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        />
      </Box>
      {/* <Divider sx={{color:'black',height:'10px', marginY:'10px'}}/> */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
