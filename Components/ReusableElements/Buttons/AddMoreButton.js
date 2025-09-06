import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const AddMoreButton = ({ onClick, disabled }) => {
  return (
    <>
      <Button
        size="small"
        startIcon={<Add />}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
      >
        Add New
      </Button>
    </>
  );
};

export default AddMoreButton;
