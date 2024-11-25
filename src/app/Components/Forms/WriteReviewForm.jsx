"use client";

import { apiUrl, jwtTocken, woocommerceKey } from "@/app/Utils/variables";
import { useState } from "react";
import Alerts from "../Alerts";
import Loading from "../Loading";

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
        }, 3000);

        //   console.log('Review submitted successfully');
      } else {
        const errorResponse = await response.json();
        console.error(
          "Failed to submit review",
          response.status,
          errorResponse
        );
      }


      // // Send email notification
      // const emailResponse = await fetch("/api/reviewSendMail", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ productId, name, rating, comment, todayDate }),
      // });

      // if (emailResponse.ok) {
      //   setStatus("Email sent successfully!");
      // } else {
      //   const emailErrorResponse = await emailResponse.json();
      //   console.error("Failed to send email", emailErrorResponse);
      //   setStatus("Failed to send email");
      // }

      


    } catch (error) {
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
      {rating}
      need to login
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
