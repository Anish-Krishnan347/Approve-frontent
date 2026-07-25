import {
  erroSnackbar,
  successSnackbar,
} from "../../../Components/DefaultValues/SnackBarDatas";
import { BASE_URL, credentials, headers, method } from "./commonVariable";

const role_list = "role/list";
const create_role = "role/create";
const delete_role = "role/delete";
const edit_role = "role/update";

export const GetRoleList = async () => {
  try {
    const request = await fetch(`${BASE_URL}/${role_list}`, {
      method: method,
      body: JSON.stringify({}),
      headers: headers,
      credentials: credentials,
    });

    const response = await request.json();
    if (response.status_code === 200) {
      return response.data;
    }
  } catch (e) {
    return e;
  } finally {
  }
};

export const CreateRole = async (data, setAction) => {
  setAction({ isLoading: true, purpose: "add" });
  try {
    const request = await fetch(`${BASE_URL}/${create_role}`, {
      method: method,
      headers: headers,
      body: JSON.stringify({ name: data.name }),
      credentials: credentials,
    });

    const response = await request.json();
    if (response.status_code === 200) {
      successSnackbar(response?.message, setAction);
      return response;
    } else {
      erroSnackbar("Something went wrong", setAction);
    }
  } catch (e) {
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};

export const DeleteRole = async (id, setAction) => {
  setAction({ isLoading: true, purpose: "delete" });
  try {
    const request = await fetch(`${BASE_URL}/${delete_role}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({ id }),
    });

    const response = await request.json();
    if (response.status_code === 200) {
      successSnackbar(response?.message, setAction);
      return response;
    } else {
      erroSnackbar("Something went wrong while deleting role", setAction);
    }
  } catch (e) {
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};

export const EditRole = async (data, setAction) => {
  setAction({ isLoading: true, purpose: "edit" });
  try {
    const request = await fetch(`${BASE_URL}/${edit_role}`, {
      headers: headers,
      method: method,
      credentials: credentials,
      body: JSON.stringify({ id: data?.id, name: data?.name }),
    });
    const response = await request.json();
    if (response.status_code === 200) {
      successSnackbar(response?.message, setAction);
      return(response)
    } else {
      erroSnackbar("something went wrong while edit role", setAction);
    }
  } catch (e) {
  } finally {
    setAction((prev) => ({ ...prev, isLoading: false, purpose: "" }));
  }
};
