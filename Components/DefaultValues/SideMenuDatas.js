import {
  Dashboard as DashboardIcon,
  Analytics,
  People,
  TaskAlt,
  LockPerson,
  HowToReg,
  ChatBubbleOutlineRounded,
  Settings,
} from "@mui/icons-material";

export const menuData = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    id: "user",
    title: "User Management",
    icon: People,
    path: "/user",
  },
  {
    id: "permission",
    title: "Permission",
    path: "/permission",
    icon: LockPerson,
  },
  {
    id: "chat",
    title: "We Chat",
    path: "/chat",
    icon: ChatBubbleOutlineRounded,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    children: [
      {
        id: "approval",
        title: "User Approval",
        path: "/approval",
        icon: HowToReg,
      },
      {
        id: "role",
        title: "Role Management",
        icon: Analytics,
        path: "/role",
      },
      {
        id: "permission_approval",
        title: "Permission Approval",
        path: "/permission_approval",
        icon: TaskAlt,
      },
    ],
  },
];
