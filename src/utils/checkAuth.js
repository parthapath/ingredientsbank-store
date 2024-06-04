import { cookies } from "next/headers";

export function checkAuth() {
  const token = cookies().get("token");
  if (!token) {
    return false;
  } else {
    return true;
  }
}
