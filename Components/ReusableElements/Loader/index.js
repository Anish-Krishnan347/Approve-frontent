import Box from '@mui/material/Box'


export const CustomLoader = ({ size = 24, barColor = "rgb(128, 128, 128)" }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent overlay
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
              boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
              animation: "fade458 1s linear infinite",
              transform: `rotate(${index * 30}deg) translate(0, -130%)`,
              animationDelay: `${-1.2 + index * 0.1}s`,
            }}
          />
        ))}

        {/* <Typography sx={{color:"rgb(128, 128, 128)"}}>Loading...</Typography> */}
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