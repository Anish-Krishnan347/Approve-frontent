"use client";

import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Group,
  HowToReg,
  LockPerson,
  TaskAlt,
  TrendingUp,
  ArrowUpwardRounded,
} from "@mui/icons-material";

const statCards = [
  {
    label: "Total users",
    value: "1,248",
    delta: "+8.2%",
    icon: Group,
    color: "primary",
  },
  {
    label: "Pending approvals",
    value: "36",
    delta: "+3 today",
    icon: HowToReg,
    color: "warning",
  },
  {
    label: "Active roles",
    value: "12",
    delta: "stable",
    icon: LockPerson,
    color: "secondary",
  },
  {
    label: "Permission requests",
    value: "184",
    delta: "+14.6%",
    icon: TaskAlt,
    color: "success",
  },
];

const recentApprovals = [
  { name: "Priya Sharma", request: "Leave request · 3 days", status: "Pending" },
  { name: "Rahul Dev", request: "Role change to Moderator", status: "Approved" },
  { name: "Anish Krishnan", request: "Permission: Export data", status: "Pending" },
  { name: "Meera Nair", request: "Leave request · 1 day", status: "Rejected" },
];

const statusColor = {
  Pending: "warning",
  Approved: "success",
  Rejected: "error",
};

const roleDistribution = [
  { role: "Employee", count: 812, pct: 65 },
  { role: "HR", count: 264, pct: 21 },
  { role: "Admin", count: 172, pct: 14 },
];

const StatCard = ({ label, value, delta, icon: Icon, color }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        p: 2.5,
        flex: "1 1 220px",
        minWidth: 220,
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "12px",
            display: "grid",
            placeItems: "center",
            color: `${color}.main`,
            backgroundColor: alpha(theme.palette[color].main, theme.palette.mode === "dark" ? 0.18 : 0.1),
          }}
        >
          <Icon fontSize="small" />
        </Box>
        <Chip
          size="small"
          icon={<ArrowUpwardRounded sx={{ fontSize: "14px !important" }} />}
          label={delta}
          sx={{
            bgcolor: alpha(theme.palette.success.main, theme.palette.mode === "dark" ? 0.16 : 0.1),
            color: "success.main",
            fontSize: "0.7rem",
          }}
        />
      </Stack>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Card>
  );
};

const DashboardView = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto" }}>
      {/* Welcome banner */}
      <Card
        sx={{
          p: { xs: 3, md: 4 },
          mb: 3,
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.secondary.main} 130%)`,
          border: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 45%)",
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ position: "relative" }}
        >
          <Box>
            <Typography variant="overline" sx={{ opacity: 0.85 }}>
              Welcome back
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              Here's what needs your attention
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mt: 1, maxWidth: 480 }}>
              36 approvals are waiting for review and 3 permission changes were
              requested in the last 24 hours.
            </Typography>
          </Box>
          <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { border: "2px solid rgba(255,255,255,0.5)" } }}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>PS</Avatar>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>RD</Avatar>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>AK</Avatar>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>MN</Avatar>
          </AvatarGroup>
        </Stack>
      </Card>

      {/* Stat cards */}
      <Stack direction="row" flexWrap="wrap" gap={2.5} sx={{ mb: 3 }}>
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5}>
        {/* Recent approvals */}
        <Card sx={{ p: 3, flex: "2 1 0" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Recent approval activity</Typography>
            <Chip size="small" label="Last 24h" variant="outlined" />
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <Stack divider={<Divider />}>
            {recentApprovals.map((item) => (
              <Stack
                key={item.name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 1.5 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      bgcolor: alpha(theme.palette.primary.main, isDark ? 0.22 : 0.12),
                      color: "primary.main",
                    }}
                  >
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.request}
                    </Typography>
                  </Box>
                </Stack>
                <Chip size="small" label={item.status} color={statusColor[item.status]} variant="filled" />
              </Stack>
            ))}
          </Stack>
        </Card>

        {/* Role distribution */}
        <Card sx={{ p: 3, flex: "1 1 0" }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <TrendingUp fontSize="small" color="secondary" />
            <Typography variant="h6">Role distribution</Typography>
          </Stack>
          <Stack spacing={2.5}>
            {roleDistribution.map((r) => (
              <Box key={r.role}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {r.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {r.count}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={r.pct}
                  sx={{
                    height: 8,
                    borderRadius: 6,
                    bgcolor: alpha(theme.palette.primary.main, isDark ? 0.14 : 0.08),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 6,
                      backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default DashboardView;
