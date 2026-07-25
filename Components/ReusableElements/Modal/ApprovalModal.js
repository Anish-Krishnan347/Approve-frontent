import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelButton from "../Buttons/CancelButton";
import { Avatar, Typography } from "@mui/material";
import { TaskAlt } from "@mui/icons-material";
import ApprovalButton from "../Buttons/ApprovalButton";

export default function ApprovalModal({ open, setOpen, value, onClick }) {
  const handleClose = () => {
    setOpen(false);
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
          <Avatar sx={{ bgcolor: "green" }}>
            <TaskAlt />
          </Avatar>
          <Typography variant="h5" sx={{ fontSize: 20, fontWeight: 600 }}>
            Approve
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Are you sure! You want to approve{" "}
            <Typography color="text.primary">{value}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <ApprovalButton onClick={onClick} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
