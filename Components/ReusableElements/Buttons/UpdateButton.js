import { SaveAs } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const UpdateButton = ({ onClick }) => {
  return (
    <Button
      size="small"
      startIcon={<SaveAs />}
      variant="contained"
      onClick={onClick}
      color="success"
    >
      Update
    </Button>
  );
};

export default UpdateButton;
