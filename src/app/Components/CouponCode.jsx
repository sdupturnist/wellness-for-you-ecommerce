"use client";

import { useState, useEffect } from "react";
import Loading from "./Loading";
import Alerts from "./Alerts";
import { useCartContext } from "../Context/cartContext";
import {
  apiUrl,
  currency,
  jwtTocken,
  woocommerceKey,
} from "../Utils/variables";
import { useAuthContext } from "../Context/authContext";



export default function CouponCode() {

  

  const { userData } = useAuthContext();


  const { setCouponCode, setDiscount, cartSubTotal, setCouponData } =
    useCartContext();

  const [allCouponData, setAllCouponData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCouponsData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}wp-json/wc/v3/coupons${woocommerceKey}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtTocken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAllCouponData(data);
      } catch (err) {
      
      } finally {
      }
    };

    fetchCouponsData();
  }, [allCouponData]);

  const checkCouponCode = (data, couponCode, cartSubTotal) => {
    setIsLoading(true);

    let couponDataToPaymentInfo = data.map((item) => {
      const { id, ...rest } = item; // Remove 'id' and keep the rest
      return rest;
    });

    // Find the coupon data that matches the entered coupon code
    const couponData = data.find((item) => item.code === couponCode);
    const hasValidCoupon = couponData && couponData.code === couponCode;
    setIsValid(hasValidCoupon);
    setIsLoading(false);

    if (hasValidCoupon) {
      const discountAmount = couponData?.amount || 0;
      const minimumAmount = couponData?.minimum_amount || 0;
      const expirationDate = couponData?.date_expires;
      const usageLimit = couponData?.usage_limit_per_user || 0;
      const usedCount = couponData?.usage_count || 0; // assuming `usage_count` tracks how many times this coupon has been used
      const usedBy = couponData?.used_by || [];

      // Check if the coupon has expired
      const currentDate = new Date();
      const couponExpirationDate = new Date(expirationDate);

  

      if (couponExpirationDate < currentDate) {
        setMessage("This coupon has expired");
        setCouponCode(false);
        setDiscount(0);
        setIsValid(false);
      } else if (
        usedBy.includes(userData?.id) ||
        usedBy.includes(userData?.id)
      ) {
        // Assuming userData?.id is the current user's ID or email
        setMessage("You have already used this coupon.");
        setCouponCode(false);
        setDiscount(0);
        setIsValid(false);
      } else if (
        usedCount >= usageLimit &&
        couponData?.usage_limit_per_user !== null
      ) {
        setMessage("This coupon has reached its usage limit for your account.");
        setCouponCode(false);
        setDiscount(0);
        setIsValid(false);
      } else if (cartSubTotal >= minimumAmount) {
        // Apply the discount
        setMessage("Coupon code applied successfully!");
        setCouponCode(true);
        setDiscount(parseInt(discountAmount));

        setCouponData(couponDataToPaymentInfo);
      } else {
        setMessage(
          `The minimum cart total of ${currency}${minimumAmount} has not been met to apply the coupon.`
        );
        setCouponCode(false);
        setDiscount(0);
        setIsValid(false);
      }
    } else {
      setMessage("This coupon has expired or is invalid");
      setCouponCode(false);
      setDiscount(0);
    }

    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="coupon-code">
      <div className="join input-section w-full">
        <input
          required
          type="text"
          placeholder="Have coupon code?"
          className="input join-item"
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          onClick={() => checkCouponCode(allCouponData, coupon, cartSubTotal)}
          className="btn join-item !h-[48px]">
          Apply
          {isLoading && <Loading />}
        </button>
      </div>

      {isValid !== null && showAlert && (
        <span
          className={`text-sm block my-2 ${
            isValid ? "text-green-600" : "text-red-500"
          }`}>
          {isValid ? (
            <Alerts status="green" title={message} />
          ) : (
            <Alerts status="red" title={message} />
          )}
        </span>
      )}
    </div>
  );
}
