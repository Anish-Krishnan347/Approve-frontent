import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelButton from "../Buttons/CancelButton";
import SaveButton from "../Buttons/SaveButton";
import { Autocomplete, InputLabel, TextField, Typography } from "@mui/material";
import { labelSize } from "../../MuiSxStyle/DisplyStyle";
import UpdateButton from "../Buttons/UpdateButton";

const UserModal = ({
  open,
  userData,
  setUserData,
  userRole,
  handleSave,
  setAction,
  handleClose,
  error,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} fullWidth aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {userData?.purpose === "add" ? "Add User" : "Edit User"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <InputLabel sx={labelSize}>Name</InputLabel>
          <TextField
            size="small"
            fullWidth
            name="name"
            defaultValue={userData?.name}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            sx={{ mb: 2 }}
            InputProps={{
              sx: { fontSize: "14px" }, // 👈 Input value text
            }}
          />
          <InputLabel sx={labelSize}>Email</InputLabel>
          <TextField
            size="small"
            fullWidth
            name="email"
            defaultValue={userData?.email}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            sx={{ mb: 2 }}
            InputProps={{
              sx: { fontSize: "14px" }, // 👈 Input value text
            }}
          />
          <InputLabel sx={labelSize}>Password</InputLabel>
          <TextField
            size="small"
            fullWidth
            name="password"
            defaultValue={userData?.password}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            sx={{ mb: 2 }}
            InputProps={{
              sx: { fontSize: "14px" }, // 👈 Input value text
            }}
          />
          <InputLabel sx={labelSize}>Role</InputLabel>
          <Autocomplete
            options={userRole}
            getOptionLabel={(option) => option.name}
            defaultValue={
              userRole.find((role) => role.id === userData?.role_id) || null
            }
            sx={{ mb: 2 }}
            onChange={(event, newValue) => {
              setUserData({ ...userData, role_id: newValue?.id });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  sx: { fontSize: "14px" },
                }}
              />
            )}
          />

          {error && (
            <Typography color="error" fontSize={15} mt={2}>
              Please fill all fields
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          {userData?.purpose === "add" ? (
            <SaveButton onClick={handleSave} />
          ) : (
            <UpdateButton onClick={handleSave} setAction={setAction} />
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default UserModal;
