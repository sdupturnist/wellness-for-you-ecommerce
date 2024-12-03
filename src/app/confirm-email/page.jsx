// app/confirm-email/page.js

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { homeUrl } from "@/app/Utils/variables";
import Alerts from "../Components/Alerts";


export default function ConfirmEmail() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const confirmUser = async () => {
      if (!token) {
        setError("Invalid or missing token.");
        return;
      }

      try {

        const data = {
            username: 'upturnist',
            email: 'upturnistuae@gmail.com',
            password: '123',
          };


        const response = await fetch(
            "https://admin.wellness4u.in/wp-json/wc/v3/customers?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03",
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



        setIsConfirmed(true);
      } catch (err) {
        setError("There was an error confirming your email. Please try again.");
      }
    };

    confirmUser();
  }, [token]);

  const handleRedirect = () => {
    router.push(`${homeUrl}login`);
  };

  return (
    <div className="grid gap-5">
      {error && <Alerts title={error} status="red" />}
      {isConfirmed ? (
        <div>
          <h2>Email Confirmed Successfully!</h2>
          <button className="btn" onClick={handleRedirect}>Go to Login</button>
        </div>
      ) : (
        <div>
          <h2>Confirming your email...</h2>
        </div>
      )}
    </div>
  );
}
