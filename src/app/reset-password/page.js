"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import { useAuth } from "@/hooks/useAuth";

import styles from "./page.module.css";

import FormikControl from "../../components/FormikControl/FormikControl";
import Button from "../../components/Button/Button";
import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";

const ResetPassword = () => {
  const router = useRouter();
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    router.push("/");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("This field is required")
      .trim()
      .max(14, "Password must contain only 14 characters")
      .min(7, "Password must be at least 7 characters"),
    confirmNewPassword: Yup.string()
      .required("This field is required")
      .trim()
      .max(14, "Password must contain only 14 characters")
      .min(7, "Password must be at least 7 characters")
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);

    const formData = {
      token: searchParams.get("token"),
      password: values.newPassword,
    };

    axios
      .post("/users/reset-password", formData)
      .then(() => {
        setPassword("");
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={["page-wrapper", styles.Account].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <h1>Reset Password</h1>
          </div>
          <div className={styles.PageContent}>
            {error ? <ErrorMessages error={error} /> : null}
            {!success ? (
              <div
                className={["form-container w100", styles.FormContainer].join(
                  " "
                )}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {() => {
                    return (
                      <Form>
                        <div
                          className={["form-body", styles.FormBody].join(" ")}
                        >
                          <FormikControl
                            control="passwordStrength"
                            type="password"
                            label="New Password"
                            name="newPassword"
                            setPassword={setPassword}
                            password={password}
                          />

                          <FormikControl
                            control="password"
                            type="password"
                            label="Confirm New Password"
                            name="confirmNewPassword"
                          />
                        </div>
                        <div className="form-actions">
                          <Button
                            btnType="Primary"
                            type="Submit"
                            isLoading={isLoading}
                          >
                            Save
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            ) : (
              <div className={styles.Notes}>
                <p>Your account password has been successfully changed</p>
                <div className={styles.ContinueBtn}>
                  <Button btnType="Primary" elementType="link" link="/">
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordWithSuspense;
