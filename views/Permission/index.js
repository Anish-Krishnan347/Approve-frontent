import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ApplyLeaveButton from "../../Components/ReusableElements/Buttons/ApplyLeaveButton";
import { flexSpaceBetween } from "../../Components/MuiSxStyle/DisplyStyle";
import {
  permissionTableData,
  permissionTableHeader,
} from "../../Components/DefaultValues/RoleDatas";
import { tableHover } from "../../Components/MuiSxStyle/TableStyle";
import PermissionModal from "../../Components/ReusableElements/Modal/PermissionModal";
import { ApplyPermission, PermissionList } from "@/pages/api/permission_apies";
import { FormateStringToDate } from "../../Components/Utils/FormateDate";
import { GlobalAction } from "../../Context/globalActionContext";
import CustomSnackbar from "../../Components/ReusableElements/SnackBarComponent/CustomSnackBar";

const PermissionPage = () => {
  const [permissionList, setPermissionList] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [permissionData, setPermissionData] = React.useState({});
  const { user, setAction, action } = React.useContext(GlobalAction);

  const fetchPermissionList = async () => {
    const localData = localStorage.getItem("userData");
    const parsedData = JSON.parse(localData);
    console.log("par", parsedData);
    const res = await PermissionList(parsedData?.id);
    setPermissionList(res);
  };

  const handleClose = () => {
    setOpen(false), setPermissionData({});
  };

  const sendPermission = async () => {
    const allData = { ...permissionData, user_id: user?.id };
    const req = await ApplyPermission(allData, setAction);
    console.log("req", req);
    if (req?.status_code === 200) {
      fetchPermissionList();
      handleClose();
    }
  };

  React.useEffect(() => {
    fetchPermissionList();
  }, []);

  return (
    <>
      <Box sx={{ ...flexSpaceBetween, mb: 4 }}>
        <Typography variant="h6">Permission History</Typography>
        <ApplyLeaveButton onClick={() => setOpen(true)} />
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {permissionTableHeader
                ?.filter((item) => item !== "description") // Exclude "Desctioption"
                .map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {permissionList?.map((data, index) => (
              <TableRow sx={tableHover} key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data["reason"]}</TableCell>
                <TableCell>{FormateStringToDate(data["from_"])}</TableCell>
                <TableCell>{FormateStringToDate(data["to"])}</TableCell>
                <TableCell>
                  {data["status"] === "Approved" ? (
                    <Chip color="success" label={data["status"]} />
                  ) : data["status"] === "Rejected" ? (
                    <Chip color="error" label={data["status"]} />
                  ) : (
                    <Chip color="info" label={data["status"]} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PermissionModal
        open={open}
        setPermissionData={setPermissionData}
        permissionData={permissionData}
        handleClose={handleClose}
        sendPermission={sendPermission}
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

export default PermissionPage;
