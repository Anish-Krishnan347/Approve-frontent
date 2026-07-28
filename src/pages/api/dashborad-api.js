import { BASE_URL, credentials, headers, method } from "./commonVariable";

export const getDashboardData = async () => {
  try {
    const req = await fetch(`${BASE_URL}/dashboard/stats`, {
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
