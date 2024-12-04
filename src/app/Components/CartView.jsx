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


export default function CartView() {
  const { cartItems } = useCartContext();
  const { auth } = useAuthContext(); 

  const router = useRouter(); 


 

  const goToCheckout = () => {
    if (auth) {
      router.push(`${homeUrl}checkout`);
    } else {
      router.push(`${homeUrl}login`);
    }
  };

 

  return (
    <div
      className={`grid sm:gap-16 gap-5 ${
        !cartItems.length > 0 ? "lg:grid-cols-1" : "lg:grid-cols-[60%,28%]"
      } cart lg:justify-between`}
    >
      <div
        className={`bg-white sm:p-0 py-5 px-4 ${!cartItems.length > 0 && "text-center pb-14"}`}
      >
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
              <button onClick={goToCheckout} className="btn btn-large">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
