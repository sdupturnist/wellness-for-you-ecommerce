"use client";

import { apiUrl, jwtTocken, siteEmail, siteName } from "@/app/Utils/variables";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";
import { useState } from "react";
import { SubscribeEmailTemplate } from "@/app/Utils/MailTemplates";
import Loading from "../Loading";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}wp-json/wp/v2/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
        body: JSON.stringify({
          title: email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setSuccess("Thank You for Subscribing!");

        //TO ADMIN
        await sendMail({
          sendTo: siteEmail,
          name: "Admin",
          subject: `Subscribe - ${siteName}`,
          message: SubscribeEmailTemplate(email),
        });

        //TO USER
        await sendMail({
          sendTo: email,
          name: "",
          subject: `Thank You for Subscribing! - ${siteName}`,
          message: `Thank you for subscribing to our newsletter! We're excited to have you on board. You'll now be the first to know about our latest products, exclusive offers, and insider news. Stay tuned for exciting updates coming your way!`,
        });

       } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error);
    }
  };

  return (
    <div className="grid gap-5 mt-4">
      {success && <Alerts title={success} status="green" />}
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="join w-full">
          <input
            type="email"
            className="input join-item w-full"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="btn join-item !h-[48px]"
            type="submit"
            disabled={loading && true}>
            {loading ? (
              <Loading dot classes="!text-white opacity-[0.5] size-5" /> 
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
