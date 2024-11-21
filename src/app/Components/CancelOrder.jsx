"use client";

import CancelOrderForm from "./Forms/CancelOrderForm";
import ModalPopup from "./ModalPopup";



export default function CancelOrder() {
  return (
    <>
      <button
        className="btn btn-medium btn-light"
        onClick={() => document.getElementById("my_modal_2").showModal()}>
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
