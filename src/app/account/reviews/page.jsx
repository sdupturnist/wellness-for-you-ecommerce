"use client";

import Alerts from "@/app/Components/Alerts";
import Loading from "@/app/Components/Loading";
import Reviews from "@/app/Components/Reviews";
import { useAuthContext } from "@/app/Context/authContext";
import { apiUrl, woocommerceKey } from "@/app/Utils/variables";
import { useEffect, useState } from "react";

export default function MyReviews() {
  const { userData } = useAuthContext();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}`)
      .then((res) => res.json())
      .then((data) => {
        const filteredReviews = data.filter(
          (review) => review.reviewer_email === userData?.email
        );

        setReviews(filteredReviews);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [reviews, userData?.email]);

  return loading ? (
    <div className="flex items-center justify-center sm:min-h-[70vh] min-h-[50vh]">
      <Loading spinner />
    </div>
  ) : (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto grid sm:gap-6 gap-5">
          {!reviews?.length > 0 && (
            <Alerts noPageUrl large title="You have no" />
          )}
          <div className="px-5 sm:px-0">
            <Reviews data={reviews} />
          </div>
        </div>
      </section>
    </div>
  );
}
