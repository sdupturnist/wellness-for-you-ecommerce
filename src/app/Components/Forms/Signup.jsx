"use client";

import { homeUrl } from "@/app/Utils/variables";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false); // New state for password length check
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password is less than 6 characters
    if (password.length < 6) {
      setPasswordTooShort(true);
      return;
    }

    setPasswordTooShort(false); // Reset error if password is valid length

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      // Generate a unique confirmation token
      const token = Math.random().toString(36).substring(2);

      // Send the confirmation email to the user
      await sendMail({
        sendTo: email,
        subject: "Please verify your registration",
        name: username,
        message: `Hello ${username},\n\nPlease click the following link to confirm your registration:\n\n<a href="${homeUrl}confirm-email?token=${token}&username=${username}&email=${email}&password=${password}&subscribe=${subscribeEmail}" style="color:#fff;text-decoration:none;font-weight:600;margin:20px 0;border-radius:4px;display:block;background:#137e43;text-align:center;border-radius:5px;padding: 12px 19px;width: max-content;font-size: 15px;text-transform: uppercase;">Confirm Your Email</a>\n\nThank you!`,
      });

      console.log("Email sent with confirmation link");
      // After sending the email, you could redirect the user to a page confirming that they need to check their email
      router.push(`${homeUrl}check-your-email?email=${email}`);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="grid gap-5">
      {error && <Alerts title={error} status="red" />}
      {passwordMismatch && (
        <Alerts title="Passwords do not match" status="red" />
      )}
      {passwordTooShort && (
        <Alerts title="Password must be at least 6 characters" status="red" />
      )}
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
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-success checkbox-sm"
                name="subscribed_newsletter"
                value="email_subscribed"
                onChange={(e) => setSubscribeEmail(e.target.value)}
              />
              <label>Sign up for our newsletter?</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-success checkbox-sm"
                required
              />
              <label>
                I have read and agree to the{" "}
                <Link href={`${homeUrl}privacy-policy`}>Privacy Policy</Link>
              </label>
            </div>
          </div>
          <button className="btn btn-large w-full" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
