import React from "react";
import {
  CustomeDeletButton,
  CustomeEditButton,
  CustomRejectButton,
  CustomSaveButton,
  CustomSpinner,
} from "../../Components/ReusableElements/Buttons/IconsButtons";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { tableHead } from "../../Components/DefaultValues/RoleDatas";
import DeleteDialog from "../../Components/ReusableElements/Modal/DeleteModal";
import AddMoreButton from "../../Components/ReusableElements/Buttons/AddMoreButton";
import { tableHover } from "../../Components/MuiSxStyle/TableStyle";
import {
  CreateRole,
  DeleteRole,
  EditRole,
  GetRoleList,
} from "@/pages/api/role_apies";
import { GlobalAction } from "../../Context/globalActionContext";
import CustomSnackbar from "../../Components/ReusableElements/SnackBarComponent/CustomSnackBar";

const RoleManagement = () => {
  const [addNewRow, setAddNewRow] = React.useState({ isAdd: false });
  const { action, setAction } = React.useContext(GlobalAction);
  const [editRow, setEditRow] = React.useState({ isEdit: false });
  const [deleteData, setDeleteData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [roleData, setRoleData] = React.useState([]);

  const fetchRole = async () => {
    const roles = await GetRoleList();
    setRoleData(roles);
  };

  const handleSave = async () => {
    if (addNewRow?.isAdd) {
      if (!addNewRow?.name || addNewRow?.name == "") {
        alert("please fill all fields");
        return;
      }
      const creatRole = await CreateRole(addNewRow, setAction);
      if (creatRole) {
        await fetchRole();
        setAddNewRow({ isAdd: false });
      }
    } else {
      if (!editRow?.data?.name || editRow?.data?.name == "") {
        alert("please fill all fields");
      }
      const editRole = await EditRole(editRow?.data, setAction);
      console.log(editRole)
      if (editRole) {
        await fetchRole();
        setEditRow({ isEdit: false });
      }
    }
  };

  const deletRole = async () => {
    const DeleteR = await DeleteRole(deleteData?.data?.id, setAction);
    if (DeleteR) {
      await fetchRole();
      setOpen(false);
    }
  };

  React.useEffect(() => {
    fetchRole();
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Role Management</Typography>
        <AddMoreButton
          onClick={() => setAddNewRow({ isAdd: true })}
          disabled={editRow?.isEdit}
        />
      </Box>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: 600, width: "33.33%" }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add new row */}
            {addNewRow?.isAdd && (
              <TableRow>
                <TableCell sx={{ width: "33.33%" }}>
                  {addNewRow?.isAdd && 1}
                </TableCell>
                <TableCell sx={{ width: "33.33%" }}>
                  <TextField
                    size="small"
                    fullWidth
                    name="name"
                    onChange={(e) =>
                      setAddNewRow({
                        ...addNewRow,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell sx={{ width: "33.33%" }}>
                  {action?.isLoading === true && action?.purpose === "add" ? (
                    <CustomSpinner />
                  ) : (
                    <>
                      <CustomSaveButton onClick={handleSave} />
                      <CustomRejectButton
                        onClick={() => setAddNewRow({ isAdd: false })}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            )}

            {/* Existing role rows with inline editing */}
            {roleData?.map((data, index) => {
              const isEditing = editRow?.isEdit && editRow.index === index;
              return (
                <TableRow key={index} sx={tableHover}>
                  <TableCell sx={{ width: "33.33%" }}>
                    {addNewRow?.isAdd ? index + 2 : index + 1}
                  </TableCell>

                  <TableCell sx={{ width: "33.33%" }}>
                    {isEditing ? (
                      <TextField
                        defaultValue={editRow?.data?.name}
                        fullWidth
                        size="small"
                        name="name"
                        onChange={(e) =>
                          setEditRow({
                            ...editRow,
                            data: {
                              ...editRow?.data,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      data.name
                    )}
                  </TableCell>

                  <TableCell sx={{ width: "33.33%" }}>
                    {isEditing ? (
                      <>
                        <CustomSaveButton onClick={handleSave} />
                        <CustomRejectButton
                          onClick={() => setEditRow({ isEdit: false })}
                        />
                      </>
                    ) : (
                      <>
                        {action?.isLoading === true &&
                        action?.purpose === "edit" ? (
                          <CustomSpinner />
                        ) : (
                          <>
                            <CustomeEditButton
                              onClick={() =>
                                setEditRow({ isEdit: true, index, data })
                              }
                              disabled={addNewRow?.isAdd}
                            />
                            <CustomeDeletButton
                              onClick={() => {
                                setOpen(true);
                                setDeleteData({ index, data });
                              }}
                              disabled={addNewRow?.isAdd}
                            />
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteDialog
        setOpen={setOpen}
        open={open}
        value={deleteData?.data?.name}
        title={"Role"}
        onClick={deletRole}
        setDeleteData={setDeleteData}
      />
      {action?.openSnackbar && action?.snackBarPurpose === "success" && (
        <CustomSnackbar purpose={"success"} />
      )}

      {action?.openSnackbar && action?.snackBarPurpose === "error" && (
        <CustomSnackbar purpose={"error"} />
      )}
    </div>
  );
};

export default RoleManagement;
