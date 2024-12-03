"use client";

import { apiUrl, homeUrl, woocommerceKey } from "@/app/Utils/variables";
import ListOptions from "../ListOptions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    const data = {
      username,
      email,
      password,
    };

    try {
      // Generate a unique confirmation token
      const token = Math.random().toString(36).substring(2); 

      // Send the confirmation email to the user
      await sendMail({
        sendTo: email,
        subject: "Email Confirmation",
        name: username,
        message: `Hello ${username},\n\nPlease click the following link to confirm your registration:\n\n${homeUrl}confirm-email?token=${token}\n\nThank you!`,
      });

      console.log("Email sent with confirmation link");
      // After sending the email, you could redirect the user to a page confirming that they need to check their email
      router.push(`${homeUrl}check-your-email`);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="grid gap-5">
      {error && <Alerts title={error} status="red" />}
      {passwordMismatch && <Alerts title="Passwords do not match" status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="grid gap-3 my-2">
            <ListOptions title="Sign up for our newsletter?" noButton small />
            <ListOptions title="I have read and agree to the Privacy Policy" noButton small />
          </div>
          <button className="btn btn-large w-full" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
