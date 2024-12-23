"use client";

import Link from "next/link";
import { useSiteContext } from "../Context/siteContext";
import SocialIcons from "./SocialIcons";
import { useEffect, useState } from "react";
import Skelton from "./Skelton";

export default function ContactInfo() {
  const { contactData } = useSiteContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contactData?.acf) {
      setLoading(false);
    }
  }, [contactData]);

  return loading ? (
    <Skelton list />
  ) : (
    <div className="tf-content-left">
      <div className="sm:mb-5 mb-4">
        <p className="sm:mb-2 mb-1 font-bold">Address</p>
        <p>{contactData?.acf?.address}</p>
      </div>
      <div className="sm:mb-5 mb-4">
        <p className="sm:mb-2 mb-1 font-bold">Phone</p>
        <Link href={`tel:${contactData?.acf?.phone}`}>
          Phone: {contactData?.acf?.phone}
        </Link>
      </div>
      <div className="sm:mb-5 mb-4">
        <p className="sm:mb-2 mb-1 font-bold">Email</p>
        <Link href={`mailto:${contactData?.acf?.email}`}>
          Email: {contactData?.acf?.email}
        </Link>
      </div>
      <div className="mb-9">
        <p className="sm:mb-2 mb-1 font-bold">Open Time</p>
        <p className="mb-3">{contactData?.acf?.working_time}</p>
      </div>
      <div>
        <SocialIcons
          color={"#5ba642"}
          size="24"
          centerSM
          data={contactData && contactData}
        />
      </div>
    </div>
  );
}
