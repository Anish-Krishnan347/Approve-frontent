import { Alert, AlertTitle, Snackbar as MuiSnackbar } from "@mui/material";
import React from "react";
import { GlobalAction } from "../../../Context/globalActionContext";

const CustomSnackbar = ({ purpose }) => {
  const { action, setAction } = React.useContext(GlobalAction);
  return (
    <MuiSnackbar
      open={action.openSnackbar && action.snackBarPurpose === purpose}
      autoHideDuration={6000}
      onClose={() =>
        setAction({
          ...action,
          openSnackbar: false,
          snackBarData: {},
          snackBarPurpose: "",
        })
      }
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        variant="outlined"
        onClose={() =>
          setAction({
            ...action,
            openSnackbar: false,
            snackBarData: {},
            snackBarPurpose: "",
          })
        }
        severity={action.snackBarData.severity}
        sx={{ bgcolor: "white" }}
      >
        <AlertTitle style={{ fontWeight: "bold", fontSize: "15px" }}>
          {action.snackBarData.severity}
        </AlertTitle>
        {action.snackBarData.text}
      </Alert>
    </MuiSnackbar>
  );
};

export default CustomSnackbar;
