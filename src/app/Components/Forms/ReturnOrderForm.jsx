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
import { ReturnEmailTemplate } from "@/app/Utils/MailTemplates";

export default function ReturnOrderForm({ userInfo, data }) {


  const router = useRouter(); 


  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [packageStatus, setPackageStatus] = useState("");
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
      title: `Return - Order #${data?.id}`,
      content: `Reason: ${reason}. Faulty or other details: ${details || ""}`,
      status: "publish",
      order_id: data?.id,
      amount: data?.total || "",
      opened: packageStatus || "",
      transition_id: data?.transaction_id || "COD",
    };

    try {
      // Submit the return request
      const responseReturnDataCollection = await fetch(
        `${apiUrl}wp-json/custom/v1/returns/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );



      // Update the order status
      const responseUpdateCurrentOrder = await fetch(
        `${apiUrl}wp-json/custom/v1/update-order/${data?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtTocken}`,
          },
          body: JSON.stringify({
    
            "meta_data": [
                {
                    "key": "returned",
                    "value": "yes"
                }
            ]
        }),
        }
      );

      if (responseReturnDataCollection.ok && responseUpdateCurrentOrder.ok) {
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
          subject: `You have received a new return request. | ${siteName}`,
          name: "Admin",
          message: ReturnEmailTemplate(
            requestData?.title,
            requestData?.content,
            requestData?.order_id,
            requestData?.amount,
            requestData?.opened,
            requestData?.transaction_id || "COD"
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
            requestData?.opened,
            requestData?.transaction_id || "COD"
          ),
        });
      } else {
        const errorResponse = await responseReturnDataCollection.json();
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
            Reason for Return
          </option>
          <option value="Dead On Arrival">Dead On Arrival</option>
          <option value="Faulty, please supply details">
            Faulty, please supply details
          </option>
          <option value="Order Error">Order Error</option>
          <option value="Other, please supply details">
            Other, please supply details
          </option>
          <option value="Received Wrong Item">Received Wrong Item</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            value="Opened"
            onChange={(e) => setPackageStatus(e.target.value)}
            type="checkbox"
            className="checkbox checkbox-sm checkbox-success"
          />
          <label className="label-text">Product is opened?</label>
        </div>
        <textarea
          type="text"
          className="input"
          placeholder="Faulty or other details"
          onChange={(e) => setDetails(e.target.value)}
          autoComplete="none"
          rows="5"
        />
        <button className="btn btn-large w-full" type="submit">
          {loading && <Loading />} Confirm to return
        </button>
      </div>
    </form>
  );
}
