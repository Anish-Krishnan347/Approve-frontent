"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { menuData } from "../Components/DefaultValues/SideMenuDatas";
import { useRouter } from "next/router";

const drawerWidth = 280;
const collapsedWidth = 76;

const SideMenuItem = ({
  item,
  level = 0,
  activePath,
  setActivePath,
  onNavigate,
  collapsed,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activePath === item.path;
  const router = useRouter();

  const handleClick = () => {
    if (hasChildren) {
      if (collapsed) return; // no flyout in collapsed mode, just icons
      setOpen(!open);
    } else if (item.path) {
      setActivePath(item.path);
      router.push(item.path);
      onNavigate?.();
    }
  };

  const IconComponent = item.icon;

  const button = (
    <ListItemButton
      onClick={handleClick}
      sx={{
        pl: collapsed ? 0 : `${12 + level * 16}px`,
        pr: collapsed ? 0 : 1,
        minHeight: 44,
        justifyContent: collapsed ? "center" : "flex-start",
        position: "relative",
        color: isActive ? "primary.main" : "text.secondary",
        backgroundColor: isActive
          ? alpha(
              theme.palette.primary.main,
              theme.palette.mode === "dark" ? 0.16 : 0.08,
            )
          : "transparent",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 6,
          bottom: 6,
          width: 3,
          borderRadius: 4,
          backgroundColor: isActive ? "primary.main" : "transparent",
          transition: "background-color 0.15s ease",
        },
        "&:hover": {
          backgroundColor: isActive
            ? alpha(
                theme.palette.primary.main,
                theme.palette.mode === "dark" ? 0.2 : 0.1,
              )
            : "action.hover",
          color: isActive ? "primary.main" : "text.primary",
        },
        transition:
          "background-color 0.15s ease, color 0.15s ease, padding 0.2s ease",
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: collapsed ? 0 : 36,
          color: "inherit",
          justifyContent: "center",
        }}
      >
        <IconComponent fontSize="small" />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            fontSize: level === 0 ? "0.875rem" : "0.82rem",
            fontWeight: isActive ? 700 : 500,
            color: "inherit",
            noWrap: true,
          }}
        />
      )}
      {!collapsed &&
        hasChildren &&
        (open ? (
          <ExpandLess fontSize="small" />
        ) : (
          <ExpandMore fontSize="small" />
        ))}
    </ListItemButton>
  );

  return (
    <>
      <ListItem sx={{ py: 0.25, px: collapsed ? 0.75 : 1.25 }}>
        {collapsed ? (
          <Tooltip title={item.title} placement="right" arrow>
            <Box sx={{ width: "100%" }}>{button}</Box>
          </Tooltip>
        ) : (
          button
        )}
      </ListItem>

      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SideMenuItem
                key={child.id}
                item={child}
                level={level + 1}
                activePath={activePath}
                setActivePath={setActivePath}
                onNavigate={onNavigate}
                collapsed={collapsed}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const DrawerContent = ({
  activePath,
  setActivePath,
  onNavigate,
  collapsed,
  onToggleCollapse,
}) => (
  <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", pb: 2 }}>
      <List sx={{ py: 0.5 }}>
        {menuData.map((item) => (
          <SideMenuItem
            key={item.id}
            item={item}
            level={0}
            activePath={activePath}
            setActivePath={setActivePath}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
        ))}
      </List>
    </Box>

    {onToggleCollapse && (
      <Box
        sx={{
          borderTop: (t) => `1px solid ${t.palette.divider}`,
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton size="small" onClick={onToggleCollapse}>
          {collapsed ? (
            <ChevronRight fontSize="small" />
          ) : (
            <ChevronLeft fontSize="small" />
          )}
        </IconButton>
      </Box>
    )}
  </Box>
);

export default function SideMenuPage({
  mobileOpen = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
}) {
  const theme = useTheme();
  const [activePath, setActivePath] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <Box component="nav">
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: collapsed ? collapsedWidth : drawerWidth,
            top: 72,
            height: "calc(100% - 72px)",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.default",
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        <DrawerContent
          activePath={activePath}
          setActivePath={setActivePath}
          collapsed={collapsed}
          onToggleCollapse={onToggleCollapse}
        />
      </Drawer>

      {/* Mobile temporary drawer (always full width, no collapse) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerContent
          activePath={activePath}
          setActivePath={setActivePath}
          onNavigate={onClose}
          collapsed={false}
        />
      </Drawer>
    </Box>
  );
}
