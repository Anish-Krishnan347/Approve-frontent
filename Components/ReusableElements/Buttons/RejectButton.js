import { Close, Done, Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const RejectButton = ({ onClick }) => {
  return (
    <Button
      size="small"
      startIcon={<Close />}
        variant="contained"
      onClick={onClick}
      color="error"
    >
      Reject
    </Button>
  );
};

export default RejectButton;
