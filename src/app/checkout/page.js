"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "../../axios";
import Cookies from "js-cookie";

import styles from "./page.module.css";

import Button from "@/components/Button/Button";
import ErrorMessages from "@/components/ErrorMessages/ErrorMessages";
import Modal from "@/components/Modal/Modal";
import Radio from "@/components/FormElements/Radio/Radio";
import AddressForm from "@/components/AddressForm/AddressForm";

const checkout = () => {
  //const cart = useSelector((state) => state.checkout.cart);

  const [addressess, setAddressess] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const cartObj = localStorage.getItem("cart");
  const cart = JSON.parse(cartObj);

  const handlePlaceOrder = async () => {
    setIsLoading(true);

    const regionObj = Cookies.get("region");
    let regionId = 5;
    let regionCurency = "USD";
    if (regionObj) {
      const region = JSON.parse(regionObj);
      regionId = region.id;
      regionCurency = region.currency;
    }

    const values = {
      region_id: regionId,
      currency: regionCurency,
      product_id: cart.product_id,
      size_id: cart.size_id,
      quantity: cart.quantity,
      shipping_address_id: selectedAddress.id,
    };

    axios
      .post("/orders", values)
      .then((response) => {
        setOrderPlaced(true);
        router.push(`/order-confirmation?ref_id=${response.data.ref_id}`);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddressModal = () => {
    setShowAddress(!showAddress);
  };

  const handleAddressSelect = (val) => {
    setSelectedAddress(val);
  };

  const handleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };

  const fetchAddressess = useCallback(async () => {
    await axios
      .get("/addressess")
      .then((response) => {
        setAddressess(response.data);
        setSelectedAddress(response.data[0]);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, []);

  useEffect(() => {
    fetchAddressess();
  }, []);

  const addressModal = (
    <Modal
      show={showAddress}
      modalClosed={handleAddressModal}
      width="940px"
      title={!showAddressForm ? "Your Addresses" : "Add a New Address"}
    >
      <div className={styles.Content}>
        {!showAddressForm ? (
          <div className={styles.SavedAddresses}>
            {addressess
              ? addressess.map((item, i) => {
                  return (
                    <div
                      className={[
                        styles.AddressWrapper,
                        selectedAddress === item.id ? styles["Active"] : null,
                      ].join(" ")}
                      onClick={() => handleAddressSelect(item)}
                      key={i}
                    >
                      <div className={styles.RadioBtn}>
                        <Radio
                          name={item.id}
                          change={handleAddressSelect}
                          value={selectedAddress.id}
                        />
                      </div>
                      <div>
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
                      </div>
                    </div>
                  );
                })
              : null}
            <div className={styles.AddNewAddress}>
              <div
                className={styles.AddNewBtn}
                onClick={() => handleAddressForm()}
              >
                Add a New Address
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.NewAddress}>
            <AddressForm
              handleAddressForm={handleAddressForm}
              fetchAddressess={fetchAddressess}
            />
          </div>
        )}
      </div>
    </Modal>
  );

  return (
    <div className={["page-wrapper", styles.Checkout].join(" ")}>
      <div className="container">
        <div className={styles.Details}>
          <div className={styles.ContentLeft}>
            <div className={styles.Product}>
              <h1>{cart.product_name}</h1>
              <h2>{cart.product_alternate_name}</h2>
              <div className={styles.Size}>
                <span>Size:</span> {cart.size_name}
              </div>
              <div className={styles.Qty}>
                <span>Qty:</span> {cart.quantity}
              </div>
              <div className={styles.Price}>
                <span>Price:</span> USD {cart.price} / kg
              </div>
            </div>
            <div className={styles.ShippingAddress}>
              <h2>Shipping Address:</h2>
              {selectedAddress ? (
                <div className={styles.DefaultAddress}>
                  <div className={styles.Name}>
                    {selectedAddress.contact_name}
                  </div>
                  <div className={styles.ContactNo}>
                    {selectedAddress.contact_no}
                  </div>
                  <div className={styles.Address}>
                    {[
                      selectedAddress.address.street_address_1,
                      selectedAddress.address.street_address_2,
                      selectedAddress.address.city,
                      selectedAddress.address.state_province,
                      selectedAddress.address.country,
                      selectedAddress.address.zip_postal_code,
                    ].join(", ")}
                  </div>
                </div>
              ) : null}
              <div
                className={styles.ChangeAddress}
                onClick={() => handleAddressModal()}
              >
                Change Address
              </div>
            </div>
          </div>
          <div className={styles.ContentRight}>
            <h3>Price Details</h3>
            <div className={styles.TotalAmount}>
              <span>Total Amount:</span>{" "}
              <span>
                USD {parseFloat(cart.price) * parseInt(cart.quantity)}
              </span>
            </div>
            <div className={styles.Tax}>
              Excluding Taxes and Shipping Charge
            </div>
            <div className={styles.PlaceOrderBtn}>
              <Button btnType="Primary" width="W100" clicked={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </div>
        </div>
        {error ? <ErrorMessages error={error} /> : null}
      </div>
      {addressModal}
    </div>
  );
};

export default checkout;
