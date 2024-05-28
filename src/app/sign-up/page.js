"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { api_server } from "@/config";

import styles from "./page.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";
import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";

const signUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    company_name: "",
    website: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    state_province: "",
    zip_postal_code: "",
    country: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field"),
    last_name: Yup.string()
      .required("Last Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .required("Email is required")
      .matches(/^[a-zA-Z0-9.@_ ]+$/, "Invalid Email ID")
      .test("regex", "Invalid Email ID", (val) => {
        const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
        return regExpEmail.test(val);
      }),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    company_name: Yup.string().required("Company Name is required"),
    website: Yup.string().required("Website is required"),
    street_address_1: Yup.string().required("Steet Address is required"),
    city: Yup.string().required("City is required"),
    state_province: Yup.string().required("State/Province is required"),
    country: Yup.string().required("Country is required"),
    zip_postal_code: Yup.string().required("Zip/Postal Code is required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`${api_server}/users`, values)
      .then(() => {
        setSuccess(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={["page-wrapper", styles.SignUp].join(" ")}>
      <div className="container">
        <h1>Welcome to Novel Ingredients</h1>
        <div className={styles.Notes}>
          {!success ? (
            <p>Fill in a few details to get started with Novel Ingredients!</p>
          ) : (
            <>
              <p>
                Your account has been successfully created. We have sent an
                email to verify your email. Please follow the instuctions
                provided in the email.
              </p>
              <p>
                If you have not received the email yet.{" "}
                <a href="#">Click here</a> to send again
              </p>
            </>
          )}
        </div>
        {!success ? (
          <div
            className={["form-container", styles.SignUpFormWrapper].join(" ")}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className={["form-body", styles.FormBody].join(" ")}>
                    <FormikControl
                      control="input"
                      type="text"
                      label="First Name"
                      name="first_name"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Last Name"
                      name="last_name"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Phone"
                      name="phone"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Email"
                      name="email"
                    />

                    <FormikControl
                      control="password"
                      type="password"
                      label="Password"
                      name="password"
                    />

                    <FormikControl
                      control="password"
                      type="password"
                      label="Confirm Password"
                      name="confirm_password"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Company Name *"
                      name="company_name"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Website *"
                      name="website"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Street Address 1 *"
                      name="street_address_1"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Street Address 2"
                      name="street_address_2"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="City *"
                      name="city"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="State/Province *"
                      name="state_province"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Zip/Postal Code *"
                      name="zip_postal_code"
                    />

                    <FormikControl
                      control="input"
                      type="text"
                      label="Country *"
                      name="country"
                    />
                  </div>

                  <div className="form-actions">
                    <Button
                      btnType="Primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : null}
        {error ? <ErrorMessages error={error} /> : null}
      </div>
    </div>
  );
};

export default signUp;