"use client";

import SectionHeader from "./SectionHeader";

export default function ModalPopup({ title, item }) {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <div className="sm:p-5 p-3">
          <SectionHeader title={title} titleSmall />
          {item}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
