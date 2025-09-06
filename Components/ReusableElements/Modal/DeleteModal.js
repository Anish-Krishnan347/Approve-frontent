import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteButton from "../Buttons/DeleteButton";
import CancelButton from "../Buttons/CancelButton";
import { Avatar, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function DeleteDialog({
  open,
  setOpen,
  title,
  value,
  onClick,
  setDeleteData,
}) {
  const handleClose = () => {
    setOpen(false);
    setDeleteData({});
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Avatar sx={{ bgcolor: "red" }}>
            <Delete />
          </Avatar>
          <Typography variant="h5" sx={{ fontSize: 20, fontWeight: 600 }}>
            Delete {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure! You want to delete{" "}
            <b style={{ color: "#000" }}>{value}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <DeleteButton onClick={onClick} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
