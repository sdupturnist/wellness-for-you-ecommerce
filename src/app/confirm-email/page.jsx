// app/confirm-email/page.js

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiUrl, homeUrl, siteName, woocommerceKey } from "@/app/Utils/variables";
import Alerts from "../Components/Alerts";
import Loading from "../Components/Loading";
import { sendMail } from "../Utils/Mail";
import { WelcomeEmailTemplate } from "../Utils/MailTemplates";


export default function ConfirmEmail() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const subscribe = searchParams.get("subscribe");
  const token = new URLSearchParams(window.location.search).get("token");



  useEffect(() => {
    const confirmUser = async () => {
      if (!token) {
        setError("Invalid or missing token.");
        return;
      }

      try {
        const data = {
          username: username,
          password: password,
          email: email,
          first_name: username,
          last_name: username,
          meta_data: [
            {
              key: "newsletter_subscribed",
              value: subscribe || "",
            },
          ],
        };

        const response = await fetch(
          `${apiUrl}wp-json/wc/v3/customers${woocommerceKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create customer");
        }

        if(response.ok){

          await sendMail({
            sendTo: email,
            subject: `Welcome to ${siteName}`,
            name: username,
            message: WelcomeEmailTemplate('Our primary goal at Wellness4u Food Supplements is to provide our customers with a wide selection of nutrition supplements and wellness equipment that have been rigorously tested for both quality and safety. We strive to offer products that not only enhance overall health and well-being but also empower individuals to take control of their own wellness journey.', username),
          });

        }

        setIsConfirmed(true);
      } catch (err) {
        setError("If this email address is already associated with an existing account, or if there was an error confirming your email, please try again.");
      }
    };

    confirmUser();
  }, [token]);

  const handleRedirect = () => {
    router.push(`${homeUrl}login`);
  };

  return (
    <section className="pt-0">
      <div className="container">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
            <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[95%] mx-auto">
              {error && <Alerts large titleSmall title={error} status="red" buttonLabel="Try again" url={`${homeUrl}/register`} noPageUrl/>}
              {isConfirmed ? (
                <Alerts
                  noPageUrl
                  title="Email Confirmed Successfully!"
                  large
                  buttonLabel=" Go to login"
                  url={`${homeUrl}login`}
                  desc={`Your email has been successfully confirmed. You can now access your account `}
                />
              ) : (
                !error && <div className="grid gap-5 items-center justify-center text-center">
                  <Loading classes="mx-auto" spinner />
                  <h2>Confirming your email...</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
