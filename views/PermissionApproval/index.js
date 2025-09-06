import { ApprovePermissionList } from "@/pages/api/permission_apies";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { permissionApprovalTableHeader } from "../../Components/DefaultValues/RoleDatas";
import { FormateStringToDate } from "../../Components/Utils/FormateDate";
import { tableHover } from "../../Components/MuiSxStyle/TableStyle";
import PermissionApprovalModal from "../../Components/ReusableElements/Modal/PermissionApprovalModal";
import CustomSnackbar from "../../Components/ReusableElements/SnackBarComponent/CustomSnackBar";
import { GlobalAction } from "../../Context/globalActionContext";

const AdminPermissionApproval = () => {
  const {action} = React.useContext(GlobalAction)
  const [permissionList, setPermissionList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [approvalData, setApprovalData] = React.useState({});
  const fetchPermissionList = async () => {
    const res = await ApprovePermissionList();
    setPermissionList(res);
  };

  const handleClose = () => {
    setOpen(false);
    setApprovalData({});
  };

  const handleSelect = (index) => {
    setOpen(true);
    const approve = permissionList[index];
    setApprovalData(approve);
  };

  React.useEffect(() => {
    fetchPermissionList();
  }, []);

  return (
    <div>
      {" "}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {permissionApprovalTableHeader
                ?.filter((item) => item !== "description") // Exclude "Desctioption"
                .map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {permissionList?.map((data, index) => (
              <TableRow
                sx={tableHover}
                key={index}
                onClick={() => handleSelect(index)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data["name"]}</TableCell>
                <TableCell>{data["role"]}</TableCell>
                <TableCell>{data["reason"]}</TableCell>
                <TableCell>{FormateStringToDate(data["from_"])}</TableCell>
                <TableCell>{FormateStringToDate(data["to"])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PermissionApprovalModal
        open={open}
        approvalData={approvalData}
        handleClose={handleClose}
        fetchPermissionList={fetchPermissionList}
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

export default AdminPermissionApproval;
