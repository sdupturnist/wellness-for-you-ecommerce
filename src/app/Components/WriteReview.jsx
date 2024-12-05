"use client";

import { useAuthContext } from "../Context/authContext";
import { isLoggined } from "../Utils/checkAuth";
import WriteReviewForm from "./Forms/WriteReviewForm";
import ModalPopup from "./ModalPopup";
import { useRouter } from "next/navigation";

export default function WriteReview({ productId }) {
  const { auth } = useAuthContext(); // Get authentication status
  const router = useRouter();

  const openReviewForm = () => {
    !auth
      ? isLoggined(
          auth,
          router,
          null,
          "Log in to Write a Review",
          "Please log in to your account to share your feedback and write a review"
        )
      : document.getElementById("modal_all").showModal();
  };

  return (
    <>
      <button className="btn btn-medium btn-light" onClick={openReviewForm}>
        Write A Review
      </button>

      <ModalPopup
        noButton
        title="Ratings & Review"
        item={<WriteReviewForm productId={productId} />}
      />
    </>
  );
}
