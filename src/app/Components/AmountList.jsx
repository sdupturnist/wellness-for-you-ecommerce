"use client";

import Link from "next/link";
import { currency } from "../Utils/variables";
import SectionHeader from "./SectionHeader";
import { useCartContext } from "../Context/cartContext";
import { useEffect } from "react";

export default function AmountList({
  data,
  labels,
  forOrderDetails,
  tableView,
  coupon,
}) {


  const { cartItems, couponCode, discount, cartSubTotal } = useCartContext();

useEffect(() => {
  

}, [cartItems, couponCode, discount, cartSubTotal]);




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
                <span className="val !text-green-600">-{currency}{parseInt(discount)}</span>
              </li>
            )}
            <li className="border-t border-border pt-3 mt-3">
              <span className="label">Total</span>
              <span className="val text-lg font-bold !grid justify-end text-end grid-2">
                <span className="block">
                  {currency}
                  {cartSubTotal - discount}
                </span>
                {couponCode && <span className="text-xs text-primary font-normal mt-1">Discount amount -{currency}{discount} applied</span>}
              </span>
            </li>
          </ul>
        );
      case forOrderDetails:
        return (
          <ul className="amount-list capitalize">
            {console.log(data)}
            <li>
              <span className="label">Products x {data?.line_items?.length}</span>
              <span className="val">
                {currency}
                {data?.total}
              </span>
            </li>
            <li>
              <span className="label">Shipping</span>
              <span
                className={`${
                  data?.shipping_lines[0]?.method_id === "free_shipping" && "!text-green-600"
                } val`}>
                {data?.shipping_lines[0]?.method_title}
              </span>
            </li>
            <li>
              <span className="label">Payment Method</span>
              <span className="val">{data?.payment_method}</span>
            </li>
            {/* <li> */}
              {/* <span className="label">Coupon discount</span> */}
              {/* <span className="val !text-green-600"> */}
                {/* -{currency} */}
                {/* {data?.coupon_discount} */}
              {/* </span> */}
            {/* </li> */}
           <span className="bg-red-600"> need to add discount</span>
            <li>
              <span className="label">Subtotal</span>
              <span className="val">
                {currency}
                {data?.total}
              </span>
            </li>
            <li className="border-t border-border pt-3 mt-3">
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
                      title={`Transaction ID: #${item.transaction_ID}`}
                    />
                  </div>
                  <ul className="table-amount-list mb-2" key={index}>
                    <li>
                      <span className="label">Payment Method:</span>
                      <span className="text-sm">
                        {item.payment_method}
                      </span>
                    </li>
                    <li>
                      <span className="label">Payment Status:</span>
                      <span
                        className={`${
                          item.payment_status === "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                        } text-sm`}>
                        {item.payment_status}
                      </span>
                    </li>
                    {item.refund_information === 1 && (
                      <li>
                        <span className="label">Refund Status:</span>
                        <span className="text-sm text-green-600">
                          Refunded
                        </span>
                      </li>
                    )}
                  </ul>

                  {/* <Invoice/> */}
                  <Link href={"asd"} className="btn btn-medium btn-light mt-2">
                    Download Invoice
                  </Link>
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
