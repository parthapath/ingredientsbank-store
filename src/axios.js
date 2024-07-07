import axios from "axios";
import Cookies from "js-cookie";
import { api_server } from "@/config";

const instance = axios.create({
  baseURL: api_server,
  timeout: 100000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
