"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import axios from "../../axios";
import moment from "moment";
import Link from "next/link";
import ReactPaginate from "react-paginate";

import styles from "./page.module.css";

import SideMenu from "@/components/SideMenu/SideMenu";

const Orders = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedPage = searchParams.get("page");

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(selectedPage ? parseInt(selectedPage) : 1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);

  const updateSearchParam = ({ key, value }) => {
    const params = new URLSearchParams(searchParams);

    params.set(key, value);
    return `${pathname}?${params.toString()}`;
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
    router.push(updateSearchParam({ key: "page", value: e.selected + 1 }));
  };

  const fetchOrders = useCallback(() => {
    axios
      .get(`/orders?page=${page}&per-page=5`)
      .then((response) => {
        setOrders(response.data);
        setPageCount(parseInt(response.headers["x-pagination-page-count"]));
        setRecordCount(parseInt(response.headers["x-pagination-total-count"]));
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className={["page-wrapper", styles.OrdersWrapper].join(" ")}>
      <div className={["container", styles.Container].join(" ")}>
        <SideMenu />
        <div className={styles.Content}>
          <div className={styles.PageHeader}>
            <div className={styles.Title}>
              <h1>Orders ({recordCount})</h1>
            </div>
          </div>
          <div className={styles.PageContent}>
            <div className={styles.Orders}>
              {orders.length ? (
                orders.map((item, i) => {
                  return (
                    <Link href={`/orders/${item.ref_id}`} key={i}>
                      <div className={styles.Order}>
                        <div className={styles.Overview}>
                          <div>
                            <div>
                              <span>Order ID</span>{" "}
                              <span className={styles.OrderId}>
                                {item.ref_id}
                              </span>
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
                              <div className={styles.Address}>
                                <div>
                                  {item.shipping_address.contact_name},{" "}
                                  {item.shipping_address.contact_no}
                                </div>
                                <div>{item.shipping_address.address}</div>
                              </div>
                              {item.status.id === 3 ? (
                                <>
                                  <div className={styles.shippingNo}>
                                    <div>Courier</div>
                                    <div>{item.courier}</div>
                                  </div>
                                  <div className={styles.shippingNo}>
                                    <div>Shipping Tracking No</div>
                                    <div>{item.shipping_tracking_no}</div>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div>You have not placed any order...</div>
              )}
            </div>
            {orders.length ? (
              <div className={styles.Pagination}>
                <ReactPaginate
                  nextLabel="NEXT"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  forcePage={page - 1}
                  pageCount={pageCount}
                  previousLabel="PREVIOUS"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Orders />
    </Suspense>
  );
};

export default OrdersWithSuspense;
