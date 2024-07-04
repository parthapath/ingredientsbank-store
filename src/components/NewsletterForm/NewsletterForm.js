"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import styles from "./NewsletterForm.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";

const NewsLetterForm = () => {
  const [formId, setFormId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .test("regex", "Invalid Email ID", (val) => {
        const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
        return regExpEmail.test(val);
      }),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`/subscribe-newsletter`, values)
      .then(() => {
        setSuccess(true);
        setFormId(formId + 1);
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      });
  };

  return (
    <div className={["form-container", styles.NewsLetterForm].join(" ")}>
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
                label=""
                name="email"
              />
            </div>

            <div className={["form-actions", styles.FormActions].join(" ")}>
              <Button
                btnType="Secondary"
                type="submit"
                disabled={isSubmitting}
                isLoading={isLoading}
              >
                Subscribe
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewsLetterForm;
