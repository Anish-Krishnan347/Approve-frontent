import {
  erroSnackbar,
  successSnackbar,
} from "../../../Components/DefaultValues/SnackBarDatas";
import { BASE_URL, credentials, headers, method } from "./commonVariable";

const approval_list = "approve/list";
const accept_approve = "approve/accept";
const reject_approve = "approve/reject";

export const FetchApprovalList = async () => {
  try {
    const req = await fetch(`${BASE_URL}/${approval_list}`, {
      method: method,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify({}),
    });
    if (!req.ok) {
      throw new Error("Something went wrong");
    }
    const res = await req.json();
    if (res.status_code === 200) {
      return res?.data;
    } else {
      throw new Error(res?.message);
    }
  } catch (e) {
    console.log(e);
  } finally {
  }
};

export const AcceptApprove = async (id, setAction) => {
  setAction({ isLoading: true, purpose: "accept" });
  try {
    const req = await fetch(`${BASE_URL}/${accept_approve}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({ id }),
    });
    if (!req.ok) {
      throw new Error(`HTTP erro ${req.status}`);
    }
    const res = await req.json();
    if (res?.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res?.data;
    } else {
      throw new Error(res?.message);
    }
  } catch (e) {
    erroSnackbar(e.message || e, setAction); // Add .message for clarity
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};

export const RejectApprove = async (id, setAction) => {
  setAction({ isLoading: true, purpost: "reject" });
  try {
    const req = await fetch(`${BASE_URL}/${reject_approve}`, {
      method: method,
      headers: headers,
      credentials: credentials,
      body: JSON.stringify({ id }),
    });

    if (!req.ok) {
      throw new Error(`HTTP error ${req.status}`);
    }
    const res = await req.json();
    if (res.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res?.data;
    }
  } catch (e) {
    erroSnackbar(e.message || e, setAction);
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};
