'use client'


import { currency } from "../Utils/variables";
import { AOSInit } from "./Aos";



export default function ReadyToGoCart({count}){
    return(
     <>
        <AOSInit />
       <div className="ready-to-go-cart" data-aos="fade-up">
<div className="grid">
<small className="text-xs text-body opacity-50">2 items</small>
<span className="font-bold">{currency}600</span>
</div>
<button className="btn">
        Go to cart
        </button>
       </div>
     </>
    )
}