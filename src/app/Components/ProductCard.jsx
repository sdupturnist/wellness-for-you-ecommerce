'use client'

import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import { Link } from "react-alice-carousel";
import { StarIcon } from "@heroicons/react/24/solid";


export default function ProductCard({data}){
    return(
        <div  className="product-card w-full mr-2">
        <Link 
        className="block w-full"
        href={homeUrl}>
          <Images
            imageurl={data?.product_photo}
            quality="100"
            width="150"
            height="150"
            alt="Wellness for you"
            classes="block size-[150px] m-[15px] mx-auto"
            placeholder={true}
          />
          <div className="p-4 pt-0">
            <h3 className="product-title text-dark mb-2">
              {data?.product_title}
            </h3>
            {data?.review_count > 0 && (
              <small className="flex items-center gap-1 text-body mb-2">
                <StarIcon className="size-3 text-yellow" />
                <span className="opacity-50">{data?.review_count} Review</span>
              </small>
            )}
            <span className="product-price">₹{data?.sale_price}</span>
            <div>
              <span className="product-price-regular">₹{data?.normal_price}</span>
              <span className="product-offer ml-2">₹{data?.offer}</span>
            </div>
            <button className="btn mt-3">
              add
            </button>
          </div>
        </Link>
      </div>
    )
}