import axios from "../axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const refreshAccessToken = async () => {
  const response = await axios.post("/users/refresh-token");

  const token = response.data.access_token;
  const jwtToken = jwtDecode(token);
  const expiresAt = new Date(jwtToken.exp * 1000);

  Cookies.set("token", token, {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
  
  localStorage.setItem("name", response.data.name);
};