"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { RiShoppingBag3Line } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";

import useOutsideClick from "@/utils/OutsideClick.util";
import { useAuth } from "@/hooks/useAuth";

import styles from "./Header.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import ShopMenu from "../ShopMenu/ShopMenu";
import RegionSelector from "../RegionSelector/RegionSelector";
import axios from "axios";

const Header = () => {
  const [showShopMenu, setShowShopMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useAuth();

  const refShopMenu = useRef(null);
  const refAccountMenu = useRef(null);

  /* Shop Menu */
  const handleShopMenu = () => {
    setShowShopMenu(!showShopMenu);
  };

  const hideShopMenu = () => {
    setShowShopMenu(false);
  };

  useOutsideClick(refShopMenu, hideShopMenu);

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
    await axios.post("/api/auth/logout");
    window.location.reload();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      setName(storedName || "");
    }
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
            <div className={styles.MainNav}>
              <ul>
                <li
                  className={[
                    styles.ShopBtn,
                    showShopMenu ? styles["Active"] : "",
                  ].join(" ")}
                  onClick={() => handleShopMenu()}
                  ref={refShopMenu}
                >
                  <span>
                    <RiShoppingBag3Line /> Shop
                  </span>
                  <ShopMenu
                    show={showShopMenu}
                    handleShopMenu={handleShopMenu}
                    hideShopMenu={hideShopMenu}
                  />
                </li>
                <li>
                  <Link href="/shop">About Us</Link>
                </li>
              </ul>
            </div>
            <div className={styles.HeaderActions}>
              <div className={styles.HeaderAction}>
                <RegionSelector />
              </div>
              {!isAuthenticated ? (
                <div
                  className={[styles.HeaderAction, styles.SignInUp].join(" ")}
                >
                  <Button
                    type="button"
                    btnType="Secondary"
                    clicked={() => dispatch(openSignInModal(true))}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    btnType="Primary"
                    elementType="link"
                    link="/sign-up"
                  >
                    Sign Up
                  </Button>
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
