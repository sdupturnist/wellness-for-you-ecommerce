"use client";

import CancelOrderForm from "./Forms/CancelOrderForm";
import ModalPopup from "./ModalPopup";



export default function CancelOrder() {
  return (
    <>
      <button
        className="btn btn-medium btn-light"
        onClick={() => document.getElementById("modal_all").showModal()}>
        {" "}
        Cancel order
      </button>
      <ModalPopup 
      title="Cancel order?"
      item={<CancelOrderForm />}
      />
    </>
  );
}
