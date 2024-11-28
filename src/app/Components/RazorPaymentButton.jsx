"use client"; // This is necessary to enable React in this file

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { homeUrl, paymentCurrency, publicKey, siteName } from "../Utils/variables";
import { usePayment } from "../Context/PaymentContext";
import { useUserContext } from "../Context/userContext";
import { useCartContext } from "../Context/cartContext";

export default function RazorPayment({ userData }) {
 
  const { cartItems, couponCode, discount, cartSubTotal } = useCartContext();
  const { billingAddress } = useUserContext();



  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { updatePaymentStatus } = usePayment(); // Access the updatePaymentStatus function from context


  const payAmount = (cartSubTotal-discount)

  console.log(payAmount);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Get the order ID from the server
      const response = await fetch(`${homeUrl}api/checkout/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: payAmount && payAmount }), // Amount in INR (1 = 1 INR)
      });

      const data = await response.json();

      if (!data.success) {
        alert("Error creating order");
        setLoading(false);
        return;
      }

      // Step 2: Initialize the Razorpay payment form
      const options = {
        key: publicKey, // Your public Razorpay key

        amount: payAmount && payAmount * 100, // Amount in paise (1 INR = 100 paise)
        currency: paymentCurrency,
        name: siteName,
        description: "Payment for Product/Service",
        order_id: data.orderId, // Use the order ID received from the API
        handler: function (response) {
          // Step 3: Handle payment success
        alert("Payment Successful: " + response.razorpay_payment_id);
          updatePaymentStatus("success"); // Update payment status to 'success'
          router.push(`${homeUrl}checkout/success`); // Redirect on success
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phone,
        },
        notes: {
          // address: "Address for payment",

          company: billingAddress?.company,
          country: billingAddress?.country,
          address_1: billingAddress?.address_1,
          address_2: billingAddress?.address_2,
          state: billingAddress?.state,
          city: billingAddress?.city,
          postcode: billingAddress?.postcode,
        },
        theme: {
          color: "#137E43",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setLoading(false);
      updatePaymentStatus("failed"); // Update payment status to 'failed'
      router.push(`${homeUrl}checkout/failed`); // Redirect on success
    }
  };

  return (
    <button onClick={handlePayment} className="btn-large">
      Proceed to checkout
    </button>
  );
}
