import React from "react";

import styles from "./DialogBox.module.css";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const DialogBox = (props) => {
  return (
    <Modal show={props.show} modalClosed={props.cancel} title={props.title}>
      <div className={styles.Body}>{props.message}</div>
      <div className={styles.Footer}>
        <Button btnType="Default" type="button" clicked={props.cancel}>
          Cancel
        </Button>
        <Button btnType="Primary" type="button" clicked={props.confirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DialogBox;
