// theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // light mode colors
            background: {
              default: "#f8fafc",
            },
          }
        : {
            // dark mode colors
            background: {
              default: "#121212",
            },
          }),
    },
  });
