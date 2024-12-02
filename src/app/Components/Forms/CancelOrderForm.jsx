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
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { sendMail } from "@/app/Utils/Mail";
import Alerts from "../Alerts";
import { CancelEmailTemplate } from "@/app/Utils/MailTemplates";

export default function CancelOrderForm({ userInfo, data }) {
  const router = useRouter();

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Enhanced error state to store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo?.id) {
      setError("User not authenticated. Please login to submit the return.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state on form submission

    const requestData = {
      title: `Cancellation - Order #${data?.id}`,
      content: `Reason: ${reason}. Faulty or other details: ${details || ""}`,
      status: "publish",
      order_id: data?.id,
      amount: data?.total || "",
      transition_id: data?.transaction_id || "COD",
    };

    try {
      // Update the order status
      const responseCancelDataCollection = await fetch(
        `${apiUrl}wp-json/wc/v3/orders/${data?.id}${woocommerceKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${jwtTocken}`,
          },
          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      if (responseCancelDataCollection.ok) {
        setLoading(false);
        setStatus(true);

        setTimeout(() => {
          setStatus(false);
          document.getElementById("modal_all").close();
          router.push("/account"); // Redirect to account page
        }, 3000);

        setReason("");
        setDetails("");

        // Mail notification to admin
        await sendMail({
          sendTo: siteEmail,
          subject: `You have received a new cancellation request. | ${siteName}`,
          name: "Admin",
          message: CancelEmailTemplate(
            requestData?.title,
            requestData?.content,
            requestData?.order_id,
            requestData?.amount,
            requestData?.transaction_id || "COD"
          ),
        });

        // Mail notification to user
        await sendMail({
          sendTo: userInfo?.email,
          subject: `Your order cancellation request has been successfully submitted. | ${siteName}`,
          name: userInfo?.name,
          message: CancelEmailTemplate(
            requestData?.title,
            requestData?.content,
            requestData?.order_id,
            requestData?.amount,
            requestData?.transaction_id || "COD"
          ),
        });
      } else {
        const errorResponse = await responseCancelDataCollection.json();
        setError(
          errorResponse?.message ||
            "An unknown error occurred while submitting your return request."
        );
        setLoading(false);
        setStatus(false);
      }
    } catch (error) {
      setError(
        "An error occurred while submitting the return request. Please try again later."
      );
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
      {error && <Alerts status="red" title={error} />}

      <div className="grid gap-6 mt-4">
        <select
          type="text"
          className="input"
          onChange={(e) => setReason(e.target.value)}
          required
          autoComplete="none">
          <option value="" disabled selected>
            Reason for cancel
          </option>

          <option value="Order Error">Order Error</option>

          <option value="Customer Changed Mind">Changed Mind</option>
          <option value="Shipping Delay">Shipping Delay</option>
          <option value="Incorrect Order Details">
            Incorrect Order Details
          </option>
          <option value="Payment Issues">Payment Issues</option>
          <option value="Order Not Needed Anymore">
            Order Not Needed Anymore
          </option>
          <option value="Price Error">Price Error</option>
        </select>

        <textarea
          type="text"
          className="input"
          placeholder="Any other reasons?"
          onChange={(e) => setDetails(e.target.value)}
          autoComplete="none"
          rows="5"
        />
        <button className="btn btn-large w-full" type="submit">
          {loading && <Loading />} Confirm to cancel
        </button>
      </div>
    </form>
  );
}
