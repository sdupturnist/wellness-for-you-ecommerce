"use client";

import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import { Link } from "react-alice-carousel";
import ReviewCount from "./ReviewCount";
import AddToCart from "./AddToCart";

export default function ProductCard({ data, column, mobileList, inCartPage }) {


const leftRightCard =  <div className={`${!inCartPage && 'border-b border-border'} product-card-left-right w-full`}>
  <div className={`${inCartPage && 'sm:gap-0 gap-3'} flex w-full`}>
<Link className={`${inCartPage ? 'min-w-12 sm:min-w-24' : 'min-w-32'} flex items-center`} href={`${homeUrl}/test-cat/test-product`}>
  <Images
    imageurl={data?.product_photo}
    quality="100"
    width="100"
    height="100"
    alt="Wellness for you"
    classes={`${inCartPage ? 'size-[50px] sm:size-[90px] m-[5px]' : 'size-[100px] m-[15px]'} block  mx-auto`}
    placeholder={true}
  />
 </Link>
  <div className="sm:p-5 p-3 pl-0 pr-0 w-full grid items-center">
   <div>
   <Link href={`${homeUrl}/test-cat/test-product`}>
   <h3 className="product-title text-dark mb-2">
      {data?.product_title}
    </h3>
    </Link>
    {data?.reviews && data?.reviews.length > 0 && <ReviewCount data={data?.reviews} />}
    <div>
      <span className="product-price">₹{data?.sale_price}</span>
      <span className="product-price-regular ml-2">
        ₹{data?.normal_price}
      </span>
      <span className="product-offer font-semibold ml-2">
        {data?.offer}% OFF
      </span>
    </div>
   {!inCartPage && <AddToCart />}
   </div>
  </div>
</div>
</div>


const leftRightCardMobile =  <div className="product-card-left-right-mobile w-full sm:mr-2">
<div className="sm:block flex w-full">
  <Link className="block min-w-32" href={`${homeUrl}/test-cat/test-product`}>
  <Images
    imageurl={data?.product_photo}
    quality="100"
    width="150"
    height="150"
    alt="Wellness for you"
    classes="block sm:size-[150px] size-[100px] m-[15px] mx-auto"
    placeholder={true}
  />
 </Link>
 <div className="sm:p-4 sm:pt-0 p-5 pl-3 pr-0 w-full">
  <Link href={`${homeUrl}/test-cat/test-product`}>
   <h3 className="product-title text-dark mb-2">
      {data?.product_title}
    </h3>
    </Link>
    {data?.reviews && data?.reviews.length > 0 && <ReviewCount data={data?.reviews} />}
    <div>
      <span className="product-price">₹{data?.sale_price}</span>
      <span className="product-price-regular ml-2">
        ₹{data?.normal_price}
      </span>
      <span className="product-offer font-semibold ml-2">
        {data?.offer}% OFF
      </span>
    </div>
    <AddToCart />
  </div>
</div>
</div>


  let card;

  switch (true) {
    case column:
      // Left-Right Card layout
      card = leftRightCard
      break;


      case mobileList:
      // Left-Right Card layout
      card = leftRightCardMobile
      break;

    default:
      // Return nothing or a default layout
      card = <div className="product-card w-full mr-2">
      <div className="block w-full" >
      <Link href={`${homeUrl}/test-cat/test-product`}>
  <Images
      imageurl={data?.product_photo}
      quality="100"
      width="150"
      height="150"
      alt="Wellness for you"
      classes="block size-[150px] m-[15px] mx-auto"
      placeholder={true}
  />
 </Link>

   <div className="sm:p-4 pt-0">
        <Link href={`${homeUrl}/test-cat/test-product`}>
   <h3 className="product-title text-dark mb-2">
      {data?.product_title}
    </h3>
    </Link>
          {data?.reviews && data?.reviews.length > 0 && <ReviewCount data={data?.reviews} />}
          <div>
            <span className="product-price">₹{data?.sale_price}</span>
            <span className="product-price-regular ml-2">
              ₹{data?.normal_price}
            </span>
            <span className="product-offer font-semibold ml-2">
              {data?.offer}% OFF
            </span>
          </div>
          <AddToCart />
        </div>
      </div>
    </div>;
      break;
  }

  return card;
}
