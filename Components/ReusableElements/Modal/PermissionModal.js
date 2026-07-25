import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelButton from "../Buttons/CancelButton";
import { InputLabel, TextField, Typography } from "@mui/material";
import { labelSize } from "../../MuiSxStyle/DisplyStyle";
import ApplyButton from "../Buttons/ApplyButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormatStringYearToDate } from "../../Utils/FormateDate";
import { GlobalAction } from "../../../Context/globalActionContext";
import { ApplyPermission } from "@/pages/api/permission_apies";

const PermissionModal = ({
  open,
  setPermissionData,
  permissionData,
  handleClose,
  sendPermission,
}) => {
  return (
    <Dialog open={open} fullWidth aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Apply Leave
        </Typography>
      </DialogTitle>
      <DialogContent>
        <InputLabel sx={labelSize}>Reason</InputLabel>
        <TextField
          size="small"
          fullWidth
          name="reason"
          sx={{ mb: 2 }}
          InputProps={{
            sx: { fontSize: "14px" },
          }}
          onChange={(e) => {
            setPermissionData({
              ...permissionData,
              [e.target.name]: e.target.value,
            });
          }}
        />
        <InputLabel sx={labelSize}>From</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={permissionData?.from}
            onChange={(newValue) =>
              setPermissionData({
                ...permissionData,
                from_: FormatStringYearToDate(newValue),
              })
            }
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
            value={permissionData?.to}
            onChange={(newValue) =>
              setPermissionData({
                ...permissionData,
                to: FormatStringYearToDate(newValue),
              })
            }
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
          onChange={(e) => {
            setPermissionData({
              ...permissionData,
              [e.target.name]: e.target.value,
            });
          }}
        />
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose} />
        <ApplyButton onClick={sendPermission} />
      </DialogActions>
    </Dialog>
  );
};

export default PermissionModal;
