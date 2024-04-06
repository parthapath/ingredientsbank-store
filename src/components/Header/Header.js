"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { RiShoppingBag3Line } from "react-icons/ri";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineAccountCircle,
} from "react-icons/md";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";
import useOutsideClick from "@/utils/OutsideClick.util";

import styles from "./Header.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import ShopMenu from "../ShopMenu/ShopMenu";

const Header = () => {
  const dispatch = useDispatch();
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState({
    id: 1,
    flag: "/assets/imgs/united-kingdom.png",
    regionName: "United Kingdom",
    currencySymbol: "$",
    CurrencyName: "GBP",
  });

  const refRegionMenu = useRef(null);
  const refShopMenu = useRef(null);
  const refAccountMenu = useRef(null);

  const styleRegionMenu = {
    opacity: showRegionSelector ? "1" : "0",
    visibility: showRegionSelector ? "visible" : "hidden",
    top: showRegionSelector ? "9px" : "0",
  };

  const handleRegionSelector = () => {
    setShowRegionSelector(!showRegionSelector);
  };

  const hideRegionSelector = () => {
    setShowRegionSelector(false);
  };

  useOutsideClick(refRegionMenu, hideRegionSelector);

  const regions = [
    {
      id: 1,
      flag: "/assets/imgs/united-kingdom.png",
      regionName: "United Kingdom",
      currencySymbol: "$",
      CurrencyName: "GBP",
    },
    {
      id: 2,
      flag: "/assets/imgs/united-states.png",
      regionName: "United States",
      currencySymbol: "$",
      CurrencyName: "USD",
    },
    {
      id: 3,
      flag: "/assets/imgs/united-arab-emirates.png",
      regionName: "United Arab Emirates",
      currencySymbol: null,
      CurrencyName: "AED",
    },
  ];

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setShowRegionSelector(false);
  };

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

  return (
    <header>
      <div className={styles.Header}>
        <div className={["container", styles.HeaderWrap].join(" ")}>
          <div className={styles.HeaderLeft}>
            <div className={styles.Logo}>
              <Link href="/">
                <img src="/assets/imgs/logo.png" />
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
                <div className={styles.RegionSelector} ref={refRegionMenu}>
                  <div
                    className={[
                      styles.Selector,
                      showRegionSelector ? styles["Active"] : "",
                    ].join(" ")}
                    onClick={() => handleRegionSelector()}
                  >
                    <div className={styles.Flag}>
                      <img src={selectedRegion.flag} />
                    </div>
                    <div className={styles.RegionName}>
                      {selectedRegion.regionName}
                    </div>
                    <div className={styles.Currency}>
                      <div className={styles.CurrencySymbol}>
                        {selectedRegion.currencySymbol}
                      </div>
                      <div className={styles.CurrencyName}>
                        {selectedRegion.CurrencyName}
                      </div>
                    </div>
                    <div className={styles.Indicator}>
                      {!showRegionSelector ? (
                        <MdOutlineKeyboardArrowDown />
                      ) : (
                        <MdOutlineKeyboardArrowUp />
                      )}
                    </div>
                  </div>
                  <div className={styles.Regions} style={styleRegionMenu}>
                    {regions.map((item, i) => {
                      if (item.id !== selectedRegion.id) {
                        return (
                          <div
                            className={styles.Region}
                            onClick={() => handleSelectRegion(item)}
                            key={i}
                          >
                            <div className={styles.RegionName}>
                              <div className={styles.Flag}>
                                <img src={item.flag} />
                              </div>
                              <div className={styles.Name}>
                                {item.regionName}
                              </div>
                            </div>
                            <div className={styles.Currency}>
                              {item.currencySymbol ? (
                                <div className={styles.CurrencySymbol}>
                                  {item.currencySymbol}
                                </div>
                              ) : null}
                              <div className={styles.CurrencyName}>
                                {item.CurrencyName}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className={[styles.HeaderAction, styles.SignInUp].join(" ")}>
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
              {/* <div
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
                  <MdOutlineAccountCircle /> <span>John Doe</span>
                </div>
                <div className={styles.AccountMenu} style={styleAccountMenu}>
                  <ul>
                    <li>
                      <Link href="/page-account">My Account</Link>
                    </li>
                    <li>
                      <Link href="/page-account">Order Tracking</Link>
                    </li>
                    <li>
                      <Link href="/page-account">My Voucher</Link>
                    </li>
                    <li>
                      <Link href="/shop-wishlist">My Wishlist</Link>
                    </li>
                    <li>
                      <Link href="/page-account">Setting</Link>
                    </li>
                    <li>
                      <Link href="/page-login">Sign out</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {showRegionSelector || showAccountMenu ? (
        <div className={styles.Overlay}></div>
      ) : null}
    </header>
  );
};

export default Header;
