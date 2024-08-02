"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import styles from "./AddressForm.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";

const AddressForm = (props) => {
  const { address } = props;

  const [formId, setFormId] = useState(1);
  const [error, setError] = useState(null);

  const initialValues = {
    contact_name: address ? address.contact_name : "",
    contact_no: address ? address.contact_no : "",
    street_address_1: address ? address.address.street_address_1 : "",
    street_address_2: address ? address.address.street_address_2 : "",
    city: address ? address.address.city : "",
    state_province: address ? address.address.state_province : "",
    zip_postal_code: address ? address.address.zip_postal_code : "",
    country: address ? address.address.country : "",
    default_address: address
      ? address.default_address.id === 1
        ? true
        : false
      : false,
  };

  const validationSchema = Yup.object({
    contact_name: Yup.string()
      .required("Contact Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field"),
    contact_no: Yup.string().required("Contact No is required"),
    street_address_1: Yup.string().required("Steet Address is required"),
    city: Yup.string().required("City is required"),
    state_province: Yup.string().required("State/Province is required"),
    country: Yup.string().required("Country is required"),
    zip_postal_code: Yup.string().required("Zip/Postal Code is required"),
  });

  const onSubmit = (values) => {
    if (!address) {
      axios
        .post("/addressess", values)
        .then(() => {
          setFormId(formId + 1);
          props.fetchAddressess();
          props.handleAddressForm();
        })
        .catch((error) => {
          setError(error.response.data);
        });
    } else {
      axios
        .put(`/addressess/${address.id}`, values)
        .then(() => {
          props.fetchAddressess();
          props.handleAddressForm();
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  };

  return (
    <div className={["form-container", styles.NewAddressForm].join(" ")}>
      <Formik
        key={formId}
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
                label="Contact Name"
                name="contact_name"
              />

              <FormikControl
                control="input"
                type="text"
                label="Contact No"
                name="contact_no"
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

              <FormikControl
                control="checkout"
                label="Make this Default Address"
                name="default_address"
              />
            </div>

            <div className={["form-actions", styles.FormActions].join(" ")}>
              <Button btnType="Primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button btnType="Default" clicked={props.handleAddressForm}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;
