"use client";

import {
  apiUrl,
  copyright,
  emailPassword,
  emailUsername,
  hostName,
  jwtTocken,
  portNumber,
  siteEmail,
  woocommerceKey,
} from "@/app/Utils/variables";
import { useState } from "react";
import Alerts from "../Alerts";
import Loading from "../Loading";
import { sendMail } from "@/app/Utils/Mail";
import { emailTemplate } from "../EmailTemplate";

export default function WriteReviewForm({ productId }) {
  const userInfo = {
    first_name: "Muhammed",
    user_email: "muhammed@gmail.com",
  };

  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //const modalElement = document.getElementById("modal_all");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const requestData = {
      review: review,
      rating: rating,
      name: name,
      email: email,
      status: "hold",
    };

    try {
      // Submit the review
      const response = await fetch(
        `${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}&product_id=${productId}&reviewer=${userInfo.first_name}&reviewer_email=${userInfo.user_email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtTocken, // Replace with JWT or Basic Auth
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        setLoading(false);
        setStatus(true);

        setTimeout(() => {
          document.getElementById("modal_all").style.display = "none";
          // document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
        }, 3000);

        console.log("Review submitted successfully");

        await sendMail({
          email: "jaseerali2012@gmail.com",
          subject: "New Contact Us Form",
          text: "test",
          html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Enquiry Notification</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
     <div style="margin: 0; padding: 0; font-family: 'Arial, sans-serif'; background-color: #fff;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #fff;">
                <!-- Header -->
                <tr>
                    <td style="background-color: #137E43; color: #fff; text-align: center; padding: 20px; font-size: 24px;">
                        ${"Welcome to Our Service"}
                    </td>
                </tr>
                
                <!-- Body Content -->
                <tr>
                    <td style="background-color: #fff; padding: 20px; color: #15181E;">
                        <h2 style="font-size: 22px; color: #137E43;">Hi [Recipient Name],</h2>
                        <p style="font-size: 16px; line-height: 1.5;">Thank you for signing up with us! We're excited to have you on board. Here’s what you can expect:</p>
                        <ul style="font-size: 16px; line-height: 1.5; color: #15181E;">
                            <li>Exclusive access to new features</li>
                            <li>Priority support</li>
                            <li>Special offers just for you</li>
                        </ul>
                        <p style="font-size: 16px; line-height: 1.5;">If you have any questions, feel free to reach out to us anytime.</p>
                        <a href="#" style="background-color: #137E43; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block; margin-top: 20px;">
                            Get Started
                        </a>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color: #15181E; color: #fff; text-align: center; padding: 10px; font-size: 14px;">
                        <p style="margin: 0;">${copyright}</p>
                    </td>
                </tr>
            </table>
        </div>
</body>
</html>
        
    `,
        });
      } else {
        const errorResponse = await response.json();
        console.error(
          "Failed to submit review",
          response.status,
          errorResponse
        );
        setError(true);
        setLoading(false);
        setStatus(false);

        setTimeout(() => {
          document.getElementById("modal_all").style.display = "none";
          // document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
        }, 3000);
      }
    } catch (error) {
      
      setError(true);
      setLoading(false);
      setStatus(false);

      setTimeout(() => {
        document.getElementById("modal_all").style.display = "none";
        // document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
      }, 3000);
 

      console.error("An error occurred:", error);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {status && (
        <Alerts
          status="green"
          title="Your review has been submitted for approval. Thank you for your feedback."
        />
      )}
      {error && <Alerts status="red" title="We're sorry, but we were unable to submit your review. Please try again later." />}
     
     backdrop issue<br/>

     email template content<br/>

     email to user<br/>


      need to login<br/>

      <div className="grid gap-4">
        <div className="rating rating-lg mb-3">
          <input
            required
            type="radio"
            name="rating-review"
            value="1"
            onChange={(e) => setRating(e.target.value)}
            className="mask mask-star-2 bg-yellow"
          />
          <input
            required
            type="radio"
            name="rating-review"
            value="2"
            onChange={(e) => setRating(e.target.value)}
            className="mask mask-star-2 bg-yellow"
          />
          <input
            required
            type="radio"
            name="rating-review"
            value="3"
            onChange={(e) => setRating(e.target.value)}
            className="mask mask-star-2 bg-yellow"
          />
          <input
            required
            type="radio"
            name="rating-review"
            value="4"
            onChange={(e) => setRating(e.target.value)}
            className="mask mask-star-2 bg-yellow"
          />
          <input
            required
            type="radio"
            name="rating-review"
            value="5"
            onChange={(e) => setRating(e.target.value)}
            className="mask mask-star-2 bg-yellow"
            defaultChecked
          />
        </div>

        <textarea
          required
          name=""
          id=""
          className="input"
          placeholder="Write something..."
          onChange={(e) => setReview(e.target.value)}
          rows="5"></textarea>
        <button className="btn btn-large w-full" type="submit">
          {loading && <Loading />}
          Submit
        </button>
      </div>
    </form>
  );
}
