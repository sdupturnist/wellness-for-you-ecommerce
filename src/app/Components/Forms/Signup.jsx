"use client";

import { apiUrl, homeUrl } from "@/app/Utils/variables";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";
import Link from "next/link";
import Cookies from "js-cookie";
import Loading from "../Loading";
import ModalPopup from "../ModalPopup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [privacyContent, setPrivacyContent] = useState([]);

  const privacy = () =>
    fetch(`${apiUrl}wp-json/wp/v2/pages/34`)
      .then((res) => res.json())
      .then((data) => {
        setPrivacyContent(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  useEffect(() => {
    setPrivacyContent(privacy);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (password.length < 6) {
      setPasswordTooShort(true);
      setLoading(false);
      return;
    }

    setPasswordTooShort(false);

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      setLoading(false);
      return;
    }

    setPasswordMismatch(false);

    try {
      const token = Math.random().toString(36).substring(2);

      // Send the verification email
      await sendMail({
        sendTo: email,
        subject: "Please verify your registration",
        name: username,
        message: `Hello ${username},\n\nPlease click the button below to confirm your registration:\n\n<a href="${homeUrl}confirm-email?token=${token}&username=${username}&email=${email}&password=${password}&subscribe=${subscribeEmail}" style="color:#fff;text-decoration:none;font-weight:600;margin:20px 0;border-radius:4px;display:block;background:#5ba642;text-align:center;border-radius:5px;padding: 12px 19px;width: max-content;font-size: 15px;text-transform: uppercase;">Confirm Your Email</a>\n\nThank you!`,
      });

      setLoading(false);
      Cookies.set("register_verify_email", "true", { expires: 5 / 1440 });
      router.push(`${homeUrl}check-your-email?email=${email}`);
    } catch (err) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <>
      <ModalPopup
        title="Privacy policy"
        item={
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: (privacy && privacyContent?.content?.rendered) || "",
            }}></div>
        }
        noButton
      />
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
              placeholder="Full name"
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
                  <span
                    className="underline text-primary cursor-pointer hover:opacity-60 transition-all"
                    onClick={(e) =>
                      document.getElementById("modal_all").showModal()
                    }>
                    Privacy Policy
                  </span>
                </label>
              </div>
            </div>
            <button
              className="btn btn-large w-full"
              type="submit"
              disabled={loading}>
              {loading ? (
                <Loading dot classes="size-4 !text-dark" />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
