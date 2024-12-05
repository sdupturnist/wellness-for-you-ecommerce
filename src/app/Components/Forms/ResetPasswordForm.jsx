"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiUrl, homeUrl } from "@/app/Utils/variables";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";


export default function ResetPasswordForm() {
    const router = useRouter();

  const searchParams = useSearchParams(); // Get the query parameters
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setMessage("Invalid or expired link.");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset the error message if validation passes
    setError("");

    const res = await fetch(`${apiUrl}wp-json/password-reset/v1/reset`, {
      method: "POST",
      body: JSON.stringify({ token, email, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);

      await sendMail({
        sendTo: email,
        subject: "Your password has been successfully changed",
        message: `We wanted to let you know that your account password has been successfully updated. If you made this change, no further action is required. If you did not request this change, please reset your password immediately to secure your account. For any concerns or assistance, feel free to contact our support team.`,
      });

     
      setTimeout(() => {
        router.push(`${homeUrl}/login`);
      }, 3000); 

    } else {
      setError(data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid gap-5">
      {message && <Alerts title={message} status="green" />}
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="input"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="input"
            required
          />
          <button className="btn btn-large" type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
};


