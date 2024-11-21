'use client'

import AddToCartWithQty from "./AddToCartWithQty"
import ProductCard from "./ProductCard"





export default function CartListItem({data}){
    return(
        <li>
        <div className="flex items-center justify-start w-full sm:gap-0 gap-3">
          <ProductCard
            data={data}
            column
            inCartPage
          />
          <div>
            <AddToCartWithQty inCartPage />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="join">
            <button className="join-item option-btn">
              Move to wishlist
            </button>
            <button className="join-item option-btn">
              Remove
            </button>
          </div>
        </div>
      </li>
    )
}