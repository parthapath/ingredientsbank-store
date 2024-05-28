"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../axios";
import moment from "moment";

import styles from "./page.module.css";

import SideMenu from "@/components/SideMenu/SideMenu";

const addresses = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(() => {
    axios
      .get(`/orders?page=${page}&per-page=10`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={["page-wrapper", styles.OrdersWrapper].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <div className={styles.Title}>
              <h1>Orders</h1>
            </div>
          </div>
          <div className={styles.PageContent}>
            <div className={styles.Orders}>
              {orders.length ? (
                orders.map((item, i) => {
                  return (
                    <div className={styles.Order} key={i}>
                      <div className={styles.Overview}>
                        <div>
                          <div>
                            <span>Order ID</span> {item.ref_id}
                          </div>
                          <div>
                            <span>Ordered On</span>
                            {moment(item.created_at).format(
                              "DD MMM YYYY, h:mm A"
                            )}
                          </div>
                        </div>
                        <div>
                          <div>
                            <span>Status:</span>
                            {item.status.name}
                          </div>
                          <div>
                            <span>Payment Status:</span>
                            {item.payment_status.name}
                          </div>
                        </div>
                      </div>
                      <div className={styles.OrderDetails}>
                        <div className={styles.Image}>
                          <img src={item.product.image} />
                        </div>
                        <div className={styles.Description}>
                          <div className={styles.Details}>
                            <h2>{item.product.name}</h2>
                            <h3>{item.product.alternate_name}</h3>
                            <div>
                              <span>Size </span>
                              {item.size.name}
                            </div>
                            <div>
                              <span>Price </span>
                              {item.currency + " " + item.price}
                            </div>
                            <div>
                              <span>QTY </span> {item.quantity}
                            </div>
                            <div>
                              <span>Total Amount </span>
                              {item.currency + " " + item.total_amount}
                            </div>
                          </div>
                          <div className={styles.ShippingAddress}>
                            <div>Shipping To:</div>
                            <div>
                              #14, 3rd E Cross, Kamannahalli, Kalyan Nagar,
                              Bangalore, Karnataka, 560043, India
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>You have not placed any order...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addresses;
