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
  Divider,
  alpha,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { menuData } from "../Components/DefaultValues/SideMenuDatas";
import { useRouter } from "next/router";

const drawerWidth = 280;

const SideMenuItem = ({ item, level = 0, activePath, setActivePath, onNavigate }) => {
  const theme = useTheme();
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
      onNavigate?.();
    }
  };

  const IconComponent = item.icon;

  return (
    <>
      <ListItem sx={{ py: 0.25, px: 1.25 }}>
        <ListItemButton
          onClick={handleClick}
          sx={{
            pl: `${12 + level * 16}px`,
            pr: 1,
            minHeight: 44,
            position: "relative",
            color: isActive ? "primary.main" : "text.secondary",
            backgroundColor: isActive
              ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.16 : 0.08)
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
                ? alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.2 : 0.1)
                : "action.hover",
              color: isActive ? "primary.main" : "text.primary",
            },
            transition: "background-color 0.15s ease, color 0.15s ease",
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            <IconComponent fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: level === 0 ? "0.875rem" : "0.82rem",
              fontWeight: isActive ? 700 : 500,
              color: "inherit",
              noWrap: true,
            }}
          />
          {hasChildren && (open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />)}
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
                onNavigate={onNavigate}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const DrawerContent = ({ activePath, setActivePath, onNavigate }) => (
  <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography
        variant="overline"
        sx={{ color: "text.disabled", fontSize: "0.68rem", pl: 1.5 }}
      >
        Workspace
      </Typography>
    </Box>
    <Divider sx={{ mx: 1.5, mb: 1 }} />
    <Box sx={{ flexGrow: 1, overflowY: "auto", pb: 2 }}>
      <List sx={{ py: 0.5 }}>
        {menuData.map((item) => (
          <SideMenuItem
            key={item.id}
            item={item}
            level={0}
            activePath={activePath}
            setActivePath={setActivePath}
            onNavigate={onNavigate}
          />
        ))}
      </List>
    </Box>
  </Box>
);

export default function SideMenuPage({ mobileOpen = false, onClose }) {
  const theme = useTheme();
  const [activePath, setActivePath] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            top: 72,
            height: "calc(100% - 72px)",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.default",
          },
        }}
        open
      >
        <DrawerContent activePath={activePath} setActivePath={setActivePath} />
      </Drawer>

      {/* Mobile temporary drawer */}
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
        <DrawerContent activePath={activePath} setActivePath={setActivePath} onNavigate={onClose} />
      </Drawer>
    </Box>
  );
}
