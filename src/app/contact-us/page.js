"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

import styles from "./page.module.css";

import FormikControl from "@/components/FormikControl/FormikControl";
import Button from "@/components/Button/Button";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formId, setFormId] = useState(1);
  const [captchaValue, setCaptchaValue] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
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
    const formValues = {
      ...values,
      captcha: captchaValue,
    };
    setIsLoading(true);
    axios
      .post(`/contact`, formValues)
      .then(() => {
        setSuccess(true);
        setError(null);
        setFormId(formId + 1);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <>
      <title>Contact Us - Ingredients Bank</title>
      <div className={["page-wrapper", styles.ContactUs].join(" ")}>
        <div className="container">
          <h1>Contact Us</h1>
          <div className={styles.Content}>
            <div className={styles.ContentLeft}>
              {/* <div className={styles.Contact}>
                <Image
                  src="/assets/imgs/india.png"
                  width={50}
                  height={25}
                  alt="India"
                  loading="lazy"
                />
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
              </div> */}
              <div className={styles.Contact}>
                <Image
                  src="/assets/imgs/uk.png"
                  width={50}
                  height={25}
                  alt="United Kingdom"
                  loading="lazy"
                />
                <h3>United Kingdom</h3>
                <h4>Novel Nutrientss Limited</h4>
                <p>
                  5 Churchill Court, Ground Floor, 58 Station Road, North
                  Harrow, Middlesex, HA2 7SA
                </p>
              </div>
              <div className={styles.Contact}>
                <Image
                  src="/assets/imgs/usa.png"
                  width={50}
                  height={25}
                  alt="United States of America"
                  loading="lazy"
                />
                <h3>United States of America</h3>
                <h4>California</h4>
                <p>#15910, Euclid Ave, Chino, CA 91708</p>

                <h4>New Jersey</h4>
                <p>#230 Mill Road, Edison, NJ 08817</p>
              </div>
              <div className={styles.Contact}>
                <Image
                  src="/assets/imgs/uae.png"
                  width={50}
                  height={25}
                  alt="United Arab Emirates"
                  loading="lazy"
                />
                <h3>United Arab Emirates</h3>
                <h4>Novel Bioscience FZCO</h4>
                <p>
                  Warehouse CB-02, Street 418 Near Roundabout 8, Jafza Dubai
                  United Arab Emirates.
                </p>
              </div>
            </div>
            <div className={styles.ContentRight}>
              <h2>Write to us</h2>
              {success ? (
                <div className={styles.Notes}>
                  <p>
                    Your message has been successfully sent. We will get back to
                    you soon. Thanks...
                  </p>
                </div>
              ) : (
                <div
                  className={[
                    "form-container w100",
                    styles.SignUpFormWrapper,
                  ].join(" ")}
                >
                  <Formik
                    key={formId}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div
                          className={["form-body", styles.FormBody].join(" ")}
                        >
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

                        <div
                          className={["form-actions", styles.FormActions].join(
                            " "
                          )}
                        >
                          <div className={styles.Recaptcha}>
                            <ReCAPTCHA
                              sitekey="6Lcrt_kpAAAAAL5xSRrh5hvAUwKUUTi6fdQhTFK9"
                              onChange={onCaptchaChange}
                            />
                          </div>
                          <Button
                            btnType="Primary"
                            type="submit"
                            disabled={isSubmitting}
                            isLoading={isLoading}
                            style={{ width: "120px", height: "50px" }}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
