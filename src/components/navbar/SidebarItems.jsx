import React from "react";
import { StudentMenuItems } from "./MenuItems";
import { Box, List, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { useAuth, useCustomizer } from "../../hooks/hooks";
import { setAuthState } from "../../store/slices/authSlice";
import { hoverSidebar, toggleMobileSidebar } from "../../store/slices/customizerSlice";
import GradientButton from "../form/GradientButton";
import NormalButton from "../form/NormalButton";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useCustomizer();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { isAuth } = useAuth();
  const hideMenu = lgUp ? !customizer.isSidebarHover : "";
  const dispatch = useDispatch();

  const menuItems = StudentMenuItems;

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 5 }} className="sidebarNav">
        {menuItems.map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => {
                  dispatch(toggleMobileSidebar());
                  dispatch(hoverSidebar(false));
                }}
              />
            );
          }
        })}
        {!isAuth && !lgUp && (
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: "8rem" }}>
            <NormalButton
              text="Sign-in"
              onClick={() => {
                dispatch(setAuthState(1));
                dispatch(toggleMobileSidebar());
              }}
            />
            <GradientButton
              text="Enroll"
              onClick={() => {
                dispatch(setAuthState(5));
                dispatch(toggleMobileSidebar());
              }}
            />
          </Box>
        )}
      </List>
    </Box>
  );
};
export default SidebarItems;
