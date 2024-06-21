import React, { useState, useRef } from "react";
import { ErrorMessage } from "formik";

import styles from "./FileInput.module.css";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import Button from "../../Button/Button";

const FileInput = (props) => {
  const [fileName, setFileName] = useState(null);

  let { label, name, setFieldValue, fileFormats, maxFileSize, value,url, ...rest } =
    props;

  const inputRef = useRef(null);

  const onFileSelect = () => {
    setFileName(inputRef.current.files[0].name);
    setFieldValue(name, inputRef.current.files[0]);
  };

  const onFileRemove = () => {
    inputRef.current.value = "";
    setFileName(null);
  };

  let content = (
    <React.Fragment>
      <div className={styles.FileType}>
        Please select only {props.fileFormats} files
      </div>
      <div className={styles.FileSize}>
        Max file size limit is {props.maxFileSize}
      </div>
    </React.Fragment>
  );

  if (value) {
    content = (
      <React.Fragment>
        <div>
          <span>
            <a href={value} target="_blank">
              View
            </a>
          </span>
          {content}
        </div>
      </React.Fragment>
    );
  }
  if (url) {
    content = (
      <React.Fragment>
        <div>
          <span>
            <a href={value} target="_blank">
              View
            </a>
          </span>
          {content}
        </div>
      </React.Fragment>
    );
  }

  if (fileName) {
    content = (
      <React.Fragment>
        <div>{fileName}</div>
        <div>
          <span onClick={() => inputRef.current.click()}>Change</span>
          <span onClick={() => onFileRemove()}>Remove</span>
        </div>
      </React.Fragment>
    );
  }

 /*  let uploadBtn = (
    <Button
      type="button"
      btnType="Primary"
      clicked={() => inputRef.current.click()}
    >
      Browse
    </Button>
  ); */

  let uploadBtn = (
    <img
      src="/assets/imgs/export-icon.svg"
      alt="Upload Document"
      onClick={() => inputRef.current.click()}
    />
  );

  const type = props.alignType ? props.alignType : "";

  return (
    <div
      className={["form-group", styles.FileUploadInput, styles[type]].join(" ")}
    >
      <label htmlFor={name} className="control-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={(event) => {
          onFileSelect();
        }}
        ref={inputRef}
        {...rest}
      />
      <div className={styles.UploadInput}>
        <div className={styles.Content}>{content}</div>
        <div className={styles.UploadBtn}>{uploadBtn}</div>
      </div>
      <ErrorMessage name={name} component={ErrorMsg} type={type} />
    </div>
  );
};

export default FileInput;
