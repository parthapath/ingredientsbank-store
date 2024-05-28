"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { openSignInModal } from "@/redux/features/SignIn/SignInSlice";
import { api_server } from "@/config";

import styles from "./SignInForm.module.css";

import Modal from "../Modal/Modal";
import FormikControl from "../FormikControl/FormikControl";
import Button from "../Button/Button";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const showSignInModal = useSelector((state) => state.signIn.showSignInModal);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .test("regex", "Invalid Email ID", (val) => {
        const regExpEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
        return regExpEmail.test(val);
      }),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    axios
      .post(`${api_server}/users/login`, values)
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        const token = {
          token: response.data.access_token,
        };
        axios
          .post("/api/auth/sign-in", token)
          .then(() => {
            dispatch(openSignInModal(false));
            window.location.reload();
          })
          .catch((error) => {
            setError(error.response.data);
          });
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    dispatch(openSignInModal(false));
  };

  const handleSignUpBtn = () => {
    dispatch(openSignInModal(false));
    router.push("/sign-up");
  };

  return (
    <div className={styles.SignInForm}>
      <Modal
        show={showSignInModal}
        modalClosed={closeModal}
        width="800px"
        title="Login"
      >
        <div className={styles.Content}>
          <div className={styles.SignIn}>
            <div
              className={[
                "form-container modal-form",
                styles.FormContainer,
              ].join(" ")}
            >
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
                        label="Email"
                        name="email"
                      />

                      <FormikControl
                        control="password"
                        type="password"
                        label="Password"
                        name="password"
                      />
                    </div>

                    <div className="form-actions">
                      <Button btnType="Primary" type="submit">
                        Sign In
                      </Button>
                      <div className={styles.ForgotPassword}>
                        Forgot Password?
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className={styles.SignUp}>
            <h4>Don&#39;t have an account?</h4>
            <p>Register your account to see pricing and place orders</p>
            <Button
              btnType="Primary"
              clicked={handleSignUpBtn}
              /* style={{ width: "100px" }} */
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignInForm;
