"use client";

import { useAuthContext } from "@/app/Context/authContext";
import { apiUrl, jwtTocken } from "@/app/Utils/variables";
import { useState } from "react";
import Alerts from "../Alerts";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { userData } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    // Check if the new password is at least 6 characters
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setError("");

    const success = await changePassword(
      userData?.id,
      oldPassword,
      newPassword
    );

    if (success) {
      setMessage("Password changed successfully!");
    }
  };

  const changePassword = async (userId, oldPassword, newPassword) => {
    const token = localStorage.getItem("jwt_token");

    const response = await fetch(
      `${apiUrl}wp-json/custom/v1/change-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setMessage(data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return true;
    } else {
      const errorData = await response.json();
      setError(errorData.message);
      return false;
    }
  };

  return (
    <div className="grid gap-5">
      {message && <Alerts title={message} status="green" />}
      {error && <Alerts title={error} status="red" />}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <input
            placeholder="Old Password"
            type="password"
            id="oldPassword"
            value={oldPassword}
            className="input"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            placeholder="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            className="input"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            placeholder="onfirm New Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            className="input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-large">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
