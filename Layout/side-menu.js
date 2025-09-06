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
  Typography,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { menuData } from "../Components/DefaultValues/SideMenuDatas";
import { Close, Home } from "@mui/icons-material";
import { useRouter } from "next/router";

// Sample menu data with 3 levels of nesting

const SideMenuItem = ({ item, level = 0, activePath, setActivePath }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activePath === item.path;
  const router = useRouter();
  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (item.path) {
      setActivePath(item.path);
      router.push(item.path);
    }
  };

  const paddingLeft = 16 + level * 16;
  const IconComponent = item.icon;

  return (
    <>
      <ListItem sx={{py:0,px:1}}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            pl: `${paddingLeft}px`,
            minHeight: 48,
            backgroundColor: isActive
              ? "rgba(25, 118, 210, 0.08)"
              : "transparent",
            borderLeft: isActive ? "5px solid #1976d2" : "none",
            borderTopLeftRadius: isActive ? "8px" : "none",
            borderBottomLeftRadius: isActive ? "8px" : "none",
            borderTopRightRadius: isActive ? "8px" : "none",
            borderBottomRightRadius: isActive ? "8px" : "none",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: isActive ? "#1976d2" : "rgba(0, 0, 0, 0.6)",
            }}
          >
            <IconComponent fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: level === 0 ? "0.95rem" : "0.875rem",
              fontWeight: isActive ? 600 : level === 0 ? 500 : 400,
              color: isActive ? "#1976d2" : "inherit",
            }}
          />
          {hasChildren && (
            <IconButton size="small" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SideMenuItem
                key={child.id}
                item={child}
                level={level + 1}
                activePath={activePath}
                setActivePath={setActivePath}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const SideMenu = ({ open, onClose, width = 280 }) => {
  const [activePath, setActivePath] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  const drawerContent = (
    <Box
      sx={{
        width,
        height: "100%",
        // borderRight: "2px solid #ccc",
        boxSizing: "border-box", // ensures border is included within the width
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <List sx={{ py: 1 }}>
          {menuData.map((item) => (
            <SideMenuItem
              key={item.id}
              item={item}
              level={0}
              activePath={activePath}
              setActivePath={setActivePath}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          // display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            top: 64, // Adjust to below AppBar
            height: "calc(100% - 64px)",
            position: "fixed", // stays below the header
            borderRight: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(0,0,0,0.12)",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default function SideMenuPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideMenu open={mobileOpen} onClose={handleDrawerToggle} width={280} />
    </Box>
  );
}
