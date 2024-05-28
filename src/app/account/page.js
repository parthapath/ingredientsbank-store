import styles from "./page.module.css";

import customFetch from "@/utils/fetch.util";
import SideMenu from "@/components/SideMenu/SideMenu";

const account = async () => {
  const reqData = await customFetch("/users");
  const data = await reqData.json();

  return (
    <div className={["page-wrapper", styles.Account].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <h1>Profile</h1>
          </div>
          <div className={styles.PageContent}>
            <div className={styles.Details}>
              <div className={styles.Detail}>
                <div className={styles.Label}>First Name</div>
                <div>{data.first_name}</div>
              </div>
              <div className={styles.Detail}>
                <div className={styles.Label}>Last Name</div>
                <div>{data.last_name}</div>
              </div>
              <div className={styles.Detail}>
                <div className={styles.Label}>Phone</div>
                <div>{data.phone}</div>
              </div>
              <div className={styles.Detail}>
                <div className={styles.Label}>Email</div>
                <div>{data.email}</div>
              </div>
            </div>
            <div className={styles.Details}>
              <div className={styles.Detail}>
                <div className={styles.Label}>Company</div>
                <div>{data.company_name}</div>
              </div>
              <div className={styles.Detail}>
                <div className={styles.Label}>Website</div>
                <div>{data.website}</div>
              </div>
            </div>
            <div className={styles.Details}>
              <div className={styles.Detail}>
                <div className={styles.Label}>Address</div>
                <div>
                  {[
                    data.street_address_1,
                    data.street_address_2,
                    data.city,
                    data.state_province,
                    data.zip_postal_code,
                    data.country,
                  ].join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default account;
