"use client";

import { useCheckoutContext } from "../Context/checkoutContext";
import CashOnDeliveryPayment from "./CashOnDeliveryButton";
import RazorPayment from "./RazorPaymentButton";

export default function PaymentButton({ message, type, onClose, userData }) {
  
  const { paymentMethodOption } = useCheckoutContext();

  console.log(paymentMethodOption)

  return paymentMethodOption === "cod" ? (
    <CashOnDeliveryPayment userData={userData} />
  ) : (
    <RazorPayment userData={userData} />
  );
}
