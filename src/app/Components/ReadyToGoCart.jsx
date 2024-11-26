"use client";

import Link from "next/link";
import { currency, homeUrl } from "../Utils/variables";
import { AOSInit } from "./Aos";


export default function ReadyToGoCart({ data }) {
  const totalAmount =
    data &&
    data.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);

  return (
    <>
      <AOSInit />
      <div className="ready-to-go-cart" data-aos="fade-up">
        <div className="">
          <span className="font-bold">
            {currency}
            {totalAmount}
          </span>{" "}
          <span className="text-body opacity-50">
            ({data && data?.length} items)
          </span>
        </div>
        <Link href={`${homeUrl}cart`} className="btn">
          Go to cart
        </Link>
      </div>
    </>
  );
}
