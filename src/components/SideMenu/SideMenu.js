"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";

import styles from "./SideMenu.module.css";

const PAGE_LABELS = {
  "/account": "My Profile",
  "/orders": "My Orders",
  "/addressess": "My Addresses",
  "/change-password": "Change Password",
};

const SideMenu = () => {
  const path = usePathname();
  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      setName(storedName || "");
    }
  }, []);

  const currentLabel =
    Object.entries(PAGE_LABELS).find(([key]) => path.startsWith(key))?.[1] ||
    "Account";

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile top bar — hidden on desktop via CSS */}
      <div className={styles.MobileBar}>
        <div className={styles.MobileBarLeft}>
          <MdOutlineAccountCircle className={styles.MobileAvatar} />
          <div>
            <div className={styles.MobileGreeting}>Hello, {name}</div>
            <div className={styles.MobileCurrentPage}>{currentLabel}</div>
          </div>
        </div>
        <button
          className={styles.MenuToggle}
          onClick={() => setMenuOpen(true)}
          aria-label="Open account menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          Menu
        </button>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className={styles.Backdrop} onClick={close} />
      )}

      {/* Sidebar (fixed drawer on mobile, inline on desktop) */}
      <div className={[styles.SideMenu, menuOpen ? styles.Open : ""].join(" ")}>
        {/* Drawer header — visible only on mobile */}
        <div className={styles.DrawerHeader}>
          <div className={styles.DrawerUser}>
            <MdOutlineAccountCircle />
            <span>{name}</span>
          </div>
          <button className={styles.DrawerClose} onClick={close} aria-label="Close menu">
            ✕
          </button>
        </div>

        {/* Desktop user greeting — hidden on mobile */}
        <div className={styles.UserName}>
          <div>
            <MdOutlineAccountCircle />
          </div>
          <div>
            <div>Hello,</div>
            <div>{name}</div>
          </div>
        </div>

        <ul className={styles.Menu}>
          <li>
            <Link
              href="/account"
              className={path.startsWith("/account") ? styles.Active : null}
              onClick={close}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="/orders"
              className={path.startsWith("/orders") ? styles.Active : null}
              onClick={close}
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link
              href="/addressess"
              className={path.startsWith("/addressess") ? styles.Active : null}
              onClick={close}
            >
              My Addressess
            </Link>
          </li>
          <li>
            <Link
              href="/change-password"
              className={
                path.startsWith("/change-password") ? styles.Active : null
              }
              onClick={close}
            >
              Change Password
            </Link>
          </li>
          <li>
            <Link href="#" onClick={close}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideMenu;

