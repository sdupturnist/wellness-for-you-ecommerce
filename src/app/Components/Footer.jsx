"use client";

import Link from "next/link";
import { homeUrl, year } from "../Utils/variables";
import PaymentOptions from "./PaymentOptions";
import SocialIcons from "./SocialIcons";
import SubscribeForm from "./Forms/SubscribeForm";
import { useSiteContext } from "../Context/siteContext";

export default function Footer() {
  const { contactData } = useSiteContext();
  

  return (
    <>
      <footer className="spacing">
        <div className="container grid sm:gap-8 gap-5">
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
            </ul>
            <ul>
              <li>
                <Link href={`${homeUrl}privacy-policy`}>Privacy</Link>
              </li>
              <li>
                <Link href={`${homeUrl}terms-conditions`}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href={`${homeUrl}return-refund-policy`}>
                  Return And Refund Policy
                </Link>
              </li>
              <li>
                <Link href={`${homeUrl}shipping-policy`}>Shipping Policy</Link>
              </li>
            </ul>
         {contactData?.acf &&  <ul>
              <li>
                <p>Address: {contactData?.acf?.address}</p>
              </li>
              <li>
                <Link href={`tel:${contactData?.acf?.phone}`}>
                  Phone: {contactData?.acf?.phone}
                </Link>
              </li>
              <li>
                <Link href={`mailto:${contactData?.acf?.email}`}>
                  Email: {contactData?.acf?.email}
                </Link>
              </li>
              <li>
                <p>Hours: {contactData?.acf?.working_time}</p>
              </li>
            </ul> }
            <div className="lg:mt-0 mt-3">
              <h4>Sign up for newsletter today.</h4>
              <SubscribeForm />
            </div>
          </div>

          <div className="md:flex grid gap-5 justify-between border-t border-dim pt-5">
            <p className="order-last md:order-1">
              Wellness4U Food Supplements © {year}
            </p>
            <div className="order-2">
              <PaymentOptions />
            </div>
            <div className="order-first md:order-last">
            {contactData?.acf && <SocialIcons data={contactData && contactData} /> }
            </div>
          </div>
        </div>
      </footer>
      {/* {cartItems && cartItems.length > 0 && pathname !== '/cart' &&   */}
      {/* <ReadyToGoCart data={cartItems} />} */}
    </>
  );
}
