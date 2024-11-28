"use client"; // This is necessary to enable React in this file

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  homeUrl,
  paymentCurrency,
  publicKey,
  siteName,
} from "../Utils/variables";
import { useCartContext } from "../Context/cartContext";
import Alerts from "./Alerts";
import { useCheckoutContext } from "../Context/checkoutContext";

export default function RazorPayment({ userData }) {





  const { cartItems, couponCode, discount, cartSubTotal } = useCartContext();

  const { billingAddress,  setValidateAddress, updatePaymentStatus, paymentTerms, setValidateTerms } =
    useCheckoutContext();






console.log(discount)


  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const router = useRouter();

  const payAmount = cartSubTotal - discount;

  const handlePayment = async () => {
    
    setLoading(true);

    if (!billingAddress) {
      setValidateAddress(true);
      setValidate(true);
      setValidationMessage("Please select a billing address");
      return;
    }

    if (!paymentTerms) {
      setValidateTerms(true);
      setValidate(true);
      setValidationMessage("You must accept the terms and conditions to proceed.");
      return;
    }

    try {
      // Step 1: Get the order ID from the server
      const response = await fetch(`${homeUrl}api/checkout/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       // body: JSON.stringify({ amount: payAmount && payAmount }), // Amount in INR (1 = 1 INR)
        body: JSON.stringify({ amount: 1 }), // Amount in INR (1 = 1 INR)
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

        //amount: payAmount && payAmount * 100, // Amount in paise (1 INR = 100 paise)
        amount: 1 * 100, // Amount in paise (1 INR = 100 paise)
        currency: paymentCurrency,
        name: siteName,
        description: `Payment - ${siteName}`,
        order_id: data.orderId, // Use the order ID received from the API
        handler: function (response) {
          // Step 3: Handle payment success
         

         
          console.log("Payment Successful: " + response.razorpay_payment_id);
          updatePaymentStatus("success"); // Update payment status to 'success'
         
         
         //PUT ORDER

         
         
         
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
    <>
      {validate && <Alerts status="red" title={validationMessage} />}
      <button
        onClick={handlePayment}
        className="btn-large"
        // disabled={!billingAddress}
      >
        Proceed to checkout
      </button>
    </>
  );
}
