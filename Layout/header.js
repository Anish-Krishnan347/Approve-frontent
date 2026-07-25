import {
  DarkModeRounded,
  LightModeRounded,
  MenuRounded,
  NotificationsNoneRounded,
  Person,
  Settings,
  Help,
  Logout,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useThemeMode } from "../Context/ThemeModeContext";
import { GlobalAction } from "../Context/globalActionContext";

const drawerWidth = 280;

const AdminHeader = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);
  const { user } = useContext(GlobalAction);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };
  const handleNotificationOpen = (event) =>
    setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);

  const notifications = [
    { id: 1, title: "New user registered", time: "2 min ago", unread: true },
    {
      id: 2,
      title: "Approval request pending",
      time: "15 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "System backup completed",
      time: "1 hour ago",
      unread: false,
    },
    { id: 4, title: "Weekly report ready", time: "2 hours ago", unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        backgroundColor: isDark
          ? alpha("#12131C", 0.75)
          : alpha("#FFFFFF", 0.8),
        backdropFilter: "blur(14px)",
        color: "text.primary",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: { xs: 64, md: 72 } }}>
        <IconButton
          onClick={onDrawerToggle}
          sx={{ mr: 1.5, display: { md: "none" } }}
        >
          <MenuRounded />
        </IconButton>

        {/* Brand mark */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mr: 3 }}>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 800,
              letterSpacing: -0.3,
            }}
          >
            Approve
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.75, ml: "auto" }}
        >
          <Tooltip
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton onClick={toggleMode} sx={{ color: "text.secondary" }}>
              {isDark ? (
                <LightModeRounded fontSize="small" />
              ) : (
                <DarkModeRounded fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationOpen}
              sx={{ color: "text.secondary" }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsNoneRounded fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 0.5 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                fontSize: "0.9rem",
                fontWeight: 700,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              {user?.name?.charAt(0).toUpperCase() +
                user?.name?.charAt(1).toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{ paper: { sx: { mt: 1, minWidth: 200 } } }}
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <Person sx={{ mr: 1.5 }} fontSize="small" /> Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Settings sx={{ mr: 1.5 }} fontSize="small" /> Settings
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Help sx={{ mr: 1.5 }} fontSize="small" /> Help
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
            <Logout sx={{ mr: 1.5 }} fontSize="small" /> Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{ paper: { sx: { mt: 1, width: 340, maxHeight: 420 } } }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNotificationClose}
              sx={{
                display: "block",
                py: 1.25,
                backgroundColor: notification.unread
                  ? alpha(theme.palette.primary.main, isDark ? 0.14 : 0.06)
                  : "transparent",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: notification.unread ? 700 : 500 }}
                >
                  {notification.title}
                </Typography>
                {notification.unread && (
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      ml: 1,
                      mt: 0.5,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </MenuItem>
          ))}
          <Box sx={{ p: 1.5, borderTop: 1, borderColor: "divider" }}>
            <Button fullWidth size="small" variant="text">
              View all notifications
            </Button>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default AdminHeader;
