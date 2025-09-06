import {
  DarkMode,
  Fullscreen,
  FullscreenExit,
  HomeFilled,
  LightMode,
  NotificationsNone,
  NotificationsNoneOutlined,
  Person,
  Search,
  //   MenuIcon,
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
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const AdminHeader = ({ onDrawerToggle, darkMode, setDarkMode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const notifications = [
    { id: 1, title: "New user registered", time: "2 min ago", unread: true },
    { id: 2, title: "Order #1234 completed", time: "15 min ago", unread: true },
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
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          {/* <MenuIcon /> */}
        </IconButton>

        {/* Logo/Title */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
            }}
          >
            APPROVE
          </Typography>
        </Box>

        {/* Header Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
          {/* Dark Mode Toggle */}
          <IconButton
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Notifications */}
          <IconButton color="inherit" onClick={handleNotificationOpen}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsNoneOutlined />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                fontSize: "1rem",
              }}
            >
              JD
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
        >
          <MenuItem onClick={handleProfileMenuClose}>
            <Person sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Settings sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <Help sx={{ mr: 2 }} />
            Help
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            sx: { width: 320, maxHeight: 400 },
          }}
        >
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNotificationClose}
              sx={{
                display: "block",
                py: 1.5,
                backgroundColor: notification.unread
                  ? "rgba(25, 118, 210, 0.05)"
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
                  sx={{ fontWeight: notification.unread ? 600 : 400 }}
                >
                  {notification.title}
                </Typography>
                {notification.unread && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      ml: 1,
                    }}
                  />
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </MenuItem>
          ))}
          <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
            <Button fullWidth size="small">
              View All Notifications
            </Button>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default AdminHeader;
