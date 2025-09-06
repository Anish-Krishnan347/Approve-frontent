import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const CancelButton = ({ onClick }) => {
  return (
    <Button
      size="small"
    //   startIcon={<Close />}
        variant="outlined"
      onClick={onClick}
    //   sx={{ bgcolor: "red" }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
