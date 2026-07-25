import { BASE_URL, credentials, headers, method } from "./commonVariable";

const auth_login = "auth/login";

export const loginFunction = async (data, setLoadingState, router) => {
  setLoadingState((prev) => ({ ...prev, isLoading: true, error: null }));

  try {
    const response = await fetch(`${BASE_URL}/${auth_login}`, {
      method: method,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify({ email: data?.email, password: data?.password }),
    });

    const result = await response.json();

    if (!response.ok || result.status_code !== 200) {
      // Handle API error message
      throw new Error(result?.message || "Login failed");
    }
    if (result?.status_code === 200 && result?.status === "success") {
      return result;
    } else {
      throw new Error(result?.message);
    }
  } catch (error) {
    setLoadingState((prev) => ({
      ...prev,
      error: error?.message || "Something went wrong",
    }));
    return false;
  } finally {
    setLoadingState((prev) => ({ ...prev, isLoading: false }));
  }
};
