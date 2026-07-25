"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { useTheme, alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { GlobalAction } from "../../Context/globalActionContext";
import { useThemeMode } from "../../Context/ThemeModeContext";
import { loginFunction } from "@/pages/api/auth_apies";
import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // ⛔ Prevent page reload on form submit
    if (!loginData?.email || !loginData?.password) {
      setIsLoading((prev) => ({
        ...prev,
        error: "All fields are required",
      }));
      return;
    }
    const req = await loginFunction(loginData, setIsLoading, router);
    if (req?.status_code === 200) {
      const userData = JSON.stringify(req?.data);
      localStorage.setItem("userData", userData);
      router.push("/dashboard");
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);   
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "background.default",
        backgroundImage: isDark
          ? `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.25)} 0%, transparent 45%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.18)} 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 45%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
        p: 2,
      }}
    >
      <IconButton
        onClick={toggleMode}
        sx={{ position: "absolute", top: 20, right: 20, color: "text.secondary" }}
      >
        {isDark ? <LightModeRounded /> : <DarkModeRounded />}
      </IconButton>

      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: isDark
              ? "0 24px 60px rgba(0,0,0,0.5)"
              : "0 24px 60px rgba(30,27,60,0.14)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 60%, ${theme.palette.secondary.main} 140%)`,
              color: "#fff",
              p: 4,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                mx: "auto",
                mb: 2,
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800,
                fontSize: "1.3rem",
                backgroundColor: "rgba(255,255,255,0.16)",
                backdropFilter: "blur(6px)",
              }}
            >
              A
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Sign in to your account
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        color={loginData?.email ? "error" : "action"}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        color={loginData?.password ? "error" : "action"}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mb: 3, py: 1.5, borderRadius: 2 }}
              >
                Sign In
              </Button>

              {isLoading?.error && (
                <Typography variant="body2" color="error">
                  {isLoading?.error}
                </Typography>
              )}

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: "#db4437",
                    color: "#db4437",
                    "&:hover": {
                      borderColor: "#db4437",
                      backgroundColor: "rgba(219, 68, 55, 0.1)",
                    },
                  }}
                >
                  Google
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
