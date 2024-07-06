"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";

import useOutsideClick from "@/utils/OutsideClick.util";

import styles from "./MainMenu.module.css";

import ShopMenu from "../ShopMenu/ShopMenu";

const MainMenu = () => {
  const [showShopMenu, setShowShopMenu] = useState(false);

  const refShopMenu = useRef(null);

  const handleShopMenu = () => {
    setShowShopMenu(!showShopMenu);
  };

  const hideShopMenu = () => {
    setShowShopMenu(false);
  };

  useOutsideClick(refShopMenu, hideShopMenu);

  return (
    <div className={styles.MainMenu}>
      <div className={[styles.Container, "container"].join(" ")}>
        <ul>
          <li
            className={[
              styles.ShopBtn,
              showShopMenu ? styles["Active"] : "",
            ].join(" ")}
            onClick={() => handleShopMenu()}
            ref={refShopMenu}
          >
            <Link href="#">
              <span>
                <RiShoppingBag3Line /> Find Ingredients
              </span>
            </Link>
            <ShopMenu
              show={showShopMenu}
              handleShopMenu={handleShopMenu}
              hideShopMenu={hideShopMenu}
            />
          </li>
          <li>
            <Link href="#">About Us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
        </ul>
        <div className={styles.ContactNo}>
          <FaPhoneAlt />
          +971-553599144
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
