import React from "react";
import SideMenuPage from "./side-menu";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "@/ThemePrimitives/theme";
import AdminHeader from "./header";
const drawerWidth = 280;

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = React.useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Fixed Header */}
      <AdminHeader
        onDrawerToggle={handleDrawerToggle}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Body Wrapper */}
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Sidebar */}
        <SideMenuPage />

        {/* Main Content */}
        <main
          style={{
            flexGrow: 1,
            padding: "24px",
            paddingTop: "88px", // top padding for header
            paddingLeft: "280px", // left padding for sidebar
            minHeight: "100vh",
            backgroundColor: theme.palette.background.default,
            marginLeft:'10px'
          }}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
