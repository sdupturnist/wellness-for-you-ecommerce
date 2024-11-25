"use client";

import { useState } from "react";

export default function WriteReviewForm() {

    const [rating, setRating] = useState("");


    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // try {
        //   // Send email notification
        //   const emailResponse = await fetch("/api/contactMail", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ name, place, email, phone, message }),
        //   });
    
        //   if (emailResponse.ok) {
        //    // setStatus("Email sent successfully!");
    
    
        //    router.push("/thankyou-contact");
        //    //setSuccess(true);
        //    setName("");
        //    setPlace("");
        //    setEmail("");
        //    setPhone("");
        //    setMessage("");
    
           
        //   console.log("success");
        //   } else {
        //     const emailErrorResponse = await emailResponse.json();
        //     console.error("Failed to send email", emailErrorResponse);
        //    // setStatus("Failed to send email");
        //   }
        // } catch (error) {
        //   console.error("An error occurred:", error);
        // } finally {
       
        // }
      };



  return (
    <form onSubmit={handleSubmit}>
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
          name=""
          id=""
          className="input"
          placeholder="Write something..."
          rows="5"></textarea>
        <button className="btn btn-large w-full" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
