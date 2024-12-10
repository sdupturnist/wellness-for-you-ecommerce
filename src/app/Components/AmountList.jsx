"use client";

import Link from "next/link";
import {
  currency,
  homeUrl,
  shippingCharge,
  shippingChargeLimit,
} from "../Utils/variables";
import SectionHeader from "./SectionHeader";
import { useCartContext } from "../Context/cartContext";
import { useEffect } from "react";

export default function AmountList({
  data,
  labels,
  forOrderDetails,
  tableView,
  coupon,
  action,
}) {
  const { cartItems, couponCode, discount, cartSubTotal } = useCartContext();

  useEffect(() => {}, [cartItems, couponCode, discount, cartSubTotal]);

  const renderAmountList = () => {
    switch (true) {
      case !forOrderDetails && !tableView:
        return (
          <ul className="amount-list">
            <li>
              <span className="label">Subtotal</span>
              <span className="val">
                {currency}
                {cartSubTotal}
              </span>
            </li>
            {couponCode && (
              <li>
                <span className="label">Coupon discount</span>
                <span className="val !text-green-600">
                  -{currency}
                  {parseInt(discount)}
                </span>
              </li>
            )}
            {shippingChargeLimit > cartSubTotal && (
              <li>
                <span className="label">Shipping fee</span>
                <span className="val ">
                  {currency}
                  {shippingCharge}
                </span>
              </li>
            )}
            <li className="border-t border-border pt-3 mt-3">
              <span className="label">Total</span>
              <span className="val text-lg font-bold !grid justify-end text-end grid-2">
                <span className="block">
                  {currency}
                  {cartSubTotal +
                    (shippingChargeLimit > cartSubTotal && shippingCharge) -
                    discount}
                </span>
                {couponCode && (
                  <span className="text-xs text-primary font-normal mt-1">
                    Discount amount -{currency}
                    {discount} applied
                  </span>
                )}
              </span>
            </li>
          </ul>
        );
      case forOrderDetails:
        return (
          <ul className="amount-list capitalize">
            {data?.line_items &&
              data?.line_items.map((item, index) => (
                <li key={index}>
                  <span className="label">
                    {item?.name} x {item?.quantity}
                  </span>
                  <span className="val">
                    {currency}
                    {item?.subtotal}
                  </span>
                </li>
              ))}

            {/* <li> */}
            {/* <span className="label">Payment Method</span> */}
            {/* <span className="val">{data?.payment_method_title}</span> */}
            {/* </li> */}

            {/* Subtotal Calculation */}
            <li>
              <span className="label">Subtotal</span>
              <span className="val">
                {currency}
                {data?.line_items?.reduce((acc, item) => {
                  const priceWithQuantity = item?.price * item?.quantity;
                  return acc + priceWithQuantity;
                }, 0) + parseInt(data?.discount_total, 10)}
              </span>
            </li>
            <li>
              <span className="label">Shipping</span>
              <span
                className={`${
                  data?.shipping_lines[0]?.method_id === "free_shipping" &&
                  "!text-green-600"
                } val`}>
                {data?.shipping_lines[0]?.method_id === "free_shipping" &&  data?.shipping_lines[0]?.method_title}
                {data?.shipping_lines[0]?.method_id === "flat_rate" &&  currency+shippingCharge}
              </span>
            </li>
            {data?.discount_total > 0 && (
              <li>
                <span className="label !text-green-600">Coupon discount</span>
                <span className="val !text-green-600">
                  -{currency}
                  {data?.discount_total}
                </span>
              </li>
            )}

            <li>
              <span className="label">Total</span>
              <span className="val text-lg font-bold">
                {currency}
                {data?.total}
              </span>
            </li>
          </ul>
        );
      case tableView:
        return (
          <ul className="amount-list">
            {data &&
              data.map((item, index) => (
                <div key={index}>
                  <div className="items-center mb-5">
                    <SectionHeader
                      spacingSm
                      titleSmall
                      title={`${
                        item.transaction_id
                          ? `Transaction ID: #` + item.transaction_id
                          : `Order ID: #` + item?.id
                      }`}
                    />
                  </div>
                  <ul className="table-amount-list mb-2 capitalize" key={index}>
                    <li>
                      <span className="label">Payment Method:</span>
                      <span className="text-sm">
                        {item.payment_method_title}
                      </span>
                    </li>
                    <li>
                      <span className="label">Payment Status:</span>
                      <span
                        className={`${
                          item.status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                        } text-sm font-semibold`}>
                        {item.status}
                      </span>
                    </li>
                    {item.refund_information === 1 && (
                      <li>
                        <span className="label">Refund Status:</span>
                        <span className="text-sm text-green-600">Refunded</span>
                      </li>
                    )}
                  </ul>

                  {/* <Invoice/> */}
                  {item?.status === "completed" && (
                    <Link
                      href={`${homeUrl}account/transations/${item?.id}`}
                      className="btn btn-medium btn-light mt-3">
                      View
                    </Link>
                  )}
                </div>
              ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return <>{renderAmountList()}</>;
}
