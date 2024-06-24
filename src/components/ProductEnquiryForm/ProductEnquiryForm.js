"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../axios";

import { openProductEnquiryModal } from "@/redux/features/ProductEnquiry/ProductEnquirySlice";

import styles from "./ProductEnquiryForm.module.css";

import Modal from "../Modal/Modal";
import FormikControl from "../FormikControl/FormikControl";
import Button from "../Button/Button";
import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";

const ProductEnquiryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formId, setFormId] = useState(1);

  const showProductEnquiryModal = useSelector(
    (state) => state.productEnquiry.showProductEnquiryModal
  );
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    description: "",
    qty: "",
    package_type: "",
    package_size: "",
    document: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    qty: Yup.string().required("Quantiry is required"),
    package_type: Yup.string().required("Package Type is required"),
    package_size: Yup.string().required("Package Size is required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("qty", values.qty);
    formData.append("package_type", values.package_type);
    formData.append("package_size", values.package_size);
    formData.append("document", values.document);

    axios
      .post("/product-enquires", formData)
      .then(() => {
        setFormId(formId + 1);
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeModal = () => {
    setFormId(formId + 1);
    dispatch(openProductEnquiryModal(false));
    setSuccess(false);
  };

  const packageTypeOptions = [
    { value: "1", label: "HDPE Drum" },
    { value: "2", label: "Carton Box" },
  ];

  return (
    <div className={styles.ProductEnquiryForm}>
      <Modal
        show={showProductEnquiryModal}
        modalClosed={closeModal}
        width="800px"
        title="Product Enquiry"
      >
        <div className={styles.Content}>
          {!success ? (
            <div className={["form-container", styles.FormContainer].join(" ")}>
              <Formik
                key={formId}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className={["form-body", styles.FormBody].join(" ")}>
                      <FormikControl
                        control="input"
                        type="text"
                        label="Name *"
                        name="name"
                      />

                      <FormikControl
                        control="textarea"
                        label="Description *"
                        name="description"
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Quantity *"
                        name="qty"
                      />

                      <FormikControl
                        control="select"
                        label="Package Type *"
                        name="package_type"
                        options={packageTypeOptions}
                        setFieldValue={setFieldValue}
                      />

                      <FormikControl
                        control="input"
                        type="text"
                        label="Package Size *"
                        name="package_size"
                        placeholder="e.g. 10kg bag"
                      />

                      <FormikControl
                        control="fileInput"
                        label="Document"
                        name="document"
                        accept=".pdf,.jpg,.png,.docx"
                        setFieldValue={setFieldValue}
                        fileFormats="PDF, JPG, PNG, DOCX"
                        maxFileSize="3MB"
                      />
                    </div>

                    <div className="form-actions">
                      <Button
                        btnType="Primary"
                        type="submit"
                        isLoading={isLoading}
                        style={{ width: "100px" }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ) : (
            <div className={styles.SuccessMsg}>
              <p>
                Your request has been successfully submitted! We you will get
                back to your soon. Thanks....
              </p>
              <div className={styles.ContinueBtn}>
                <Button btnType="Primary" type="button" clicked={closeModal}>
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
        {error ? <ErrorMessages error={error} /> : null}
      </Modal>
    </div>
  );
};

export default ProductEnquiryForm;
