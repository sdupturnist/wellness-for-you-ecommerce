"use client";

import SectionHeader from "./SectionHeader";

export default function ModalPopup({ title, item, titleCenter }) {
  return (
    <dialog id="modal_all" className="modal">
      <div className="modal-box">
        <div className="sm:p-5 p-3">
          <SectionHeader title={title} titleSmall titleCenter={titleCenter && titleCenter} />
          {item}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
