import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery } from "@mui/material";
import SideMenuPage from "./side-menu";
import AdminHeader from "./header";

const drawerWidth = 280;
const collapsedWidth = 76;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleCollapseToggle = () => setCollapsed((prev) => !prev);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0) 45%)"
            : "radial-gradient(circle at 15% 0%, rgba(67,56,163,0.06) 0%, rgba(67,56,163,0) 45%)",
      }}
    >
      <AdminHeader onDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex" }}>
        <SideMenuPage
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
          collapsed={collapsed}
          onToggleCollapse={handleCollapseToggle}
        />

        <Box
          component="main"
          sx={{
            width: "100%",
            px: { xs: 2, sm: 3, md: 4 },
            pt: { xs: "80px", md: "88px" },
            ml: { md: `${collapsed ? collapsedWidth : drawerWidth}px` },
            transition: theme.transitions.create("margin-left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
