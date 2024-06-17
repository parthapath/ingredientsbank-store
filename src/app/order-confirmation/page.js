import { notFound } from "next/navigation";
import moment from "moment";

import styles from "./page.module.css";

import customFetch from "@/utils/fetch.util";

import ContinueShoppingBtn from "@/components/ContinueShoppingBtn/ContinueShoppingBtn";

export const metadata = {
  title: `Order Confirmed - ${process.env.APP_NAME}`,
};

const orderConfirmation = async ({ searchParams }) => {
  const reqOrder = await customFetch(`/orders/${searchParams.ref_id}`);
  const order = await reqOrder.json();
  if (!order.ref_id) {
    return notFound();
  }

  return (
    <div className={["page-wrapper", styles.OrderConfirmation].join(" ")}>
      <div className="container">
        <div className={styles.Details}>
          <h1>Your order has been successfully placed...</h1>
          <div className={styles.OrderId}>
            <span>ORDER ID: </span> <span>{order.ref_id}</span>
          </div>
          <div className={styles.OrderTime}>
            <span>ORDER TIME: </span>
            <span>
              {moment(order.created_at).format("DD MMM YYYY, h:mm A")}
            </span>
          </div>
          <div className={styles.Product}>
            <h2>{order.product.name}</h2>
            <h3>{order.product.alternate_name}</h3>
            <div className={styles.Size}>
              <span>Size:</span> {order.size.name}
            </div>
            <div className={styles.Qty}>
              <span>Qty:</span> {order.quantity}
            </div>
            <div className={styles.Price}>
              <span>Price:</span> {order.currency} {order.price} / kg
            </div>
            <div className={styles.Price}>
              <span>Total Amount:</span> {order.currency} {order.total_amount}
            </div>
          </div>
          <div className={styles.ShippingAddress}>
            <h2>Shipping Address:</h2>
            <div className={styles.Address}>
              <div className={styles.Name}>
                {order.shipping_address.contact_name}
              </div>
              <div className={styles.ContactNo}>
                {order.shipping_address.contact_no}
              </div>
              <div className={styles.Address}>
                {order.shipping_address.address}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Notes}>
          We will contact you to process the order further. Thanks for shopping
          with us...
        </div>
        <div className={styles.ContinueBtn}>
          <ContinueShoppingBtn />
        </div>
      </div>
    </div>
  );
};

export default orderConfirmation;
