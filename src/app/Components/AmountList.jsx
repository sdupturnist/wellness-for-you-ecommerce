"use client";

export default function AmountList({data, forOrderDetails }) {
  return (
    <>
      {!forOrderDetails && (
        <ul className="amount-list">
          <li>
            <span className="label">Coupon discount</span>
            <span className="val !text-green-600">-₹498</span>
          </li>
          <li>
            <span className="label">Subtotal</span>
            <span className="val">-₹5,498</span>
          </li>
          <li className="border-t border-border pt-3 mt-3">
            <span className="label">Total</span>
            <span className="val text-lg font-bold">₹5,000</span>
          </li>
        </ul>
      )}
      {forOrderDetails && (
        <ul className="amount-list">
          <li>
            <span className="label">{data?.product_title} x {data?.order_qty}</span>
            <span className="val">₹{data?.order_amout}</span>
          </li>
          <li>
            <span className="label">Shipping</span>
            <span className={`${data?.shipping === 'Free Shipping' && '!text-green-600'} val`}>{data?.shipping}</span>
          </li>
          <li>
            <span className="label">Payment Method</span>
            <span className="val">{data?.payment_method}</span>
          </li>
          <li>
            <span className="label">Coupon discount</span>
            <span className="val !text-green-600">-₹{data?.coupon_discount}</span>
          </li>
          <li>
            <span className="label">Subtotal</span>
            <span className="val">₹{data?.subtotal}</span>
          </li>
          <li className="border-t border-border pt-3 mt-3">
            <span className="label">Total</span>
            <span className="val text-lg font-bold">₹{data?.total}</span>
          </li>
        </ul>
      )}
    </>
  );
}
