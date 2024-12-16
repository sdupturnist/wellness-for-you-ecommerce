"use client";

import { siteEmail, siteName } from "@/app/Utils/variables";
import Alerts from "../Alerts";
import { sendMail } from "@/app/Utils/Mail";
import { useState } from "react";
import { ContactEmailTemplate } from "@/app/Utils/MailTemplates";
import Loading from "../Loading";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await sendMail({
        sendTo: siteEmail,
        name: "Admin",
        subject: `Contact - ${siteName}`,
        message: ContactEmailTemplate(name, email, message),
      });
      setLoading(false)
      setSuccess(
        "Thanks for contacting us! Our team is reviewing your submission and will get back to you soon."
      );
     setName("")
     setEmail("")
     setMessage("")

    } catch (error) {
      console.error("Error sending email:", error);
      setError(error);
    }
  };

  return (
    <div className="grid gap-5">
      {success && <Alerts title={success} status="green" />}
      {error && <Alerts title={error} status="red" />}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-5">
          <input
            type="text"
            className="input"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="input"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}></textarea>
          <button 
          className="btn btn-large w-full"
           type="submit"
           disabled={loading && true}
           >
            {loading ? <Loading dot classes="!text-dark opacity-[0.5] size-5"/> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
