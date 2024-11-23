


"use client";

import ModalPopup from "./ModalPopup";



export default function WriteReview() {
  return (
<>
<button className="more" onClick={()=>document.getElementById('modal_all').showModal()}>Write A Review</button>
<ModalPopup 
title="Write a review" 
item="sdsdsd"
/>
</>
  );
}
