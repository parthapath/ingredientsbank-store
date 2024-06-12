"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axios";
import { IoMdAddCircleOutline } from "react-icons/io";

import styles from "./page.module.css";

import SideMenu from "@/components/SideMenu/SideMenu";
import Modal from "@/components/Modal/Modal";
import AddressForm from "@/components/AddressForm/AddressForm";
import DialogBox from "@/components/DialogBox/DialogBox";

const AddressessPage = () => {
  const [addressess, setAddressess] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showDeleteDialogBox, setShowDeleteDialogBox] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const fetchAddressess = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/addressess")
      .then((response) => {
        setAddressess(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAddressess();
  }, [fetchAddressess]);

  const handleAddressForm = () => {
    setActiveAddress(null);
    setShowAddressForm(!showAddressForm);
  };

  const handleEdit = (address) => {
    setActiveAddress(address);
    setShowAddressForm(true);
  };

  const handleDelete = (id = null) => {
    setShowDeleteDialogBox(!showDeleteDialogBox);
    setActiveItem(id);
  };

  const confirmDelete = () => {
    axios
      .delete(`/addressess/${activeItem}`)
      .then(() => {
        fetchAddressess();
        setShowDeleteDialogBox(false);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const addressModal = (
    <Modal
      show={showAddressForm}
      modalClosed={handleAddressForm}
      width="940px"
      title={activeAddress ? "Edit Address" : "Add a New Address"}
    >
      <div className={styles.NewAddress}>
        {showAddressForm ? (
          <AddressForm
            address={activeAddress}
            handleAddressForm={handleAddressForm}
            fetchAddressess={fetchAddressess}
          />
        ) : null}
      </div>
    </Modal>
  );

  return (
    <div className={["page-wrapper", styles.Addressess].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <div className={styles.Title}>
              <h1>Addressess</h1>
            </div>
            <div className={styles.PageActions}>
              <div
                className={styles.AddNew}
                onClick={() => handleAddressForm()}
              >
                <IoMdAddCircleOutline /> Add a New Address
              </div>
            </div>
          </div>
          <div className={styles.PageContent}>
            {addressess.length ? (
              addressess.map((item, i) => {
                return (
                  <div className={styles.AddressessList} key={i}>
                    <div className={styles.AddressWrapper}>
                      <div className={styles.Address}>
                        <div className={styles.Name}>
                          <div>{item.contact_name}</div>
                          {item.default_address.id === 1 ? (
                            <div>Default</div>
                          ) : null}
                        </div>
                        <div>{item.contact_no}</div>
                        <div>
                          {[
                            item.address.street_address_1,
                            item.address.street_address_2,
                            item.address.city,
                            item.address.state_province,
                            item.address.country,
                            item.address.zip_postal_code,
                          ].join(", ")}
                        </div>
                      </div>
                      <div className={styles.Actions}>
                        <div
                          className={styles.Action}
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </div>
                        {item.default_address.id === 0 ? (
                          <div
                            className={styles.Action}
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>You do not have any saved address...</div>
            )}
          </div>
        </div>
      </div>
      {addressModal}
      <DialogBox
        show={showDeleteDialogBox}
        confirm={confirmDelete}
        cancel={handleDelete}
        title="Delete Address"
        message="Are you sure you want to delete this Address?"
      />
    </div>
  );
};

export default AddressessPage;
