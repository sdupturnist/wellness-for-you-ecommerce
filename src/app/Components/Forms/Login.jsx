"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl } from "@/app/Utils/variables";
import Link from "next/link";
import Alerts from "../Alerts";
import { useUserContext } from "@/app/Context/userContext";
import { useAuthContext } from "@/app/Context/authContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { setUserData } = useUserContext();
  const { setUserToken } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}wp-json/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Your email or password is incorrect.");
      }

      const data = await response.json();
      const token = data.token;

      // Fetch user info by email
      const userRes = await fetch(`https://admin.wellness4u.in/wp-json/wc/v3/customers?consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03&consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&email=${username}`);
      const userData = await userRes.json();

      if (userRes.ok) {
        // Set user data in context
        setUserData(userData);

        // Store user data in localStorage as JSON string
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        throw new Error("Error fetching user information.");
      }

      console.log('Login success');
      
      // Store the token
      localStorage.setItem("token", token);
      //document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; SameSite=Strict`;
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; HttpOnly; SameSite=Strict`;

      setUserToken(token);

      // Redirect to account page
      router.push(`${homeUrl}/account`);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <>
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-large w-full" type="submit">
            Login
          </button>
          <Link
            className="hover:text-primary transition-all"
            href={`${homeUrl}password-forget`}>
            Forgotten Password
          </Link>
        </div>
      </form>
    </>
  );
}
