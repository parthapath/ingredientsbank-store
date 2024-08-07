"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "../../axios";
import Cookies from "js-cookie";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Image from "next/image";

import useOutsideClick from "@/utils/OutsideClick.util";
import { useAuth } from "@/hooks/useAuth";

import styles from "./RegionSelector.module.css";

const RegionSelector = () => {
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);
  //const [country, setCountry] = useState(null);
  const refRegionMenu = useRef(null);

  const isAuthenticated = useAuth();

  const fetchData = useCallback(async () => {
    axios
      .get("/regions")
      .then((response) => {
        setRegions(response.data);
        let defaultRegion = response.data[0];
        if (isAuthenticated) {
          defaultRegion = response.data.find(
            (region) => region.selected_region
          );
          Cookies.set("region", JSON.stringify(defaultRegion));
        }
        const regionObj = Cookies.get("region");
        if (!isAuthenticated && regionObj) {
          defaultRegion = JSON.parse(regionObj);
        }
        setSelectedRegion(defaultRegion);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, []);

  /* const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountry(data.country_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  useEffect(() => {
    //getGeoInfo();
    fetchData();
  }, [fetchData]);

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

  const handleSelectRegion = (val) => {
    setSelectedRegion(val);
    setShowRegionSelector(false);
    Cookies.set("region", JSON.stringify(val));

    if (isAuthenticated) {
      const values = {
        region_id: val.id,
      };

      axios
        .put("/users/set-region", values)
        .then(() => {
          setSuccess(true);
          window.location.reload();
        })
        .catch((error) => {
          setError(error.response.data);
        });
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.RegionSelectorWrapper}>
      {selectedRegion ? (
        <div className={styles.RegionSelector} ref={refRegionMenu}>
          <div
            className={[
              styles.Selector,
              showRegionSelector ? styles["Active"] : "",
            ].join(" ")}
            onClick={() => handleRegionSelector()}
          >
            <div className={styles.Flag}>
              <Image
                src={selectedRegion.icon}
                width={22}
                height={22}
                alt={selectedRegion.name}
                loading="lazy"
              />
            </div>
            <div className={styles.RegionName}>{selectedRegion.name}</div>
            <div className={styles.Currency}>
              <div className={styles.CurrencySymbol}>
                {selectedRegion.currencySymbol}
              </div>
              <div className={styles.CurrencyName}>
                {selectedRegion.currency}
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
            {regions.length
              ? regions.map((item, i) => {
                  if (item.id !== selectedRegion.id) {
                    return (
                      <div
                        className={styles.Region}
                        onClick={() => handleSelectRegion(item)}
                        key={i}
                      >
                        <div className={styles.RegionName}>
                          <div className={styles.Flag}>
                            <Image
                              src={item.icon}
                              width={22}
                              height={22}
                              alt={item.name}
                              loading="lazy"
                            />
                          </div>
                          <div className={styles.Name}>{item.name}</div>
                        </div>
                        <div className={styles.Currency}>
                          {item.currencySymbol ? (
                            <div className={styles.CurrencySymbol}>
                              {item.currency}
                            </div>
                          ) : null}
                          <div className={styles.CurrencyName}>
                            {item.currency}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      ) : null}
      {showRegionSelector ? <div className={styles.Overlay}></div> : null}
    </div>
  );
};

export default RegionSelector;
