"use client";
import { returnDays } from "../Utils/variables";
import ModalPopup from "./ModalPopup";
import ReturnOrderForm from "./Forms/ReturnOrderForm";

export default function AddNewReturn({ orderedDate, userInfo, data }) {





  const orderDate = new Date(orderedDate);

  const currentDate = new Date();

  const returnableDate = new Date(orderDate);
  returnableDate.setDate(orderDate.getDate() + returnDays);

  const isReturnable = currentDate <= returnableDate;

  const returnedItems = data?.meta_data.filter(item => item.key === "returned" && item.value === "yes");




  return (
    isReturnable && !returnedItems[0]?.value && (
      <div className="sm:px-0 px-5">
        <button
          className="btn btn-medium btn-light"
          onClick={() => document.getElementById("modal_all").showModal()}>
          Return
        </button>
        <ModalPopup title="Return order?" item={<ReturnOrderForm data={data} userInfo={userInfo}/>} />
      </div>
    )
  );
}
