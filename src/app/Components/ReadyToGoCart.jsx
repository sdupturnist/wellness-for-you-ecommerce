'use client'

import { StarIcon } from "@heroicons/react/24/solid";
import { AOSInit } from "./Aos";



export default function ReadyToGoCart({count}){
    return(
     <>
        <AOSInit />
       <div className="ready-to-go-cart" data-aos="fade-up">
<div className="grid">
<small className="text-xs text-body opacity-50">2 items</small>
<span className="font-bold">₹600</span>
</div>
<button className="btn">
        Go to cart
        </button>
       </div>
     </>
    )
}