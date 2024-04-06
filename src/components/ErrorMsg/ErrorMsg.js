import React from 'react'

import styles from "./ErrorMsg.module.css";

const ErrorMsg = (props) => {
    return (
        <div className={styles.ErrorMsg}>
            {props.children}
        </div>
    );
}

export default ErrorMsg;