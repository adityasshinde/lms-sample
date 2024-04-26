import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
// mui imports
import {
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCustomizer } from "../../hooks/hooks";

const NavItem = ({ item, level, pathDirect, onClick, hideMenu }) => {
  const customizer = useCustomizer();
  const Icon = item.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? (
      <Icon stroke={2} size="24px" />
    ) : (
      <Icon stroke={2} size="24px" />
    );

  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: "nowrap",
    marginBottom: "2px",
    padding: "8px 10px",
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: "transparent !important",
    color:
      level > 1 && pathDirect === item.href
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main,
    },
  }));

  return (
    <List
      component="li"
      disablePadding
      key={item.id}
      // style={{ backgroundColor: "red", width: "100%" }}
    >
      <ListItemStyled
        button
        component={item.external ? "a" : NavLink}
        to={item.href}
        href={item.external ? item.href : ""}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? "_blank" : ""}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: "30px",
            p: "4px",
            mr: "8px",
            color:
              pathDirect === item.href
                ? `#207EB8 !important`
                : "#4B4B4D",
            border:
              pathDirect === item.href ? "1px solid transparent" : "inherit",
            borderRadius: pathDirect === item.href ? "50%" : "inherit",
            boxShadow:
              pathDirect === item.href
                ? "0px 10px 16px rgba(0, 0, 0, 0.1), 0px 8px 13px rgba(0, 0, 0, 0.08)"
                : "#4B4B4D",
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? "" : <>{t(`${item.title}`)}</>}
          <br />
          {item.subtitle ? (
            <Typography variant="caption">
              {hideMenu ? "" : item.subtitle}
            </Typography>
          ) : (
            ""
          )}
        </ListItemText>

        {!item.chip || hideMenu ? null : (
          <Chip
            color={item.chipColor}
            variant={item.variant ? item.variant : "filled"}
            size="small"
            label={item.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};

export default NavItem;
