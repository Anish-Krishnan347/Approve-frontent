// theme.js
// Design system for "Approve" — an enterprise roles / users / approvals console.
// Palette: deep indigo (authority, primary actions) + teal (approve / success)
// paired against amber (pending) and rose (reject) status colors.
import { createTheme, alpha } from "@mui/material/styles";

const brand = {
  indigo50: "#EEF0FD",
  indigo100: "#E0E4FB",
  indigo400: "#6366F1",
  indigo500: "#4F46E5",
  indigo600: "#4338CA",
  indigo700: "#3730A3",
  indigo900: "#211C4E",
  teal400: "#2DD4BF",
  teal500: "#14B8A6",
  teal600: "#0D9488",
  amber500: "#D97706",
  amber400: "#F59E0B",
  rose500: "#E11D48",
  rose400: "#FB7185",
  sky500: "#0284C7",
};

const lightPalette = {
  mode: "light",
  primary: {
    main: brand.indigo600,
    light: brand.indigo400,
    dark: brand.indigo700,
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: brand.teal600,
    light: brand.teal400,
    dark: "#0F766E",
    contrastText: "#FFFFFF",
  },
  success: { main: "#16A34A", light: "#4ADE80", dark: "#15803D", contrastText: "#FFFFFF" },
  warning: { main: brand.amber500, light: brand.amber400, dark: "#B45309", contrastText: "#FFFFFF" },
  error: { main: brand.rose500, light: brand.rose400, dark: "#BE123C", contrastText: "#FFFFFF" },
  info: { main: brand.sky500, light: "#38BDF8", dark: "#0369A1", contrastText: "#FFFFFF" },
  background: {
    default: "#F4F5FB",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1C1B2E",
    secondary: "#666B85",
    disabled: "#A3A6BF",
  },
  divider: alpha(brand.indigo600, 0.1),
  action: {
    hover: alpha(brand.indigo600, 0.06),
    selected: alpha(brand.indigo600, 0.1),
  },
};

const darkPalette = {
  mode: "dark",
  primary: {
    main: brand.indigo400,
    light: "#A5B4FC",
    dark: brand.indigo500,
    contrastText: "#14121F",
  },
  secondary: {
    main: brand.teal400,
    light: "#5EEAD4",
    dark: brand.teal600,
    contrastText: "#0B1220",
  },
  success: { main: "#4ADE80", light: "#86EFAC", dark: "#16A34A", contrastText: "#0B1220" },
  warning: { main: brand.amber400, light: "#FBBF24", dark: brand.amber500, contrastText: "#0B1220" },
  error: { main: brand.rose400, light: "#FDA4AF", dark: brand.rose500, contrastText: "#0B1220" },
  info: { main: "#38BDF8", light: "#7DD3FC", dark: brand.sky500, contrastText: "#0B1220" },
  background: {
    default: "#0D0F17",
    paper: "#161925",
  },
  text: {
    primary: "#EDEEF7",
    secondary: "#9599B5",
    disabled: "#5C607A",
  },
  divider: "rgba(255,255,255,0.08)",
  action: {
    hover: "rgba(255,255,255,0.06)",
    selected: "rgba(129,140,248,0.16)",
  },
};

const fontDisplay = '"Plus Jakarta Sans", "Inter", "Segoe UI", sans-serif';
const fontBody = '"Inter", "Segoe UI", sans-serif';

export const getTheme = (mode) => {
  const palette = mode === "dark" ? darkPalette : lightPalette;
  const isDark = mode === "dark";

  const theme = createTheme({
    palette,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: fontBody,
      h1: { fontFamily: fontDisplay, fontWeight: 700 },
      h2: { fontFamily: fontDisplay, fontWeight: 700 },
      h3: { fontFamily: fontDisplay, fontWeight: 700 },
      h4: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: -0.5 },
      h5: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: -0.3 },
      h6: { fontFamily: fontDisplay, fontWeight: 600, letterSpacing: -0.2 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: "none", letterSpacing: 0.1 },
      caption: { letterSpacing: 0.2 },
      overline: { letterSpacing: 1.2, fontWeight: 700 },
    },
    shadows: isDark
      ? [
          "none",
          "0 1px 2px rgba(0,0,0,0.4)",
          "0 2px 6px rgba(0,0,0,0.4)",
          "0 4px 10px rgba(0,0,0,0.45)",
          "0 6px 14px rgba(0,0,0,0.45)",
          "0 8px 18px rgba(0,0,0,0.5)",
          ...Array(19).fill("0 12px 28px rgba(0,0,0,0.55)"),
        ]
      : [
          "none",
          "0 1px 2px rgba(30,27,60,0.06)",
          "0 2px 8px rgba(30,27,60,0.06)",
          "0 4px 12px rgba(30,27,60,0.08)",
          "0 6px 16px rgba(30,27,60,0.08)",
          "0 10px 24px rgba(30,27,60,0.1)",
          ...Array(19).fill("0 16px 32px rgba(30,27,60,0.12)"),
        ],
  });

  theme.components = {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: "background-color 0.25s ease, color 0.25s ease",
        },
        "*::-webkit-scrollbar": { width: 8, height: 8 },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": {
          background: isDark ? "rgba(255,255,255,0.16)" : "rgba(67,56,163,0.2)",
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          background: isDark ? "rgba(255,255,255,0.28)" : "rgba(67,56,163,0.35)",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 8,
          fontWeight: 600,
          transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
        },
        contained: {
          "&:hover": { transform: "translateY(-1px)" },
        },
        containedPrimary: {
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
            isDark ? theme.palette.primary.dark : brand.indigo500
          } 100%)`,
          boxShadow: isDark
            ? "0 4px 14px rgba(99,102,241,0.35)"
            : "0 4px 14px rgba(67,56,163,0.25)",
          "&:hover": {
            backgroundImage: `linear-gradient(135deg, ${brand.indigo500} 0%, ${brand.indigo700} 100%)`,
            boxShadow: isDark
              ? "0 6px 18px rgba(99,102,241,0.45)"
              : "0 6px 18px rgba(67,56,163,0.35)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5 },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "background-color 0.15s ease, transform 0.15s ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 14,
        },
        elevation1: {
          border: `1px solid ${palette.divider}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${palette.divider}`,
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          borderColor: palette.divider,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
        filled: {
          backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.22 : 0.1),
          color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
          padding: "12px 16px",
        },
        head: {
          fontWeight: 700,
          fontSize: "0.78rem",
          textTransform: "uppercase",
          letterSpacing: 0.4,
          color: palette.text.secondary,
          backgroundColor: isDark ? alpha("#FFFFFF", 0.03) : alpha(brand.indigo600, 0.04),
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": { borderBottom: 0 },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "box-shadow 0.15s ease, border-color 0.15s ease",
          "& fieldset": { borderColor: palette.divider },
          "&:hover fieldset": { borderColor: theme.palette.primary.main },
          "&.Mui-focused fieldset": {
            borderWidth: 1.5,
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          border: `1px solid ${palette.divider}`,
          backgroundImage: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: `1px solid ${palette.divider}`,
          backgroundImage: "none",
          boxShadow: isDark
            ? "0 12px 32px rgba(0,0,0,0.55)"
            : "0 12px 32px rgba(30,27,60,0.14)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "2px 6px",
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, isDark ? 0.2 : 0.1),
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: isDark ? "#2A2E3E" : "#1C1B2E",
          fontSize: "0.72rem",
          borderRadius: 8,
          padding: "6px 10px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: palette.divider },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { padding: 8 },
        thumb: { boxShadow: "0 2px 4px rgba(0,0,0,0.2)" },
      },
    },
  };

  return theme;
};

export default getTheme;
