"use client";

import { useState } from "react";
import { sendMail } from "@/app/Utils/Mail"; // Import sendMail function
import { apiUrl, homeUrl } from "@/app/Utils/variables";
import Alerts from "../Alerts";
import {useRouter } from "next/navigation";


export default function PasswordResetRequest() {


    const router = useRouter();


    

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${apiUrl}wp-json/password-reset/v1/request`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      const { token, email } = data;

      try {
        await sendMail({
          sendTo: email,
          subject: "Password Reset Request",
          message: `Hello,\n\nPlease click the following link to confirm your password reset:\n\n<a href="${homeUrl}reset-password?token=${token}&email=${email}" style="color:#fff;text-decoration:none;font-weight:600;margin:20px 0;border-radius:4px;display:block;background:#5ba642;text-align:center;border-radius:5px;padding: 12px 19px;width: max-content;font-size: 15px;text-transform: uppercase;">Confirm Your Email</a>\n\nThank you!`,
        });

        setMessage("Your password reset request has been successfully submitted! Please note that the reset link will remain valid for only 1 minute.");

        setTimeout(() => {
            router.push(`${homeUrl}login`);
          }, 3000); 


      } catch (error) {
        console.error("Error sending email:", error);
        setError(error)
      }
    } else {
      setError(data.message || "An error occurred. Please try again.")
    }
  };

  return (
    <div className="grid gap-5">
      {message && <Alerts title={message} status="green" />}
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
            required
          />
          <button className="btn btn-large btn-success w-full" type="submit">
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
};

