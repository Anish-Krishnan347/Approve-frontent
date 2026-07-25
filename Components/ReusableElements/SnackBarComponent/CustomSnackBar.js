import { Alert, AlertTitle, Snackbar as MuiSnackbar } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import React from "react";
import { GlobalAction } from "../../../Context/globalActionContext";

const CustomSnackbar = ({ purpose }) => {
  const { action, setAction } = React.useContext(GlobalAction);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const severity = action.snackBarData.severity;
  const color = theme.palette[severity]?.main || theme.palette.info.main;

  const handleClose = () =>
    setAction({
      ...action,
      openSnackbar: false,
      snackBarData: {},
      snackBarPurpose: "",
    });

  return (
    <MuiSnackbar
      open={action.openSnackbar && action.snackBarPurpose === purpose}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        variant="outlined"
        onClose={handleClose}
        severity={severity}
        sx={{
          bgcolor: "background.paper",
          borderColor: alpha(color, isDark ? 0.5 : 0.3),
          color: "text.primary",
        }}
      >
        <AlertTitle style={{ fontWeight: "bold", fontSize: "15px" }}>
          {severity}
        </AlertTitle>
        {action.snackBarData.text}
      </Alert>
    </MuiSnackbar>
  );
};

export default CustomSnackbar;
