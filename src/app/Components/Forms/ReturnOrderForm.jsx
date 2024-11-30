"use client";

import Loading from "../Loading";
import { useState } from "react";
import {
  apiUrl,
  homeUrl,
  jwtTocken,
  siteEmail,
  siteName,
  woocommerceKey,
} from "@/app/Utils/variables";

import { sendMail } from "@/app/Utils/Mail";
import Alerts from "../Alerts";
import { ReturnEmailTemplate } from "@/app/Utils/MailTemplates";

export default function ReturnOrderForm({ userInfo, data }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Enhanced error state to store error messages


console.log(data)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo?.id) {
      setError("User not authenticated. Please login to submit the return.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state on form submission

    const requestData = {
      title: `Return - Order #${data?.id}`,
      content: `Reason: ${reason}. Faulty or other details: ${details || ""}`,
      status: "publish",
      order_id: data?.id,
      amount: data?.total || "",
      transition_id: data?.transaction_id || "",
    };

    try {
      // Submit the return request
      const responseReturnDataCollection = await fetch(`${apiUrl}wp-json/custom/v1/returns/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Update the order status
      const responseUpdateCurrentOrder = await fetch(`${apiUrl}wp-json/custom/v1/update-order/${data?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtTocken}`,
        },
        body: JSON.stringify(requestData),
      });

      if (responseReturnDataCollection.ok && responseUpdateCurrentOrder.ok) {
        setLoading(false);
        setStatus(true);

        setTimeout(() => {
          setStatus(false);
          document.getElementById("modal_all").close();
        }, 3000);

        setReason("");
        setDetails("");

        // Mail notification to admin
        await sendMail({
          sendTo: siteEmail,
          subject: `You have received a new return request. | ${siteName}`,
          name: "Admin",
          message: ReturnEmailTemplate(
            requestData?.title,
            requestData?.content,
            requestData?.order_id,
            requestData?.amount,
            requestData?.transition_id
          ),
        });

        // Mail notification to user
        await sendMail({
          sendTo: userInfo?.email,
          subject: `Your order return request has been successfully submitted. We will review the details and get back to you shortly. | ${siteName}`,
          name: userInfo?.name,
          message: ReturnEmailTemplate(
            requestData?.title,
            requestData?.content,
            requestData?.order_id,
            requestData?.amount,
            requestData?.transition_id
          ),
        });

      } else {
        const errorResponse = await responseReturnDataCollection.json();
        setError(errorResponse?.message || "An unknown error occurred while submitting your return request.");
        setLoading(false);
        setStatus(false);
      }
    } catch (error) {
      setError("An error occurred while submitting the return request. Please try again later.");
      setLoading(false);
      setStatus(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="none">
      {status && (
        <Alerts
          status="green"
          title="Your order return request has been successfully submitted. We will review the details and get back to you shortly."
        />
      )}
      {error && (
        <Alerts
          status="red"
          title={error}
        />
      )}
      <div className="grid gap-4 mt-4">
        <input
          type="text"
          className="input"
          placeholder="Reason for Return"
          onChange={(e) => setReason(e.target.value)}
          required
          autoComplete="none"
        />
        <textarea
          type="text"
          className="input"
          placeholder="Faulty or other details"
          onChange={(e) => setDetails(e.target.value)}
          autoComplete="none"
          rows="5"
        />
        <button className="btn btn-large w-full" type="submit">
          {loading && <Loading />} Submit
        </button>
      </div>
    </form>
  );
}
