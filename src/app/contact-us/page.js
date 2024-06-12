"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import styles from "./page.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";
import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    submit: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed for this field"),
    email: Yup.string()
      .required("Email is required")
      .matches(/^[a-zA-Z0-9.@_ ]+$/, "Invalid Email ID")
      .test("regex", "Invalid Email ID", (val) => {
        const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
        return regExpEmail.test(val);
      }),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`/conact-us`, values)
      .then(() => {
        setSuccess(true);
        setEmail(values.email);
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
    <div className={["page-wrapper", styles.ContactUs].join(" ")}>
      <div className="container">
        <h1>Contact Us</h1>
        <div className={styles.Content}>
          <div className={styles.ContentLeft}>
            <div class={styles.Contact}>
              <img src="/assets/imgs/india.png" alt="India" />
              <h3>India</h3>
              <h4>Novel Nutrientss Private Limited</h4>
              <p>
                #9E/17, Peenya Industrial Area, 2nd Phase, Chokkasandra,
                Bengaluru - 560058
              </p>
              <p>
                <strong>Phone:</strong> +91 80 2325 3578, +91 96201 77557
              </p>
              <p>
                <strong>Email:</strong> mail@novelnutrient.com
              </p>
            </div>
            <div class={styles.Contact}>
              <img src="/assets/imgs/uk.png" alt="United Kingdom" />
              <h3>United Kingdom</h3>
              <h4>Novel Nutrientss Limited</h4>
              <p>
                5 Churchill Court, Ground Floor, 58 Station Road, North Harrow,
                Middlesex, HA2 7SA
              </p>
              <p>
                <strong>Phone:</strong> +44 7448 762143
              </p>
              <p>
                <strong>Email:</strong> mail@novelnutrientss.co.uk
              </p>
            </div>
            <div class={styles.Contact}>
              <img src="/assets/imgs/usa.png" alt="United States of America" />
              <h3>United States of America</h3>
              <h4>California</h4>
              <p>#15910, Euclid Ave, Chino, CA 91708</p>
              <p>
                <strong>Email:</strong> mail@novelnutrient.com
              </p>

              <h4 class="pt20">New Jersey</h4>
              <p>#230 Mill Road, Edison, NJ 08817</p>
              <p>
                <strong>Email:</strong> mail@novelnutrient.com
              </p>
            </div>
            <div class={styles.Contact}>
              <img src="/assets/imgs/uae.png" alt="United Arab Emirates" />
              <h3>United Arab Emirates</h3>
              <h4>Novel Bioscience FZCO</h4>
              <p>
                Warehouse CB-02, Street 418 Near Roundabout 8, Jafza Dubai
                United Arab Emirates.
              </p>
              <p>
                <strong>Phone:</strong> 971-042847662
              </p>
              <p>
                <strong>Email:</strong> mail@novelbioscience.com
              </p>
            </div>
          </div>
          <div className={styles.ContentRight}>
            <h2>Write to us</h2>
            <div
              className={["form-container w100 ", styles.SignUpFormWrapper].join(" ")}
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
                        label="Your Name *"
                        name="name"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Email Address *"
                        name="email"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Phone Number"
                        name="phone"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Subject *"
                        name="subject"
                      />

                      <FormikControl
                        control="textarea"
                        label="Message *"
                        name="message"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
