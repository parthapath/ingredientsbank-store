import styles from "./page.module.css";

export const metadata = {
  title: `Shipping and Returns - ${process.env.APP_NAME}`,
};

const shippingAndReturns = async () => {
  return (
    <div className={["page-wrapper", styles.ShippingAndReturns].join(" ")}>
      <div className="container">
        <h2>Shipping and Return Policy</h2>
        <ul>
          <li>
            Ingredient must be approved or rejected with in 15-20 days from the
            date of receipt at your warehouse / factory.
          </li>
          <li>
            In case of Third party lab test, you must declare our batch no on
            the external lab report and test method followed by buyer & seller
            must be same. If difference in the teste method, returns are not
            accepted incase of of rejection.
          </li>
          <li>
            If there is a rejections, goods must be returned with original
            packaging and label photographs prior to return. returns will not be
            accepted without email confirmation.
          </li>
          <li>
            Replacement for the return shipment is accepted with valid reason
            for rejection and return and will be decided based on the shipping
            terms and email confirmation.
          </li>
          <li>
            <strong>Damages:</strong> Any damages must be brought to the
            attention of Ingredients Bank within 2 days of the customer&apos;s
            receipt. Proof of damage must be provided by photo or indicated on
            the bill of lading when delivered.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default shippingAndReturns;
