"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";


export default function AddToCartWithQty({inCartPage}) {

 
        const [quantity, setQuantity] = useState(1);
      
        const increment = () => {
          setQuantity((prevQuantity) => prevQuantity + 1);
        };
      
        const decrement = () => {
          setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
        };


  return (
    <div className="flex items-center justify-start gap-3">
     <div className={`${!inCartPage ? 'h-14' : 'border-primary bg-primary-dim [&>*]:text-primary'} flex items-center border rounded-lg  w-full justify-between lg:max-w-40`}>
          <button
            onClick={decrement}
            className="px-4 py-2 hover:opacity-50 transition-all text-dark"
          >
             <MinusIcon className="size-5 font-semibold"/>
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className={`${inCartPage && 'bg-primary-dim !text-primary'} text-center w-full !px-0`}
          />
          <button
            onClick={increment}
            className="px-4 py-2 hover:opacity-50 transition-all text-dark"
          >
            <PlusIcon className="size-5 font-semibold"/>
          </button>
        </div>
 {!inCartPage && <button className="btn !min-h-14">Add to cart</button>}
  </div>
  );
}
