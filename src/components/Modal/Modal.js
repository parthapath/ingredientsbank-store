import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./Modal.module.css";

import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const style = {
    transform: props.show ? "translateY(0)" : "translateY(-230%)",
    opacity: props.show ? "1" : "0",
    width: props.width ? props.width : "475px",
  };

  const body = props.scroll ? (
    <Scrollbars autoHeight autoHeightMin={500} autoHeightMax={700} autoHide>
      {props.children}
    </Scrollbars>
  ) : (
    props.children
  );

  return (
    <React.Fragment>
      <Backdrop
        show={props.show}
        clicked={!props.isLoading ? props.modalClosed : null}
      />
      <div className={[styles.Modal, props.className].join(" ")} style={style}>
        <div className={styles.ModalHeader}>
          <div className={styles.Title}>{props.title}</div>
          <div
            className={styles.CloseBtn}
            onClick={!props.isLoading ? props.modalClosed : null}
          >
            <IoCloseOutline />
          </div>
        </div>
        <div className={styles.ModalBody}>{body}</div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
