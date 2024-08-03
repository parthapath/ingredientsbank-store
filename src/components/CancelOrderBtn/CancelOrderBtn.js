"use client";
import React, { useState } from "react";
import axios from "../../axios";

import Button from "@/components/Button/Button";
import DialogBox from "@/components/DialogBox/DialogBox";

const CancelOrderBtn = (props) => {
  const [showDialogBox, setShowDialogBox] = useState(false);

  const handleCancel = () => {
    setShowDialogBox(!showDialogBox);
  };

  const confirmCancel = () => {
    const values = {
      ref_id: props.refId,
    };
    axios
      .post("/orders/cancel", values)
      .then(() => {
        setShowDialogBox(false);
        props.fetchOrder();
        props.setCancelSuccess(true);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <>
      <Button btnType="Primary" clicked={handleCancel}>
        Cancel Order
      </Button>
      <DialogBox
        show={showDialogBox}
        confirm={confirmCancel}
        cancel={handleCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this Order?"
      />
    </>
  );
};

export default CancelOrderBtn;
