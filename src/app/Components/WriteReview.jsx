


"use client";

export default function WriteReview() {
  return (
<>
<button className="more" onClick={()=>document.getElementById('my_modal_2').showModal()}>Write A Review</button>
<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</>
  );
}
