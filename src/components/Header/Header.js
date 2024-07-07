"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "../../axios";
import { jwtDecode } from "jwt-decode";
import { MdOutlineAccountCircle } from "react-icons/md";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";

import useOutsideClick from "@/utils/OutsideClick.util";
import { useAuth } from "@/hooks/useAuth";
import { refreshAccessToken } from "@/services/authSevice";

import styles from "./Header.module.css";

import SearchBox from "../SearchBox/SearchBox";
import RegionSelector from "../RegionSelector/RegionSelector";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  const refAccountMenu = useRef(null);

  /* Account Dropdown */
  const styleAccountMenu = {
    opacity: showAccountMenu ? "1" : "0",
    visibility: showAccountMenu ? "visible" : "hidden",
    top: showAccountMenu ? "9px" : "0",
  };

  const handleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const hideAccountMenu = () => {
    setShowAccountMenu(false);
  };

  useOutsideClick(refAccountMenu, hideAccountMenu);

  const handleLogout = async () => {
    axios.post("/users/logout").then(() => {
      Cookies.remove("token");
      localStorage.removeItem("name");
      window.location.reload();
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      setName(storedName || "");
    }
  }, []);

  const intervalRef = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      if (!token) return;

      const jwtToken = jwtDecode(token);
      const expiresIn = jwtToken.exp - Math.floor(Date.now() / 1000);

      intervalRef.current = setInterval(() => {
        refreshAccessToken();
      }, (expiresIn - 60) * 1000);
    };

    checkAuth();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <header>
      <div className={styles.Header}>
        <div className={["container", styles.HeaderWrap].join(" ")}>
          <div className={styles.HeaderLeft}>
            <div className={styles.Logo}>
              <Link href="/">
                <Image
                  src="/assets/imgs/logo.png"
                  width={234}
                  height={70}
                  alt="Ingredients Bank"
                  loading="lazy"
                />
              </Link>
            </div>
            <SearchBox />
          </div>
          <div className={styles.HeaderRight}>
            <div className={styles.HeaderActions}>
              <div className={styles.HeaderAction}>
                <Suspense>
                  <RegionSelector />
                </Suspense>
              </div>
              {!isAuthenticated ? (
                <div
                  className={[styles.HeaderAction, styles.SignInUp].join(" ")}
                >
                  <Link
                    href="#"
                    onClick={() => dispatch(openSignInModal(true))}
                  >
                    Sign In
                  </Link>
                  <span>or</span>
                  <Link href="/sign-up">Sign Up</Link>
                </div>
              ) : (
                <div
                  className={[styles.HeaderAction, styles.MyAccount].join(" ")}
                  onClick={() => handleAccountMenu()}
                  ref={refAccountMenu}
                >
                  <div
                    className={[
                      styles.AccountName,
                      showAccountMenu ? styles["Active"] : "",
                    ].join(" ")}
                  >
                    <MdOutlineAccountCircle /> <span>{name}</span>
                  </div>
                  <div className={styles.AccountMenu} style={styleAccountMenu}>
                    <ul>
                      <li>
                        <Link href="/account">My Profile</Link>
                      </li>
                      <li>
                        <Link href="/orders">My Orders</Link>
                      </li>
                      <li>
                        <Link href="/addressess">My Addressess</Link>
                      </li>
                      <li>
                        <Link href="#" onClick={() => handleLogout()}>
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showAccountMenu ? <div className={styles.Overlay}></div> : null}
    </header>
  );
};

export default Header;
