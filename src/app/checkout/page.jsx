"use client";

import { useState, useEffect } from "react";
import AmountList from "../Components/AmountList";
import Breadcrumb from "../Components/Breadcrumb";
import CouponCode from "../Components/CouponCode";
import SectionHeader from "../Components/SectionHeader";
import CheckoutAddress from "../Components/CheckoutAddress";
import { apiUrl, woocommerceKey } from "../Utils/variables";
import PaymentButton from "../Components/PaymentButton";
import PaymentOptionsList from "../Components/PaymentOptionsList";
import withAuth from "../Utils/withAuth";
import { useCartContext } from "../Context/cartContext";
import GuestCheckoutAddressForm from "../Components/Forms/GuestCheckoutAddressForm";



function Checkout() {


  const { guestUser, setGuestUser } = useCartContext();



  // State to store the fetched data
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [couponCodes, setCouponCodes] = useState(null);
  

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch payment options
        const paymentOptionsResponse = await fetch(
          `${apiUrl}wp-json/wc/v3/payment_gateways${woocommerceKey}`,
          {
            next: {
              revalidate: 60,
              cache: "no-store",
            },
          }
        );
        const paymentOptionsData = await paymentOptionsResponse.json();
        setPaymentOptions(paymentOptionsData);

        // Fetch coupon codes
        const couponCodeResponse = await fetch(
          `${apiUrl}wp-json/wc/v3/coupons${woocommerceKey}`,
          {
            next: {
              revalidate: 60,
              cache: "no-store",
            },
          }
        );
        const couponCodeData = await couponCodeResponse.json();
        setCouponCodes(couponCodeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  console.log(guestUser)
  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="pt-0 sm:pb-10 pb-0">
        <div className="container !px-0 sm:px-5">
          <div className="grid sm:gap-16 gap-5 lg:grid-cols-[60%,35%] checkout lg:justify-between">
            <div className="grid gap-7">
             
             {!guestUser ? <CheckoutAddress />
             :
              <div className="card bg-white grid mt-5">
              <SectionHeader title="Add billing details" card />
              <GuestCheckoutAddressForm/>
              </div>
}
            </div>
            <div className="grid gap-7">
              <div className="card-rounded-none-small w-full bg-white py-5 px-4">
                <SectionHeader title="Your order" card />
                <div className="grid gap-5">
                  <CouponCode data={couponCodes && couponCodes} />
                  <div className="border-b pb-4">
                    <AmountList />
                  </div>
                  <div className="grid gap-2">
                    <SectionHeader title="Payment options" small spacingSm />
                    {paymentOptions && (
                      <PaymentOptionsList data={paymentOptions} />
                    )}
                  </div>
                  <PaymentButton />
                  <small className="text-xs opacity-55 leading-5">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

 export default withAuth(Checkout);
