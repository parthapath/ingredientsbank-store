"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import { IoCloseOutline } from "react-icons/io5";

import { api_server } from "@/config";

import styles from "./ShopMenu.module.css";

const ShopMenu = (props) => {
  const [categories, setCategories] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${api_server}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <Link href="/products?categories=">All Categories</Link>
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
            {categories.map((item, i) => {
              return (
                <li key={i}>
                  <Link
                    href={`/products?categories=${item.name}`}
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {props.show ? <div className={styles.Overlay}></div> : null}
    </>
  );
};

export default ShopMenu;
