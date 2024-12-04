"use client";

import { useAuthContext } from "../Context/authContext";
import { useCheckoutContext } from "../Context/checkoutContext";
import CashOnDeliveryPayment from "./CashOnDeliveryButton";
import RazorPayment from "./RazorPaymentButton";


export default function PaymentButton({ message, type, onClose }) {
  
  const {userData} = useAuthContext()
  const { paymentMethodOption } = useCheckoutContext();



  return paymentMethodOption === "cod" ? (
    <CashOnDeliveryPayment userData={userData} />
  ) : (
    <RazorPayment userData={userData} />
  );
}
