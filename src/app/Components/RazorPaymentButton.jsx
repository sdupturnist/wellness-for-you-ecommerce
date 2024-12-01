"use client"; // This is necessary to enable React in this file

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  apiUrl,
  freeShipping,
  homeUrl,
  paymentCurrency,
  publicKey,
  siteEmail,
  siteLogo,
  siteName,
  woocommerceKey,
} from "../Utils/variables"; // Ensure you use environment variables here for sensitive info
import { useCartContext } from "../Context/cartContext";
import Alerts from "./Alerts";
import { useCheckoutContext } from "../Context/checkoutContext";
import { sendMail } from "../Utils/Mail";
import { OrderPlacedEmailTemplate } from "../Utils/MailTemplates";

export default function RazorPayment({ userData }) {
  const {
    cartItems,
    couponCode,
    discount,
    cartSubTotal,
    setCartItems,
    setCartSubTotal,
    setCartTotal,
    setCouponCode,
    setDiscount,
    couponData,
  } = useCartContext();
  const {
    billingAddress,
    setValidateAddress,
    setUpdatePaymentStatus,
    paymentTerms,
    setValidateTerms,
    paymentMethodOption,
    setPaymentId,
    paymentId,
    setPaymentTerms
  } = useCheckoutContext();

  const [ip, setIp] = useState(null);

  useEffect(() => {
    const getIp = async () => {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIp(data.ip);
    };

    getIp();
  }, []);

  // Calculate payAmount (considering discount)
  const payAmount = discount ? cartSubTotal - discount : cartSubTotal;

  const filteredItems = cartItems.map(({ id, image, ...rest }) => rest);

 

  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const router = useRouter();



  const handlePayment = async () => {
    setLoading(true);
  
    // Validation checks
    if (!billingAddress) {
      setValidateAddress(true);
      setValidate(true);
      setValidationMessage("Please select a billing address");
      return;
    }
  
    if (!paymentTerms) {
      setValidateTerms(true);
      setValidate(true);
      setValidationMessage(
        "You must accept the terms and conditions to proceed."
      );
      return;
    }
  
    try {
      // Step 1: Create the order ID from the server
      const response = await fetch(`${homeUrl}api/checkout/razorpay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: payAmount }), // Amount in paise (1 INR = 100 paise)
      });
  
      const data = await response.json();
  
      if (!data.success) {
        alert("Error creating order");
        setLoading(false);
        return;
      }
  
      // Step 2: Prepare Razorpay payment options
      const options = {
        key: publicKey, // Razorpay public key from environment variables
        amount: payAmount, // Amount in paise (1 INR = 100 paise)
        currency: paymentCurrency,
        name: siteName,
        description: `Payment - ${siteName}`,
        order_id: data.orderId, // Use the order ID received from the API
        handler: async function (response) {
          // Step 3: Handle payment success
          console.log("Payment Successful: " + response.razorpay_payment_id);
          setUpdatePaymentStatus("success");
  
          setPaymentId(response.razorpay_payment_id || "null");
          const transationID = response.razorpay_payment_id;
  
          try {
            // PUT Order to WooCommerce API
            const orderInfo = {
              transaction_id: transationID || "",
              customer_id: userData?.id,
              customer_ip_address: (ip && ip) || "",
              payment_method: paymentMethodOption || "", // Payment method, such as bacs (direct bank transfer)
              payment_method_title: paymentMethodOption || "", // Title to display for the payment method
              set_paid: true, // Whether the order is paid (true/false)
              billing: {
                first_name: billingAddress?.fullname_and_lastname || "",
                last_name: billingAddress?.fullname_and_lastname || "",
                address_1: billingAddress?.address_1 || "",
                address_2: billingAddress?.address_2 || "",
                city: billingAddress?.city || "",
                state: billingAddress?.state || "",
                postcode: billingAddress?.postcode || "",
                country: billingAddress?.country || "",
                email: userData?.email || "",
                phone: userData?.phone || "",
              },
              shipping: {
                first_name: billingAddress?.fullname_and_lastname || "",
                last_name: billingAddress?.fullname_and_lastname || "",
                address_1: billingAddress?.address_1 || "",
                address_2: billingAddress?.address_2 || "",
                city: billingAddress?.city || "",
                state: billingAddress?.state || "",
                postcode: billingAddress?.postcode || "",
                country: billingAddress?.country || "",
              },
              line_items: filteredItems || [],
              coupon_lines: couponData || [],
              shipping_lines: [
                {
                  method_id: "free_shipping", // Shipping method ID for free shipping
                  method_title: "Free Shipping", // Shipping method title
                  total: "0", // Shipping cost for free shipping
                },
              ],
            };
  
            const response = await fetch(
              `${apiUrl}wp-json/wc/v3/orders${woocommerceKey}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: jwtTocken, // Use appropriate authorization if needed
                },
                body: JSON.stringify(orderInfo),
              }
            );
  
            if (response.ok) {
              // Send mail notification to user (update the sendMail function as needed)
              await sendMail({
                sendTo: userData?.email,
                subject: `You Have Successfully Ordered`,
                name: userData?.name,
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  billingAddress,
                  cartItems,
                  data.orderId,
                  paymentMethodOption,
                  userData,
                  paymentId
                ),
              });
  
              // Send mail notification to Admin
              await sendMail({
                sendTo: siteEmail,
                subject: `You Have Recieved a new order`,
                name: `Admin`,
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  billingAddress,
                  cartItems,
                  data.orderId,
                  paymentMethodOption,
                  userData,
                  paymentId
                ),
              });
  
        
  
              // Reset cart and validation states after successful payment
              setCartItems([]); // Clear cart items
              setCartSubTotal(0); // Reset subtotal
              setCartTotal(0); // Reset total
              setCouponCode(false); // Reset coupon code flag
              setDiscount(0); // Reset discount
              setValidateTerms(false); // Reset terms validation flag
              setValidateAddress(false); // Reset address validation flag
              setPaymentTerms(false)
              localStorage.removeItem("cartItems");
  
              // Redirect on success
              router.push(`${homeUrl}checkout/success`);
            } else {
              throw new Error("Failed to create order in WooCommerce");
            }
          } catch (error) {
            console.error("Error during order processing: ", error);
            setUpdatePaymentStatus("failed");
            router.push(`${homeUrl}checkout/failed`); // Redirect to failed checkout page
          }
        },
        prefill: {
          name: userData?.name,
          email: userData?.email,
          contact: userData?.phone,
        },
        notes: {
          company: billingAddress?.company,
          country: billingAddress?.country,
          address_1: billingAddress?.address_1,
          address_2: billingAddress?.address_2,
          state: billingAddress?.state,
          city: billingAddress?.city,
          postcode: billingAddress?.postcode,
        },
        theme: {
          color: "#137E43", // Custom theme color
        },
      };
  
      // Open the Razorpay payment gateway
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment process: ", error);
      setLoading(false);
      setUpdatePaymentStatus("failed");
      setValidateTerms(false); 
      setValidateAddress(false); 
      setPaymentTerms(false)
      router.push(`${homeUrl}checkout/failed`); // Redirect on failure
    }
  };
  

  return (
    <>
      {validate && <Alerts status="red" title={validationMessage} />}
      <button
        onClick={handlePayment}
        className="btn-large"
        //disabled={loading} // Disable button during loading
      >
        {/* {loading ? "Processing..." : "Proceed to checkout"} */}
        Proceed to checkout
      </button>
    </>
  );
}
