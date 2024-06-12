"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import styles from "./page.module.css";

import FormikControl from "../../components/FormikControl/FormikControl";
import Button from "../../components/Button/Button";
import SideMenu from "@/components/SideMenu/SideMenu";

const ChangePassword = () => {
  const [formId, setFormId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("This field is required")
      .trim()
      .max(14, "Password must contain only 14 characters")
      .min(7, "Password must be at least 7 characters"),
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
      current_password: values.currentPassword,
      password: values.newPassword,
    };

    axios
      .post("/users/change-password", formData)
      .then((response) => {
        setFormId(formId + 1);
        setPassword("");
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={["page-wrapper", styles.Account].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <h1>Change Password</h1>
          </div>
          <div className={styles.PageContent}>
            <div className={["form-container", styles.FormContainer].join(" ")}>
              <Formik
                key={formId}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => {
                  return (
                    <Form>
                      <div className={["form-body", styles.FormBody].join(" ")}>
                        <FormikControl
                          control="password"
                          type="password"
                          label="Current Password"
                          name="currentPassword"
                          autoComplete="new-password"
                        />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
