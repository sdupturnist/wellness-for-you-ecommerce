"use client";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import CartListItem from "./CartListItem";
import AmountList from "./AmountList";
import CouponCode from "./CouponCode";
import { useCartContext } from "../Context/cartContext";
import { homeUrl } from "../Utils/variables";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../Context/authContext"; // import useAuthContext here
import { useEffect, useLayoutEffect } from "react";
import { isLoggined } from "../Utils/checkAuth";
import Swal from "sweetalert2";

export default function CartView() {
  const { cartItems, setGuestUser, guestUser } = useCartContext();
  const { auth } = useAuthContext(); // Get authentication status
  const router = useRouter();

  const handleGuestCheckout = () => {
    if (!auth) {
      setGuestUser(true);
      router.push(`${homeUrl}/checkout`);
    }
  };

  return (
    <div
      className={`grid sm:gap-16 gap-4 ${
        !cartItems.length > 0 ? "lg:grid-cols-1" : "lg:grid-cols-[60%,28%]"
      } cart lg:justify-between`}>
      <div
        className={`bg-white sm:p-0 py-5 px-4 ${
          !cartItems.length > 0 && "text-center pb-14"
        }`}>
        <CartListItem />
        <Link href="/" className="btn btn-light btn-large sm:w-auto w-full">
          Continue shopping
        </Link>
      </div>
      {cartItems.length > 0 && (
        <div className="grid gap-7">
          <div className="card-rounded-none-small w-full bg-white py-5 px-4">
            <SectionHeader title="Cart totals" card />
            <div className="grid gap-5">
              <CouponCode />
              <AmountList />
              <button
  onClick={() => {
    if (!auth) {
      // If not authenticated, show the SweetAlert dialog
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-light",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Login to Checkout",
          text: "Log in to your account to continue with the checkout process.",
          icon: false,
          showCancelButton: true, // Show cancel button
          confirmButtonText: "Login",
          cancelButtonText: "Guest checkout",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            // If user confirms (clicks "Login")
            router.push(`${homeUrl}/login`);
          } else if (result.isDismissed) {
            // If user cancels (clicks "Guest checkout")
            setGuestUser(true);
            router.push(`${homeUrl}/checkout`);
          }
        });
    } else {
      // If user is authenticated, directly go to checkout
      router.push(`${homeUrl}/checkout`);
    }
  }}
  className="btn btn-large"
>
  Proceed to checkout
</button>



              {!auth && (
                <button
                  onClick={handleGuestCheckout}
                  className="btn btn-light btn-large">
                  Continue as a guest
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
