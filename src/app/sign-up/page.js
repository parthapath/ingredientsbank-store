"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "./page.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";

const signUp = () => {
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
    rememberMe: false,
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
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]+$/, "Not a Valid Phone Number"),
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
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    street_address_1: Yup.string().required("Steet Address is required"),
    city: Yup.string().required("City is required"),
    state_province: Yup.string().required("State/Province is required"),
    zip_postal_code: Yup.string().required("Zip/Postal Code is required"),
    country: Yup.string().required("Country is required"),
  });

  const onSubmit = (values) => {
    console.log("values", values);
  };

  return (
    <div className={["page-wrapper", styles.SignUp].join(" ")}>
      <div className="container">
        <h1>Welcome to Novel Ingredients</h1>
        <div className={styles.Notes}>
          <p>Fill in a few details to get started with Novel Ingredients!</p>
          <p>
            Once you have submitted, you will be invited to book a session with
            one of the Novel team so that we can understand your business needs
            and show you how Novel Ingredients works.
          </p>
        </div>
        <div className={["form-container", styles.SignUpFormWrapper].join(" ")}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
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
                    label="Street Address 1"
                    name="street_address"
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
                    label="City"
                    name="city"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="State/Province"
                    name="state_province"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Zip/Postal Code"
                    name="zip_postal_code"
                  />

                  <FormikControl
                    control="input"
                    type="text"
                    label="Country"
                    name="country"
                  />
                </div>

                <div className="form-actions">
                  <Button btnType="Primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default signUp;
