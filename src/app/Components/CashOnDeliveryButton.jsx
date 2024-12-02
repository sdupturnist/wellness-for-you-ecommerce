"use client"; // This is necessary to enable React in this file

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  apiUrl,
  freeShipping,
  homeUrl,
  jwtTocken,
  paymentCurrency,
  siteEmail,
  siteLogo,
  siteName,
} from "../Utils/variables"; // Ensure you use environment variables here for sensitive info
import { useCartContext } from "../Context/cartContext";
import Alerts from "./Alerts";
import { useCheckoutContext } from "../Context/checkoutContext";
import { sendMail } from "../Utils/Mail";
import { OrderPlacedEmailTemplate } from "../Utils/MailTemplates";
import Swal from "sweetalert2";

export default function CashOnDeliveryPayment({ userData }) {
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
    setPaymentId,
    setPaymentTerms,
  } = useCheckoutContext();

  console.log(cartItems)


  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const router = useRouter();

  // Calculate the amount to pay after applying any discount
  const payAmount = discount ? cartSubTotal - discount : cartSubTotal;

 


  // Filter out image and id from the cart items before sending to the backend
  const filteredItems = cartItems.map(({ id, image, ...rest }) => rest);


  console.log(filteredItems)

  // Handle the payment and order creation logic
  const handlePayment = async () => {
    

    // Validation checks for billing address and payment terms
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

    // SweetAlert2 confirmation dialog
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-light",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `Do you need to confirm your order with Cash on Delivery?`,
        icon: false,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Prepare the order information for WooCommerce API
            const orderInfo = {
              transaction_id: "", // No transaction ID for COD
              customer_id: userData?.id,
              payment_method: "cash_on_delivery", // Payment method for COD
              payment_method_title: "Cash on Delivery", // Payment method title
              set_paid: false, // Mark as unpaid for COD
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
                  method_id: "free_shipping", // Shipping method for free shipping
                  method_title: "Free Shipping", // Shipping method title
                  total: "0", // No shipping charge for free shipping
                },
              ],
            };

            // Step 2: Send the order information to WooCommerce API
            const response = await fetch(
              `${apiUrl}wp-json/wc/v3/orders`, // WooCommerce orders endpoint
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtTocken}`, // Authorization header with JWT token
                },
                body: JSON.stringify(orderInfo),
              }
            );

            if (response.ok) {
              // Send email notification to the user
              await sendMail({
                sendTo: userData?.email,
                subject: "You Have Successfully Ordered",
                name: userData?.name,
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  billingAddress,
                  cartItems,
                  "COD", // No order ID for COD
                  "Cash on Delivery", // Payment method
                  userData,
                  ""
                ),
              });

              // Send email notification to the admin
              await sendMail({
                sendTo: siteEmail,
                subject: "You Have Received a New Order",
                name: "Admin",
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  billingAddress,
                  cartItems,
                  "COD", // No order ID for COD
                  "Cash on Delivery", // Payment method
                  userData,
                  ""
                ),
              });

              console.log("Order successfully created");

              // Reset cart and validation states after successful payment
              setCartItems([]); // Clear cart items
              setCartSubTotal(0); // Reset subtotal
              setCartTotal(0); // Reset total
              setCouponCode(false); // Reset coupon code flag
              setDiscount(0); // Reset discount
              setValidateTerms(false); // Reset terms validation flag
              setValidateAddress(false); // Reset address validation flag
              setPaymentTerms(false); // Reset payment terms
              localStorage.removeItem("cartItems"); // Remove items from localStorage

              // Redirect to success page
              router.push(`${homeUrl}checkout/success`);
            } else {
              throw new Error("Failed to create order in WooCommerce");
            }
          } catch (error) {
            console.error("Error during order processing: ", error);
            setLoading(false);
            setUpdatePaymentStatus("failed");
            setValidateTerms(false);
            setValidateAddress(false);
            setPaymentTerms(false);
            router.push(`${homeUrl}checkout/failed`); // Redirect to failed checkout page
          }
        }
      });
  };

  return (
    <>
      {validate && <Alerts status="red" title={validationMessage} />}
      <button
        onClick={handlePayment}
        className="btn-large"
       
      >
       Proceed to checkout
      </button>
    </>
  );
}
