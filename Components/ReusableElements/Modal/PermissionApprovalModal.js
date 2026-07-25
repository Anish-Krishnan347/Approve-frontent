import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { labelSize } from "../../MuiSxStyle/DisplyStyle";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import ApprovalButton from "../Buttons/ApprovalButton";
import RejectButton from "../Buttons/RejectButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Close } from "@mui/icons-material";
import { ApproveOrReject } from "@/pages/api/permission_apies";
import { GlobalAction } from "../../../Context/globalActionContext";

const PermissionApprovalModal = ({
  open,
  approvalData,
  handleClose,
  fetchPermissionList,
}) => {
  const { setAction } = React.useContext(GlobalAction);
  const ApproveAction = async (action) => {
    const data = {
      id: approvalData?.id,
      action: action,
    };
    const req = await ApproveOrReject(data, setAction);
    if (req?.status_code === 200) {
      fetchPermissionList();
      handleClose();
    }
  };
  return (
    <div>
      {" "}
      <Dialog open={open} fullWidth aria-labelledby="responsive-dialog-title">
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Action
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "48%" }}>
              <InputLabel sx={labelSize}>Name</InputLabel>
              <TextField
                size="small"
                fullWidth
                name="reason"
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { fontSize: "14px" },
                }}
                value={approvalData?.name}
              />
            </Box>
            <Box sx={{ width: "48%" }}>
              <InputLabel sx={labelSize}>Role</InputLabel>
              <TextField
                size="small"
                fullWidth
                name="reason"
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { fontSize: "14px" },
                }}
                value={approvalData?.role}
              />
            </Box>
          </Box>
          <InputLabel sx={labelSize}>Reason</InputLabel>
          <TextField
            size="small"
            fullWidth
            name="reason"
            sx={{ mb: 2 }}
            InputProps={{
              sx: { fontSize: "14px" },
            }}
            value={approvalData?.reason}
          />
          <InputLabel sx={labelSize}>From</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={approvalData?.from_ ? new Date(approvalData.from_) : null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: "12px",
                    mb: 2,
                  },
                },
              }}
            />
          </LocalizationProvider>
          <InputLabel sx={labelSize}>To</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={approvalData?.to ? new Date(approvalData.to) : null}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: "12px",
                    mb: 2,
                  },
                },
              }}
            />
          </LocalizationProvider>
          <InputLabel sx={labelSize}>Discription</InputLabel>

          <TextField
            multiline
            minRows={3} // Starts with 3 rows
            fullWidth
            size="small"
            name="description"
            value={approvalData?.description}
          />
        </DialogContent>
        <DialogActions>
          <RejectButton onClick={() => ApproveAction("Rejected")} />
          <ApprovalButton onClick={() => ApproveAction("Approved")} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PermissionApprovalModal;
