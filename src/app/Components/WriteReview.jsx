"use client";

import WriteReviewForm from "./Forms/WriteReviewForm";
import ModalPopup from "./ModalPopup";

export default function WriteReview({productId}) {

  
  return (
    <>
      <button
        className="btn btn-medium btn-light"
        onClick={() => document.getElementById("modal_all").showModal()}>
        Write A Review
      </button>
      <ModalPopup title="Ratings & Review" item={<WriteReviewForm productId={productId}/>} />
    </>
  );
}
