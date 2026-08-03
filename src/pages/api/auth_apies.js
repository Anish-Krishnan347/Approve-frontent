import { BASE_URL, credentials, headers, method } from "./commonVariable";

const auth_login = "auth/login";
const auth_logout = "auth/logout";

export const loginFunction = async (data, setLoadingState) => {
  setLoadingState((prev) => ({ ...prev, isLoading: true, error: null }));

  try {
    const response = await fetch(`${BASE_URL}/${auth_login}`, {
      method: method,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify({ email: data?.email, password: data?.password }),
    });

    const result = await response.json();
    console.log(result, "result");

    if (!response.ok || result.status !== "success") {
      // Handle API error message
      throw new Error(result?.message || "Login failed");
    }
    if (result?.status === "success") {
      console.log("hello", "result");
      return result;
    } else {
      console.log("hello1", "result");
      throw new Error(result?.message);
    }
  } catch (error) {
    setLoadingState((prev) => ({
      ...prev,
      error: error?.message || "Something went wrong",
    }));
    console.log("hello2", "result");
    return false;
  } finally {
    setLoadingState((prev) => ({ ...prev, isLoading: false }));
  }
};

export const logoutFunction = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${auth_logout}`, {
      method: method,
      credentials: credentials,
      headers: headers,
    });
    const result = await response.json();
    console.log(result, "result");
    return result;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
};
