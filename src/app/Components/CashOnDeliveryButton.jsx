"use client"; // This is necessary to enable React in this file

import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  apiUrl,
  homeUrl,
  isValidEmail,
  jwtTocken,
  shippingCharge,
  siteEmail,
  siteLogo,
  woocommerceKey,
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
    discount,
    cartSubTotal,
    setCartItems,
    setCartSubTotal,
    setCartTotal,
    setCouponCode,
    setDiscount,
    couponData,
    guestUserData,
    guestUser,
    setGuestUserDataValidation,
    setGuestUser,
    haveShippingCharge,
  } = useCartContext();

  const {
    billingAddress,
    validateAddress,
    setValidateAddress,
    setUpdatePaymentStatus,
    validateTerms,
    setValidateTerms,
    setPaymentTerms,
    setBillingAddress,
  } = useCheckoutContext();

  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const router = useRouter();

  const filteredItems = cartItems.map(({ id, image, ...rest }) => rest);

  const totalDiscount = discount || 0;

  // console.log(guestUserData);

  useLayoutEffect(() => {
    setBillingAddress("");
    setValidateTerms(false);
  }, []);

  // Handle the payment and order creation logic
  const handlePayment = async () => {
    if (guestUser) {
      if (
        guestUserData === null ||
        guestUserData?.address?.firstName === "" ||
        guestUserData?.address?.country === "" ||
        guestUserData?.address?.houseName === "" ||
        guestUserData?.address?.street === "" ||
        guestUserData?.address?.landmark === "" ||
        guestUserData?.address?.state === "" ||
        guestUserData?.address?.city === "" ||
        guestUserData?.address?.pinCode === "" ||
        guestUserData?.address?.phone === "" ||
        guestUserData?.address?.email === "" ||
        !isValidEmail(guestUserData?.address?.email)
      ) {
        console.log("field error");
        setGuestUserDataValidation(true);
        return;
      } else {
        setGuestUserDataValidation(false);
      }
    } else {
      if (!billingAddress && validateAddress === false) {
        setValidateAddress(true);
        setValidate(true);
        setValidationMessage("Please select a billing address");
        return;
      }
    }

    if (validateTerms === false) {
      setValidateTerms(true);
      setValidate(true);
      setValidationMessage(
        "You must accept the terms and conditions to proceed."
      );
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
              customer_id: userData?.id || 1,
              payment_method: "cash_on_delivery", // Payment method for COD
              payment_method_title: "Cash on Delivery", // Payment method title
              set_paid: false, // Mark as unpaid for COD
              billing: {
                  first_name:
                  billingAddress?.firstName ||
                  guestUserData?.address?.firstName ||
                  "",
                last_name:
                  billingAddress?.firstName ||
                  guestUserData?.address?.firstName ||
                  "",
                address_1:
                  billingAddress?.houseName ||
                  guestUserData?.address?.houseName ||
                  "",
                address_2:
                  billingAddress?.street ||
                  guestUserData?.address?.street ||
                  "",
                city:
                  billingAddress?.city || guestUserData?.address?.city || "",
                state:
                  billingAddress?.state || guestUserData?.address?.state || "",
                postcode:
                  billingAddress?.postcode ||
                  guestUserData?.address?.pinCode ||
                  "",
                country:
                  billingAddress?.country ||
                  guestUserData?.address?.country ||
                  "",
                email: userData?.email || guestUserData?.address?.email || "",
                phone: userData?.phone || guestUserData?.address?.phone || "",
              },
              shipping: {
                first_name:
                billingAddress?.firstName ||
                guestUserData?.address?.firstName ||
                "",
              last_name:
                billingAddress?.firstName ||
                guestUserData?.address?.firstName ||
                "",
              address_1:
                billingAddress?.houseName ||
                guestUserData?.address?.houseName ||
                "",
              address_2:
                billingAddress?.street ||
                guestUserData?.address?.street ||
                "",
              city:
                billingAddress?.city || guestUserData?.address?.city || "",
              state:
                billingAddress?.state || guestUserData?.address?.state || "",
              postcode:
                billingAddress?.postcode ||
                guestUserData?.address?.pinCode ||
                "",
              country:
                billingAddress?.country ||
                guestUserData?.address?.country ||
                "",
              email: userData?.email || guestUserData?.address?.email || "",
              phone: userData?.phone || guestUserData?.address?.phone || "",
              },
              line_items: filteredItems || [],
              coupon_lines: couponData || [],
              shipping_lines: haveShippingCharge
                ? [
                    {
                      method_id: "flat_rate",
                      method_title: "Flat Rate",
                      total: shippingCharge.toString(), // Ensure shippingCharge is a string
                    },
                  ]
                : [
                    {
                      method_id: "free_shipping", // Shipping method for free shipping
                      method_title: "Free Shipping", // Shipping method title
                      total: "0", // No shipping charge for free shipping
                    },
                  ],
            };

            // Step 2: Send the order information to WooCommerce API
            const response = await fetch(
              `${apiUrl}wp-json/wc/v3/orders${woocommerceKey}`, // WooCommerce orders endpoint
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
                sendTo: userData?.email || guestUserData?.address?.email,
                subject: "You Have Successfully Ordered",
                name:
                  billingAddress?.firstName ||
                  guestUserData?.address?.full_name,
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  guestUser ? guestUserData?.address : billingAddress,
                  cartItems,
                  "COD", // No order ID for COD
                  "Cash on Delivery", // Payment method
                  guestUser ? guestUserData?.address : userData,
                  "",
                  totalDiscount || 0,
                  cartSubTotal,
                  shippingCharge,
                  haveShippingCharge
                ),
              });

              // Send email notification to the admin
              await sendMail({
                sendTo: siteEmail,
                subject: "You Have Received a New Order",
                name: "Admin",
                message: OrderPlacedEmailTemplate(
                  siteLogo,
                  guestUser ? guestUserData?.address : billingAddress,
                  cartItems,
                  "COD", // No order ID for COD
                  "Cash on Delivery", // Payment method
                  guestUser ? guestUserData?.address : userData,
                  "",
                  totalDiscount || 0,
                  cartSubTotal,
                  shippingCharge,
                  haveShippingCharge
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
              setPaymentTerms(false); // Reset payment terms
              setGuestUser(false);

              localStorage.removeItem("cart"); // Remove items from localStorage
              Cookies.set("checkout_success", "true", { expires: 1 / 1440 });

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
      <button onClick={handlePayment} className="btn-large">
        Proceed to checkout
      </button>
    </>
  );
}
