import { Close, Save } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { GlobalAction } from "../../../Context/globalActionContext";

const SaveButton = ({ onClick }) => {
  const { action } = React.useContext(GlobalAction);
  return (
    <Button
      size="small"
      startIcon={
        action?.isLoading && action?.purpose === "add" ? (
          <CircularProgress size={15} sx={{ color: "#fff" }} />
        ) : (
          <Save />
        )
      }
      variant="contained"
      onClick={onClick}
      color="success"
    >
      save
    </Button>
  );
};

export default SaveButton;
