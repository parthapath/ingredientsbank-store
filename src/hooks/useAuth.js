"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      axios
        .get("/api/auth/validate-token")
        .then(() => {
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

/* import Cookies from "js-cookie";

export const useAuth = () => {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  } else {
    return true;
  }
};
 */
