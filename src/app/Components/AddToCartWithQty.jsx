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
    <div className={`${!inCartPage ? 'w-auto' : 'w-24 sm:w-32'} flex items-center justify-start gap-3`}>
     <div className={`${!inCartPage ? 'h-14' : 'border-primary bg-primary-dim h-11 [&>*]:text-primary'} flex items-center border rounded-lg  w-full justify-between lg:max-w-40`}>
          <button
            onClick={decrement}
            className={`${inCartPage ? 'px-2' : 'px-4'} py-2 hover:opacity-50 transition-all text-dark`}
          >
             <MinusIcon className={`${!inCartPage ? 'size-5' : 'size-4'} font-semibold`}/>
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className={`${inCartPage && 'bg-primary-dim !text-primary'} text-center w-full !px-0 !h-full`}
          />
          <button
            onClick={increment}
            className={`${inCartPage ? 'px-2' : 'px-4'} py-2 hover:opacity-50 transition-all text-dark`}
          >
            <PlusIcon className={`${!inCartPage ? 'size-5' : 'size-4'} font-semibold`}/>
          </button>
        </div>
 {!inCartPage && <button className="btn !min-h-14">Add to cart</button>}
  </div>
  );
}
