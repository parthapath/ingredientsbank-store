import React from "react";

import styles from "./ErrorMessages.module.css";

const ErrorMessages = (props) => {
  const { error } = props;
  
  let errorMsg = "";
  if (error.code === 2001) {
    errorMsg = Object.values(error.errors[0])[0];
  } else {
    errorMsg = error.message;
  }

  return <div className={styles.ErrorMessages}>{errorMsg}</div>;
};

export default ErrorMessages;
