import styles from "./page.module.css";

export const metadata = {
  title: `Terms and Conditions - ${process.env.APP_NAME}`,
};

const termsAndConditions = async () => {
  return (
    <div className={["page-wrapper", styles.TermsAndConditions].join(" ")}>
      <div className="container">
        <h2>Terms and Conditions</h2>
        <h3>1. Order Confirmation</h3>
        <p>Final order confirmation will be based on email communication.</p>
        <h3>2. Payments</h3>
        <p>
          Payments should be made to the advised bank details in the proforma
          invoice. Only bank transfers are accepted; there are no card options.
        </p>
        <h3>3. Pricing</h3>
        <p>
          All prices are fixed as of the date of the invoice and/or the order
          acknowledgment date. All prices quoted are exclusive of taxes, fees,
          levies, duties, handling, and freight charges (&quot;Taxes and Shipping
          Charges&quot;) unless otherwise approved.
        </p>
        <h3>4. Credit Terms</h3>
        <p>Credit terms are agreed upon as per email confirmation.</p>
        <h3>5. Shipping Terms</h3>
        <p>
          We support all shipping terms subject to email confirmation. Prices
          may vary based on the terms.
        </p>
        <h3>6. Delivery Dates</h3>
        <p>
          All delivery dates are approximate and will be advised based on the
          dispatch date.
        </p>
        <h3>7. Agreement</h3>
        <p>
          All order acknowledgments accepted by the buyer shall be subject to
          these terms and conditions, which may be changed or amended from time
          to time by Ingredients Bank. In the event of a discrepancy between the
          terms in an invoice and these terms, the terms in the invoice shall
          prevail.
        </p>
        <hr />
        <p>
          By using our website, you acknowledge that you have read, understood,
          and agree to be bound by these terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default termsAndConditions;
