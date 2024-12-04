"use client";

import {
  apiUrl,
  homeUrl,
  siteEmail,
  siteName,
  woocommerceKey,
} from "@/app/Utils/variables";
import { useState } from "react";
import Alerts from "../Alerts";
import Loading from "../Loading";
import { sendMail } from "@/app/Utils/Mail";
import { useAuthContext } from "@/app/Context/authContext";
import { useRouter } from "next/navigation";


export default function WriteReviewForm({ productId }) {

  


  const { auth, userData} = useAuthContext(); 

  const router = useRouter(); 


 



 


  

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //const modalElement = document.getElementById("modal_all");
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!auth) {
      router.push(`${homeUrl}login`);
      return false
    } 


    setLoading(true);

    const requestData = {
      review: review,
      rating: rating,
      name: userData?.first_name,
      email: userData?.email,
      status: "hold",
    };

    try {
      // Submit the review
      const response = await fetch(
        `${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}&product_id=${productId}&reviewer=${userData.first_name}&reviewer_email=${userData.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: jwtTocken, // Replace with JWT or Basic Auth
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        setLoading(false);
        setStatus(true);

        setTimeout(() => {
          document.getElementById("modal_all").close();
          // document.getElementsByClassName("modal-backdrop")[0].style.display = "none";
          setStatus(false);
        }, 3000);

        console.log("Success");

        //MAIL NOTIFICATION TO ADMIN
        await sendMail({
          sendTo: siteEmail,
          subject: `Review | ${siteName}`,
          message: `You have received a new review from ${siteName}`,
        });

        //MAIL NOTIFICATION TO REVIEWER
        await sendMail({
          sendTo: userData?.user_email,
          subject: `Thank You for Sharing Your Feedback! | ${siteName}`,
          message: `Your review will be reviewed by the admin, and if approved, it will be published soon.`,
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
          document.getElementById("modal_all").close();
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setStatus(false);

      setTimeout(() => {
        document.getElementById("modal_all").close();
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
      {error && (
        <Alerts
          status="red"
          title="We're sorry, but we were unable to submit your review. Please try again later."
        />
      )}
      <div className="grid gap-4">
        <div className="rating rating-lg mb-3 flex gap-4">
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

