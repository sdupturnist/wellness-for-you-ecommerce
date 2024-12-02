"use client";

import Link from "next/link";
import { homeUrl, year } from "../Utils/variables";
import PaymentOptions from "./PaymentOptions";
import SocialIcons from "./SocialIcons";
import Subscribe from "./Subscribe";
import ReadyToGoCart from "./ReadyToGoCart";
import { useCartContext } from "../Context/cartContext";
import { usePathname } from "next/navigation";


export default function Footer() {


  const {cartItems} = useCartContext()
  const pathname = usePathname()




  return (
    <>
      <footer className="bg-primary spacing">
        <div className="container grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <ul>
              <li>
                <Link href={homeUrl}>Home</Link>
              </li>
              <li>
                <Link href={`${homeUrl}about-us`}>About Us</Link>
              </li>
              <li>
                <Link href={`${homeUrl}blogs`}>Blog</Link>
              </li>
              <li>
                <Link href={`${homeUrl}contact-us`}>Contact Us</Link>
              </li>
              <li>
                <Link href={`${homeUrl}account/returns`}>Returns</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href={`${homeUrl}privacy-policy`}>Privacy</Link>
              </li>
              <li>
                <Link href={`${homeUrl}terms-conditions`}>Terms & Conditions</Link>
              </li>
              <li>
                <Link href={`${homeUrl}return-refund-policy`}>Return And Refund Policy</Link>
              </li>
              <li>
                <Link href={`${homeUrl}shipping-policy`}>Shipping Policy</Link>
              </li>
             
            </ul>
            <ul>
              <li>
                <Link href="">Address: Calicut, Kerala, India 673004</Link>
              </li>
              <li>
                <Link href="">Phone: +91 8089 319 333</Link>
              </li>
              <li>
                <Link href="">Email: sales@wellness4u.in</Link>
              </li>
              <li>
                <Link href="">Hours: 9am to 5pm, Mon - Fri</Link>
              </li>
            </ul>
            <div className="sm:mt-0 mt-5">
              <h4>Sign up for newsletter today.</h4>
              <Subscribe />
            </div>
          </div>

          <div className="md:flex grid gap-5 justify-between border-t border-dim pt-8">
            <p className="order-last md:order-1">
              Wellness4U Food Supplements © {year}
            </p>
            <div className="order-2">
              <PaymentOptions />
            </div>
            <div className="order-first md:order-last">
              <SocialIcons />
            </div>
          </div>
        </div>
      </footer>
      {/* {cartItems && cartItems.length > 0 && pathname !== '/cart' &&   */}
  {/* <ReadyToGoCart data={cartItems} />} */}
    </>
  );
}
