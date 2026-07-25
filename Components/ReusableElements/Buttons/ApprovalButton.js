import { Close, Done, Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const ApprovalButton = ({ onClick }) => {
  return (
    <Button
      size="small"
      startIcon={<Done />}
        variant="contained"
      onClick={onClick}
      color="success"
    >
      Approve
    </Button>
  );
};

export default ApprovalButton;
