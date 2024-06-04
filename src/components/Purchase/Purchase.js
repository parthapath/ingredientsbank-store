"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { api_server } from "@/config";

import styles from "./Purchase.module.css";
import Input from "../FormElements/Input/Input";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const Purchase = (props) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeName, setSelectedSizeName] = useState(null);
  const [pricings, setPricings] = useState([]);
  const [showPricings, setShowPricings] = useState(false);
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const regionObj = Cookies.get("region");
  let regionId = 5;
  if (regionObj) {
    const region = JSON.parse(regionObj);
    regionId = region.id;
  }

  const fetchPricings = useCallback(async (id) => {
    try {
      const response = await fetch(
        `${api_server}/products/${props.id}/prices?size=${id}&region=${regionId}`
      );
      const data = await response.json();
      setPricings(data);
      setPrice(parseFloat(data[0].price));
      setCurrency(data[0].currency);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await fetch(
          `${api_server}/products/${props.id}/sizes?region=${regionId}`
        );
        const data = await response.json();
        setSizes(data);
        setSelectedSize(data[0].id);
        setSelectedSizeName(data[0].name);
        fetchPricings(data[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size.id);
    setSelectedSizeName(size.name);
    fetchPricings(size.id);
  };

  const findPricingTier = (selectedQuantity) => {
    const quantity = parseFloat(selectedQuantity);

    // If the selectedQuantity is less than the first tier's quantity, return the first tier
    if (quantity < parseFloat(pricings[0].quantity)) {
      return pricings[0];
    }

    // Iterate through the pricings array
    for (let i = 0; i < pricings.length; i++) {
      if (quantity <= parseFloat(pricings[i].quantity)) {
        return pricings[i];
      }
    }

    // If the selectedQuantity is greater than the last tier's quantity, return the last tier
    return pricings[pricings.length - 1];
  };

  const handleQuantitySelect = (val) => {
    const newPrice = findPricingTier(val);
    setQuantity(parseInt(val));
    setPrice(parseFloat(newPrice.price));
  };

  const handlePricingModal = () => {
    setShowPricings(!showPricings);
  };

  const pricingsModal = (
    <Modal
      show={showPricings}
      modalClosed={handlePricingModal}
      width="800px"
      title="Pricings"
    >
      <div className={styles.Content}>
        <table className="type-1">
          <thead>
            <tr>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pricings.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.size.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.currency} {item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );

  const handleCheckout = () => {
    const cart = {
      product_id: props.id,
      product_name: props.name,
      product_alternate_name: props.alternateName,
      quantity: quantity,
      size_id: selectedSize,
      size_name: selectedSizeName,
      price: price,
    };
    localStorage.setItem("cart", JSON.stringify(cart));

    router.push("/checkout");
  };

  return (
    <div className={styles.Purchase}>
      <div className={styles.Sizes}>
        {sizes.map((item, i) => {
          return (
            <div
              className={[
                styles.Size,
                styles[selectedSize === item.id ? "Active" : null],
              ].join(" ")}
              key={i}
              onClick={() => handleSizeSelect(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.QuantityPrice}>
        <div className={styles.Quantity}>
          <Input
            type="text"
            label="Qty"
            name="quantity"
            value={quantity}
            handleInput={handleQuantitySelect}
          />
        </div>
        <div className={styles.Price}>
          {currency} {price} <span>/ kg</span>
        </div>
        <div
          className={styles.PricingList}
          onClick={() => handlePricingModal()}
        >
          See Pricing List
        </div>
      </div>
      <div className={styles.BuyNow}>
        <Button btnType="Primary" type="button" clicked={handleCheckout}>
          Buy Now
        </Button>
      </div>
      {pricingsModal}
    </div>
  );
};

export default Purchase;
