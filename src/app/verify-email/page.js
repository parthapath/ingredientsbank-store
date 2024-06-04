"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "../../axios";

import { useAuth } from "@/hooks/useAuth";

import styles from "./page.module.css";

import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";

const resetPassword = () => {
  const router = useRouter();
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    router.push("/");
  }

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const values = {
      token: searchParams.get("token"),
    };
    axios
      .post("/users/verify-email", values)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, []);

  return (
    <div className={["page-wrapper", styles.Account].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <h1>Email Verification</h1>
          </div>
          <div className={styles.PageContent}>
            {error ? <ErrorMessages error={error} /> : null}

            {success ? (
              <div className={styles.Notes}>
                <p>Your email has been successfully verified</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default resetPassword;
