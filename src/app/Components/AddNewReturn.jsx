"use client";
import { returnDays } from "../Utils/variables";
import ModalPopup from "./ModalPopup";
import ReturnOrderForm from "./Forms/ReturnOrderForm";
import Alerts from "./Alerts";

export default function AddNewReturn({ orderedDate, userInfo, data }) {
  const orderDate = new Date(orderedDate);

  const currentDate = new Date();

  const returnableDate = new Date(orderDate);
  returnableDate.setDate(orderDate.getDate() + returnDays);

  const isReturnable = currentDate <= returnableDate;

  const returnedItems = data?.meta_data.filter(
    (item) => item.key === "returned" && item.value === "yes"
  );

  return (
    <>
      {isReturnable && !returnedItems[0]?.value && (
        <div>
          <button
            className="btn btn-medium btn-light"
            onClick={() => document.getElementById("modal_all").showModal()}>
            Return
          </button>

          <ModalPopup
            title="Return order?"
            item={<ReturnOrderForm data={data} userInfo={userInfo} />}
          />
        </div>
      )}

      {returnedItems[0]?.value && (
        <Alerts
          status="green"
          title="Your order return request has been successfully submitted. We will review the details and get back to you shortly."
        />
      )}
    </>
  );
}
