import styles from "./page.module.css";

export const metadata = {
  title: `Shipping and Returns - ${process.env.APP_NAME}`,
};

const shippingAndReturns = async () => {
  return (
    <div className={["page-wrapper", styles.ShippingAndReturns].join(" ")}>
      <div className="container">
        <h2>Shipping &amp; Returns</h2>
        <h3>Shipping Policy</h3>
        <p>
          <strong>Ingredients Bank</strong> is committed to delivering your
          orders promptly and efficiently. Please read our shipping policy
          carefully to understand our shipping procedures, timelines, and costs.
        </p>
        <h4>Shipping Methods and Costs</h4>
        <ul>
          <li>
            <strong>Standard Shipping</strong>: Estimated delivery time is 5-7
            business days. Shipping costs will be calculated at checkout based
            on the weight and destination of your order.
          </li>
          <li>
            <strong>Expedited Shipping</strong>: Estimated delivery time is 2-3
            business days. Additional charges apply and will be calculated at
            checkout.
          </li>
          <li>
            <strong>International Shipping</strong>: Delivery times and costs
            vary by destination. International customers are responsible for any
            customs duties or taxes imposed by their country.
          </li>
        </ul>
        <h4>Processing Time</h4>
        <ul>
          <li>
            Orders are processed within 1-2 business days after payment
            confirmation.
          </li>
          <li>
            Orders placed on weekends or holidays will be processed the next
            business day.
          </li>
        </ul>
        <h4>Order Tracking</h4>
        <ul>
          <li>
            Once your order is shipped, you will receive an email confirmation
            with a tracking number.
          </li>
          <li>
            You can track your order using the tracking number provided on the
            carrier&apos;s website.
          </li>
        </ul>
        <h4>Shipping Restrictions</h4>
        <ul>
          <li>We do not ship to P.O. Boxes or APO/FPO addresses.</li>
          <li>
            Certain products may have shipping restrictions due to regulatory
            requirements or manufacturer policies.
          </li>
        </ul>
        <h3>Returns Policy</h3>
        <p>
          At <strong>Ingredients Bank</strong>, we strive to ensure your
          complete satisfaction with our products. If you are not entirely
          satisfied with your purchase, we are here to help.
        </p>
        <h4>Return Eligibility</h4>
        <ul>
          <li>Items must be returned within 30 days of receipt.</li>
          <li>
            Items must be unused, in their original packaging, and in the same
            condition as when you received them.
          </li>
          <li>
            Certain items, such as perishable goods and custom orders, are
            non-returnable.
          </li>
        </ul>
        <h4>Return Process</h4>
        <ol>
          <li>
            <strong>Request a Return</strong>: Contact our customer service at
            <a rel="noreferrer">support@ingredientsbank.com</a> to request a
            return authorization.
          </li>
          <li>
            <strong>Prepare Your Return</strong>: Include the original receipt
            or proof of purchase with your return package.
          </li>
          <li>
            <strong>Ship Your Return</strong>: Send your return to the following
            address:
          </li>
          <li>
            <strong>Return Shipping Costs</strong>: Customers are responsible
            for return shipping costs unless the item is damaged or defective.
          </li>
        </ol>
        <h4>Refunds</h4>
        <ul>
          <li>
            Once we receive your returned item, we will inspect it and notify
            you of the status of your refund.
          </li>
          <li>
            If approved, your refund will be processed to your original method
            of payment within 5-7 business days.
          </li>
          <li>
            Shipping costs are non-refundable, except in cases of damaged or
            defective items.
          </li>
        </ul>
        <h4>Exchanges</h4>
        <ul>
          <li>We only replace items if they are defective or damaged.</li>
          <li>
            If you need to exchange an item for the same product, please contact
            our customer service at{" "}
            <a rel="noreferrer">support@ingredientsbank.com</a>.
          </li>
        </ul>
        <h3>Damaged or Defective Items</h3>
        <ul>
          <li>
            If you receive a damaged or defective item, please contact us
            immediately at <a rel="noreferrer">support@ingredientsbank.com</a>{" "}
            with your order number and details of the product&apos;s condition.
          </li>
          <li>
            We will provide instructions for returning the damaged or defective
            item and will cover return shipping costs.
          </li>
        </ul>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about our Shipping &amp; Returns policy,
          please contact us at:
        </p>
        <p>
          <strong>Email</strong>:{" "}
          <a rel="noreferrer">support@ingredientsbank.com</a>
          <br />
          <strong>Phone</strong>: [Your Customer Service Phone Number]
          <br />
          <strong>Address</strong>: Ingredients Bank, [Your Business Address]
        </p>
        <p>
          Thank you for shopping with <strong>Ingredients Bank</strong>. We
          appreciate your business and are dedicated to providing you with the
          best possible service.
        </p>
      </div>
    </div>
  );
};

export default shippingAndReturns;
