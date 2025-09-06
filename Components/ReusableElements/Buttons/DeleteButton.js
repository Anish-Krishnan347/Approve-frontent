import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const DeleteButton = ({onClick}) => {
  return (
    <Button
      size="small"
    //   startIcon={<Delete />}
      variant="contained"
      onClick={onClick}
      sx={{bgcolor:'red'}}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
