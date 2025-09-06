import { set } from "date-fns";
import {
  erroSnackbar,
  successSnackbar,
} from "../../../Components/DefaultValues/SnackBarDatas";
import { BASE_URL, credentials, headers, method } from "./commonVariable";

const userList = "user/list";
const create_user = "user/create";
const change_status = "user/status";
const update_user = "user/update";
const delete_user = "user/delete";

export const fetchUserList = async () => {
  try {
    const request = await fetch(`${BASE_URL}/${userList}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({}),
    });
    if (!request.ok) {
      throw new Error(`HTTP status ${request.status}`);
    }
    const response = await request.json();
    if (response.status_code === 200) {
      return response?.data;
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
};

export const createUser = async (data, setAction) => {
  setAction({ isLoading: true, purpose: "add" });
  try {
    const req = await fetch(`${BASE_URL}/${create_user}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({
        name: data.name,
        role_id: data.role_id,
        email: data.email,
        password: data.password,
        status: data.status,
      }),
    });
    if (!req.ok) {
      throw new Error(`HTTP status ${req.status}`);
    }
    const res = await req.json();
    if (res?.status_code === 200 && res?.status === "success") {
      successSnackbar(res?.message, setAction);
      return res?.data;
    } else {
      erroSnackbar(res?.message, setAction);
    }
  } catch (e) {
    console.error(e);
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};

export const ChangeStatus = async (id, status, setAction) => {
  try {
    const req = await fetch(`${BASE_URL}/${change_status}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({ status, id }),
    });
    if (!req.ok) {
      throw new Error("Something went wrong");
    }
    const res = await req.json();
    if (res.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res.data;
    }
  } catch (e) {
    erroSnackbar(e, setAction);
  } finally {
  }
};

export const UpdateUser = async (data, setAction) => {
  setAction({ isLoading: true, purpose: "edit" });
  try {
    const req = await fetch(`${BASE_URL}/${update_user}`, {
      method: method,
      headers: headers,
      credentials: credentials,
      body: JSON.stringify({
        name: data?.name,
        id: data?.id,
        role_id: data?.role_id,
        email: data?.email,
        password: data?.password,
      }),
    });
    if (!req.ok) {
      throw new Error(`HTTP error ${req.status}`);
    }
    const res = await req.json();
    if (res?.status_code === 200) {
      successSnackbar(res?.message, setAction);
      return res?.data;
    } else {
      throw new Error(res?.message);
    }
  } catch (e) {
    erroSnackbar("something went wrong", set);
  } finally {
    setAction((prev) => ({
      ...prev,
      isLoading: false,
      purpose: "",
      value: null,
    }));
  }
};

export const DeleteUser = async (id, setAction) => {
  setAction({ isLoading: true, purpose: "delete" });
  try {
    const req = await fetch(`${BASE_URL}/${delete_user}`, {
      method: method,
      headers: headers,
      credentials: credentials,
      body: JSON.stringify({ id }),
    });
    if (!req.ok) {
      throw new Error(`HTTP error ${req.status}`);
    }
    const res = await req.json();
    if (res?.status_code) {
      successSnackbar(res?.message, setAction);
      return res?.data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (e) {
    erroSnackbar(e.message || e, setAction);
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};
