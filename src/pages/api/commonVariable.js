const credentials = "include";

const method = "POST";

const BASE_URL = "http://192.168.1.36:5000/api";

function getCookie(name) {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
}
const headers = {
  "Content-Type": "application/json",
};

export { headers, method, credentials, BASE_URL, getCookie };
