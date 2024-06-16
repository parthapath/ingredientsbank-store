"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "../../axios";

import styles from "./Purchase.module.css";
import Input from "../FormElements/Input/Input";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const Purchase = (props) => {
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [lowStock, setLowStock] = useState(false);
  const [noQty, setNoQty] = useState(false);
  const [pricings, setPricings] = useState([]);
  const [showPricings, setShowPricings] = useState(false);
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const regionObj = Cookies.get("region");
  let regionId = 5;
  if (regionObj) {
    const region = JSON.parse(regionObj);
    regionId = region.id;
  }

  const fetchPricings = useCallback((id) => {
    axios
      .get(`/products/${props.id}/prices?size=${id}&region=${regionId}`)
      .then((response) => {
        setPricings(response.data);
        setPrice(parseFloat(response.data[0].price));
        setCurrency(response.data[0].currency);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
      });
  }, []);

  useEffect(() => {
    const fetchSizes = () => {
      axios
        .get(`/products/${props.id}/sizes?region=${regionId}`)
        .then((response) => {
          if (response.data.length) {
            setSizes(response.data);
            setSelectedSize(response.data[0]);
            fetchPricings(response.data[0].id);
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data);
        });
    };

    fetchSizes();
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    fetchPricings(size.id);
  };

  const findPricingTier = (selectedQuantity) => {
    const quantity = parseInt(selectedQuantity);

    // If the selectedQuantity is less than the first tier's quantity, return the first tier
    if (quantity < parseInt(pricings[0].quantity)) {
      return pricings[0];
    }

    // Iterate through the pricings array
    for (let i = 0; i < pricings.length; i++) {
      if (quantity <= parseInt(pricings[i].quantity)) {
        return pricings[i];
      }
    }

    // If the selectedQuantity is greater than the last tier's quantity, return the last tier
    return pricings[pricings.length - 1];
  };

  const handleQuantitySelect = (val) => {
    if (val > selectedSize.stock) {
      setLowStock(true);
    } else {
      const newPrice = findPricingTier(val);
      setQuantity(val);
      setPrice(parseFloat(newPrice.price));
      setLowStock(false);
      if (val > 0) {
        setNoQty(false);
      }
    }
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
    if (quantity > 0) {
      const cart = {
        product_id: props.id,
        product_name: props.name,
        product_alternate_name: props.alternateName,
        quantity: quantity,
        size_id: selectedSize.id,
        size_name: selectedSize.name,
        weight: selectedSize.weight,
        price: price,
      };
      localStorage.setItem("cart", JSON.stringify(cart));

      router.push("/checkout");
    } else {
      setNoQty(true);
    }
  };

  return (
    <div className={styles.Purchase}>
      {sizes.length ? (
        <>
          <div className={styles.Sizes}>
            {sizes.map((item, i) => {
              return (
                <div
                  className={[
                    styles.Size,
                    styles[selectedSize.id === item.id ? "Active" : null],
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
          {lowStock ? (
            <div className={styles.LowStock}>
              Not enough stock. Max quantity can be added is{" "}
              {selectedSize.stock}!
            </div>
          ) : null}
          {noQty ? (
            <div className={styles.NoQty}>Please select a quantity!</div>
          ) : null}
          {selectedSize.stock < 10 ? (
            <div className={styles.StockWarning}>
              Only {selectedSize.stock} available!
            </div>
          ) : null}
          <div className={styles.BuyNow}>
            <Button btnType="Primary" type="button" clicked={handleCheckout}>
              Buy Now
            </Button>
          </div>
          {pricingsModal}
        </>
      ) : null}

      {!isLoading && sizes.length === 0 ? (
        <div className={styles.NoStock}>No stock available</div>
      ) : null}
    </div>
  );
};

export default Purchase;
