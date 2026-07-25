import { Add } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { GlobalAction } from "../../../Context/globalActionContext";

const ApplyButton = ({ onClick }) => {
  const { action } = React.useContext(GlobalAction);
  return (
    <>
      <Button size="small" variant="contained" onClick={onClick}>
        {action?.isLoading ? (
          <CircularProgress sx={{ fontSize: 20, color: "white" }} />
        ) : (
          "Apply"
        )}
      </Button>
    </>
  );
};

export default ApplyButton;
