"use client";

import ModalPopup from "./ModalPopup";
import CancelOrderForm from "./Forms/CancelOrderForm";
import Alerts from "./Alerts";
export default function CancelOrder({ orderedDate, userInfo, data }) {
  return (
    <>
      <div>
        <button
          className="btn btn-medium btn-light"
          onClick={() => document.getElementById("modal_all").showModal()}>
          Cancel order
        </button>

        <ModalPopup
          title="Cancel order?"
          item={<CancelOrderForm data={data} userInfo={userInfo} />}
        />
      </div>
    </>
  );
}
