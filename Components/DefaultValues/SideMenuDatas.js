import {
  Dashboard as DashboardIcon,
  Analytics,
  People,
  TaskAlt,
  LockPerson,
  HowToReg,
  ChatBubbleOutlineRounded,
} from "@mui/icons-material";

export const menuData = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    id: "role",
    title: "Role Management",
    icon: Analytics,
    path: "/role",
  },
  {
    id: "user",
    title: "User Management",
    icon: People,
    path: "/user",
  },
  {
    id: "approval",
    title: "User Approval",
    path: "/approval",
    icon: HowToReg,
  },
  {
    id: "permission",
    title: "Permission Management",
    path: "/permission",
    icon: LockPerson,
  },
  {
    id: "permission_approval",
    title: "Permission Approval",
    path: "/permission_approval",
    icon: TaskAlt,
  },
  {
    id: "chat",
    title: "Chat",
    path: "/chat",
    icon: ChatBubbleOutlineRounded,
  },
];
