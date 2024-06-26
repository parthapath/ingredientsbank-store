"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";

import styles from "./SideMenu.module.css";

const SideMenu = () => {
  const path = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      setName(storedName || "");
    }
  }, []);

  return (
    <div className={styles.SideMenu}>
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
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            href="/orders"
            className={path.startsWith("/orders") ? styles.Active : null}
          >
            My Orders
          </Link>
        </li>
        <li>
          <Link
            href="/addressess"
            className={path.startsWith("/addressess") ? styles.Active : null}
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
          >
            Change Password
          </Link>
        </li>
        <li>
          <Link href="#">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
