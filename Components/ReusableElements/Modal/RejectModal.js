import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelButton from "../Buttons/CancelButton";
import { Avatar, Typography } from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import RejectButton from "../Buttons/RejectButton";

export default function RejectModal({ open, setOpen, value, onClick }) {
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
          <Avatar sx={{ bgcolor: "red" }}>
            <HighlightOff />
          </Avatar>
          <Typography variant="h5" sx={{ fontSize: 20, fontWeight: 600 }}>
            Reject
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure! You want to Reject{" "}
            <b style={{ color: "#000" }}>{value}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <RejectButton onClick={onClick} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
