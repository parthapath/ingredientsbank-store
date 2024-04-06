import React from "react";
import Link from "next/link";

import { IoCloseOutline } from "react-icons/io5";

import styles from "./ShopMenu.module.css";

const ShopMenu = (props) => {
  const style = {
    opacity: props.show ? "1" : "0",
    visibility: props.show ? "visible" : "hidden",
    top: props.show ? "9px" : "0",
  };

  return (
    <>
      <div className={styles.ShopMenu} style={style}>
        <div className={styles.Head}>
          <div className={styles.Title}>
            <Link href="/">All Categories</Link>
          </div>
          <div
            className={styles.CloseBtn}
            onClick={() => props.handleShopMenu()}
          >
            <IoCloseOutline />
          </div>
        </div>
        <div className={styles.Categories}>
          <ul>
            <li>
              <Link href="/products">Standardized Herbal Extracts</Link>
            </li>
            <li>
              <Link href="/products">Curcuma (Curcumin) Range</Link>
            </li>
            <li>
              <Link href="/products">
                CO2 Extracts (Super Critical Fluid Extracts)
              </Link>
            </li>
            <li>
              <Link href="/products">Organic Herbs</Link>
            </li>
            <li>
              <Link href="/products">
                Vegetable / Fruits Spray Dried Powder
              </Link>
            </li>
            <li>
              <Link href="/products">Essential Oils</Link>
            </li>
            <li>
              <Link href="/products">Cold Pressed Oils</Link>
            </li>
            <li>
              <Link href="/products">Nutritional Fine Chemicals</Link>
            </li>
            <li>
              <Link href="/products">Dietary Fibre</Link>
            </li>
            <li>
              <Link href="/products">Oleoresin</Link>
            </li>
            <li>
              <Link href="/products">Food Enzyme</Link>
            </li>
            <li>
              <Link href="/products">Coconut Products</Link>
            </li>
            <li>
              <Link href="/products">Herbs Powders</Link>
            </li>
            <li>
              <Link href="/products">Specialised Nutraceuticals</Link>
            </li>
          </ul>
        </div>
      </div>
      {props.show ? <div className={styles.Overlay}></div> : null}
    </>
  );
};

export default ShopMenu;
