import {
  Box,
  Chip,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddMoreButton from "../../Components/ReusableElements/Buttons/AddMoreButton";
import { userTableHeader } from "../../Components/DefaultValues/RoleDatas";
import {
  CustomeDeletButton,
  CustomeEditButton,
} from "../../Components/ReusableElements/Buttons/IconsButtons";
import UserModal from "../../Components/ReusableElements/Modal/userModal";
import DeleteDialog from "../../Components/ReusableElements/Modal/DeleteModal";
import { tableHover } from "../../Components/MuiSxStyle/TableStyle";
import { GetRoleList } from "@/pages/api/role_apies";
import {
  ChangeStatus,
  createUser,
  DeleteUser,
  fetchUserList,
  UpdateUser,
} from "@/pages/api/user_apies";
import { GlobalAction } from "../../Context/globalActionContext";
import CustomSnackbar from "../../Components/ReusableElements/SnackBarComponent/CustomSnackBar";

const UserManagent = () => {
  const [open, setOpen] = React.useState(false);
  const [userRole, setUserRole] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);

  const { setAction, action } = React.useContext(GlobalAction);
  const [error, setError] = React.useState(false);

  const handleClose = () => {
    setModalOpen(false);
    setUserData({});
    setOpen(false);
  };

  const userList = async () => {
    const request = await fetchUserList();
    // console.log("re", request);
    if (request) {
      setUser(request);
    }
  };

  const handleSave = async () => {
    if (
      !userData?.name?.trim() ||
      !userData?.email?.trim() ||
      !userData?.role_id ||
      !userData?.password?.trim()
    ) {
      setError(true);
      return;
    }

    try {
      if (userData?.id) {
        const update = await UpdateUser(userData, setAction);
        setUser(update);
      } else {
        const creat = await createUser(userData, setAction);

        setUser(creat);
      }

      handleClose(); // close modal and reset data
    } catch (err) {
      console.error("Save failed:", err);
      // optionally show an error message to the user
    }
  };

  const handleStatus = async (id, status) => {
    const changedStatus = status === "active" ? "inactive" : "active";
    const req = await ChangeStatus(id, changedStatus, setAction);
    setUser(req);
  };

  const handleDelete = async () => {
    const deleteU = await DeleteUser(userData?.id, setAction);
    setUser(deleteU);
    handleClose()
  };
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // cleanup if component unmounts early
    }
  }, [error]);

  const fetchUserRole = async () => {
    const request = await GetRoleList();
    setUserRole(request);
  };

  React.useEffect(() => {
    userList();
    fetchUserRole();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">User Management</Typography>
        <AddMoreButton
          onClick={() => {
            setModalOpen(true), setUserData({ ...userData, purpose: "add" });
          }}
        />
      </Box>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {userTableHeader?.map((item, index) => (
                <TableCell key={index} sx={{ fontWeight: 600 }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {user?.map((user, index) => (
              <TableRow key={index} sx={tableHover}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user["name"]}</TableCell>
                <TableCell>{user["email"]}</TableCell>
                <TableCell>{user["role"]}</TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      user["status"] === "active"
                        ? "Inactive User"
                        : "Active User"
                    }
                  >
                    <Switch
                      defaultChecked={user["status"] === "active"}
                      size="small"
                      onClick={() => handleStatus(user["id"], user["status"])}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {!user["approve"] ? (
                    <Chip color="info" label="Pending" />
                  ) : (
                    <>
                      <CustomeEditButton
                        onClick={() => {
                          setModalOpen(true), setUserData(user);
                        }}
                      />
                      <CustomeDeletButton
                        onClick={() => {
                          setOpen(true), setUserData(user);
                        }}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserModal
        open={modalOpen}
        setOpen={setModalOpen}
        userData={userData}
        setUserData={setUserData}
        userRole={userRole}
        handleSave={handleSave}
        setAction={setAction}
        handleClose={handleClose}
        error={error}
      />
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title={"User"}
        value={userData?.name}
        onClick={handleDelete}
        data={setUserData}
      />

      {action?.openSnackbar && action?.snackBarPurpose === "success" && (
        <CustomSnackbar purpose={"success"} />
      )}

      {action?.openSnackbar && action?.snackBarPurpose === "error" && (
        <CustomSnackbar purpose={"error"} />
      )}
    </>
  );
};

export default UserManagent;
