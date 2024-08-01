"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axios";
import { motion } from "framer-motion";

import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";

import styles from "./Regions.module.css";

const Regions = () => {
  const [regions, setRegions] = useState([]);

  const isAuthenticated = useAuth();

  const fetchData = useCallback(async () => {
    axios
      .get("/regions")
      .then((response) => {
        setRegions(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectRegion = (val) => {
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

  const regionsList =
    regions.length > 0
      ? regions.map((region) => {
          return (
            <motion.div
              key={region.id}
              whileHover={{ scale: 1.1 }}
              className={[styles.Region, styles.Active].join(" ")}
              onClick={() => handleSelectRegion(region)}
            >
              {region.code}
            </motion.div>
          );
        })
      : null;

  return (
    <>
      {regionsList}
      <div className={styles.Region}>
        EU <span>Coming Soon</span>
      </div>
    </>
  );
};

export default Regions;
