import Box from "@mui/material/Box";
import { useTheme, alpha } from "@mui/material/styles";

export const CustomLoader = ({ size = 24 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const barColor = theme.palette.primary.main;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: alpha(
          theme.palette.background.default,
          isDark ? 0.7 : 0.6,
        ),
        // backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, // Ensure it overlays other content
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "30px",
          height: "30px",
          borderRadius: "10px",
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: "8%",
              height: "24%",
              backgroundColor: barColor,
              position: "absolute",
              left: "88%",
              top: "35%",
              opacity: 0,
              borderRadius: "50px",
              boxShadow: isDark
                ? "0 0 3px rgba(0, 0, 0, 0.5)"
                : "0 0 3px rgba(0, 0, 0, 0.2)",
              animation: "fade458 1s linear infinite",
              transform: `rotate(${index * 30}deg) translate(0, -130%)`,
              animationDelay: `${-1.2 + index * 0.1}s`,
            }}
          />
        ))}
      </Box>
      <style>
        {`
          @keyframes fade458 {
            from {
              opacity: 1;
            }
            to {
              opacity: 0.25;
            }
          }
        `}
      </style>
    </Box>
  );
};
