"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import moment from "moment";
import { api_server } from "@/config";
import Link from "next/link";
import axios from "../../../axios";

import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

import styles from "./page.module.css";

import SideMenu from "@/components/SideMenu/SideMenu";
import CancelOrderBtn from "@/components/CancelOrderBtn/CancelOrderBtn";

export const metadata = {
  title: "Order Details - Ingredients Bank",
};

const OrderDetails = () => {
  const params = useParams();

  const [order, setOrder] = useState(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const fetchOrder = useCallback(() => {
    axios
      .get(`/orders/${params.refId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch(() => {});
  }, [params]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div className={["page-wrapper", styles.OrdersWrapper].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <Breadcrumb>
              <li>
                <Link href="/orders">My Orders</Link>
              </li>
              <li>{order ? order.ref_id : ""}</li>
            </Breadcrumb>
          </div>
          <div className={styles.PageContent}>
            {order ? (
              <>
                {cancelSuccess ? (
                  <div className={styles.Notes}>
                    <p>Your order has been successfully cancelled</p>
                  </div>
                ) : null}
                <div className={styles.OrderDetails}>
                  <div className={styles.Overview}>
                    <div>
                      <span>Order ID</span> {order.ref_id}
                    </div>
                    <div>
                      <span>Ordered at</span>
                      {moment(order.created_at).format("DD MMM YYYY, h:mm A")}
                    </div>
                    <div>
                      <span>Payment Status</span>
                      {order.payment_status.name}
                    </div>
                    <div>
                      <span>Status</span>
                      {order.status.name}
                    </div>
                  </div>
                  <div className={styles.Product}>
                    <div>
                      <img src={order.product.image} alt={order.product.name} />
                    </div>
                    <div className={styles.ProductDetails}>
                      <h2>{order.product.name}</h2>
                      <h3>{order.product.alternate_name}</h3>
                      <div className={styles.Size}>
                        <span>Size</span> {order.size.name}
                      </div>
                      <div className={styles.Qty}>
                        <span>Qty</span> {order.quantity}
                      </div>
                      <div className={styles.Price}>
                        <span>Price</span> {order.currency} {order.price} / kg
                      </div>
                      <div className={styles.Price}>
                        <span>Total Amount:</span> {order.currency}{" "}
                        {order.total_amount}
                      </div>
                    </div>
                  </div>
                  <div className={styles.ShippingAddress}>
                    <h2>Shipping Address:</h2>
                    <div className={styles.Details}>
                      <div className={styles.ContactName}>
                        {order.shipping_address.contact_name}
                      </div>
                      <div>{order.shipping_address.contact_no}</div>
                      <div>{order.shipping_address.address}</div>
                    </div>
                  </div>
                  {order.status.id === 3 || order.status.id === 4 ? (
                    <div className={styles.ShipmentDetails}>
                      <div>
                        <span>Courier</span> {order.courier}
                      </div>
                      <div>
                        <span>Shipment Tracking No</span>{" "}
                        {order.shipping_tracking_no}
                      </div>
                    </div>
                  ) : null}
                </div>
                {order.status.id <= 2 ? (
                  <div className={styles.CancelBtn}>
                    <CancelOrderBtn
                      refId={order.ref_id}
                      fetchOrder={fetchOrder}
                      setCancelSuccess={setCancelSuccess}
                    />
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
