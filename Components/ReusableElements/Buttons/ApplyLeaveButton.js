import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const ApplyLeaveButton = ({ onClick }) => {
  return (
    <>
      <Button
        size="small"
        // startIcon={<Add />}
        variant="contained"
        onClick={onClick}
      >
        Apply Leave
      </Button>
    </>
  );
};

export default ApplyLeaveButton;
