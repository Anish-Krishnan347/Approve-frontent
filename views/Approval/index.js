import {
  Box,
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
import { approvalTableHeader } from "../../Components/DefaultValues/RoleDatas";
import {
  CustomAcceptButton,
  CustomRejectButton,
} from "../../Components/ReusableElements/Buttons/IconsButtons";
import ApprovalModal from "../../Components/ReusableElements/Modal/ApprovalModal";
import RejectModal from "../../Components/ReusableElements/Modal/RejectModal";
import { tableHover } from "../../Components/MuiSxStyle/TableStyle";
import {
  AcceptApprove,
  FetchApprovalList,
  RejectApprove,
} from "@/pages/api/approval_apies";
import CustomSnackbar from "../../Components/ReusableElements/SnackBarComponent/CustomSnackBar";
import { GlobalAction } from "../../Context/globalActionContext";

const ApprovalManagement = () => {
  const [openApprovalModal, setOpenApprovalModal] = React.useState(false);
  const [openRejectModal, setOpenRejectModal] = React.useState(false);
  const [approvalData, setApprovalData] = React.useState({});
  const [user, setUser] = React.useState([]);
  const { action, setAction } = React.useContext(GlobalAction);

  const handleClose = () => {
    setOpenApprovalModal(false);
    setOpenRejectModal(false);
    setApprovalData({});
  };

  const fetchUser = async () => {
    const request = await FetchApprovalList();
    if (request) {
      setUser(request);
    }
  };

  const handleAccept = async () => {
    const accept = await AcceptApprove(approvalData?.id, setAction);
    setUser(accept);
    handleClose();
  };

  const handleReject = async () => {
    const reject = await RejectApprove(approvalData?.id, setAction);
    setUser(reject);
    handleClose();
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  console.log(approvalData);

  return (
    <>
      {user?.length < 0 ? (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Approval Management</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {approvalTableHeader?.map((item, index) => (
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
                      <CustomAcceptButton
                        onClick={() => {
                          setOpenApprovalModal(true), setApprovalData(user);
                        }}
                      />
                      <CustomRejectButton
                        onClick={() => {
                          setOpenRejectModal(true), setApprovalData(user);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No New User Register
        </Typography>
      )}
      <ApprovalModal
        open={openApprovalModal}
        setOpen={setOpenApprovalModal}
        value={approvalData?.name}
        onClick={handleAccept}
      />
      <RejectModal
        open={openRejectModal}
        setOpen={setOpenRejectModal}
        value={approvalData?.name}
        onClick={handleReject}
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

export default ApprovalManagement;
