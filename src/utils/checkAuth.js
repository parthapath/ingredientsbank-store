import Cookies from "js-cookie";

export function checkAuth() {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  } else {
    return true;
  }
}
