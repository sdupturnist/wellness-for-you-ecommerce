"use client";

import { useCheckoutContext } from "../Context/checkoutContext";
import RazorPayment from "./RazorPaymentButton";

export default function PaymentButton({ message, type, onClose, userData }) {
  const { paymentMethodOption } = useCheckoutContext();

  return paymentMethodOption === "cod" ? (
    <button className="btn-large">Proceed to checkout</button>
  ) : (
    <RazorPayment userData={userData} />
  );
}
