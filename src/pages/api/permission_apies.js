import {
  erroSnackbar,
  successSnackbar,
} from "../../../Components/DefaultValues/SnackBarDatas";
import { BASE_URL, credentials, headers, method } from "./commonVariable";

//permission list
const permission_list = "permission/list";

//apply permission
const apply_permission = "permission/apply";

//approval permission list
const approve_permission_list = "permission/approve_list";

//accept or reject
const accept_or_reject = "permission/action";

export const PermissionList = async (id) => {
  try {
    const req = await fetch(`${BASE_URL}/${permission_list}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({id}),
    });
    const res = await req.json();
    if (res?.status_code === 200) {
      return res?.data;
    }
  } catch (e) {
  } finally {
  }
};

export const ApprovePermissionList = async () => {
  try {
    const req = await fetch(`${BASE_URL}/${approve_permission_list}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({}),
    });
    const res = await req.json();
    if (res?.status_code === 200) {
      return res?.data;
    }
  } catch (e) {
  } finally {
  }
};
export const ApplyPermission = async (data, setAction) => {
  setAction((prev) => ({ ...prev, isLoading: true }));
  try {
    const req = await fetch(`${BASE_URL}/${apply_permission}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({
        to: data?.to,
        from_: data?.from_,
        reason: data?.reason,
        description: data?.description,
        user_id: data?.user_id,
      }),
    });
    if (!req.ok) {
      throw new Error(`HTTP status ${req?.status}`);
    }
    const res = await req.json();
    if (res?.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res;
    } else {
      throw new Error(res?.message);
    }
  } catch (e) {
    erroSnackbar(e || e?.message || "Something went wrong", setAction);
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false }));
  }
};

export const ApproveOrReject = async (data, setAction) => {
  setAction((prev) => ({ ...prev, isLoading: true }));
  try {
    const req = await fetch(`${BASE_URL}/${accept_or_reject}`, {
      method: method,
      headers: headers,
      credentials: credentials,
      body: JSON.stringify({
        id: data?.id,
        action: data?.action,
      }),
    });
    if (!req.ok) {
      throw new Error(`HTTP status ${req?.status}`);
    }
    const res = await req.json();
    if (res?.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res;
    } else {
      throw new Error(res?.message);
    }
  } catch (e) {
    erroSnackbar(e || e?.message || "Something went wrong", setAction);
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false }));
  }
};
