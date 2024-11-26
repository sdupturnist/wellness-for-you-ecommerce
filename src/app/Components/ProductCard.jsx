"use client";

import Images from "./Images";
import {
  convertStringToJSON,
  currency,
  homeUrl,
  OfferPercentage,
} from "../Utils/variables";
import ReviewCount from "./ReviewCount";
import AddToCart from "./AddToCart";
import AddToWishList from "./AddToWishList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Skelton from "./Skelton";

export default function ProductCard({
  data,
  column,
  mobileList,
  inCartPage,
  wishlist,
}) {
  const category = useParams();

  const itemCaturl = homeUrl + category?.category?.replace("/", "");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const leftRightCard = loading ? (
    <Skelton productleftRightCard />
  ) : (
    <div
      className={`${
        !inCartPage && "border-b border-border"
      } product-card-left-right w-full`}>
      <div className={`${inCartPage && "sm:gap-0 gap-3"} flex w-full`}>
        <Link
          className={`${
            inCartPage ? "min-w-12 sm:min-w-24" : "min-w-32"
          } flex items-center`}
          href={`${itemCaturl}/${data?.slug}`}>
          <Images
            imageurl={
              data?.images[0]?.src || (data?.images.length > 0 && data?.images)
            }
            quality="100"
            width="100"
            height="100"
            title={`${data?.images[0]?.alt || data?.name}`}
            alt={`${data?.images[0]?.alt || data?.name}`}
            classes={`${
              inCartPage
                ? "size-[50px] sm:size-[90px] m-[5px]"
                : "size-[80px] sm:size-[90px] m-[15px]"
            } block  mx-auto`}
            placeholder={true}
          />
        </Link>
        <div className="p-5 pl-0 pr-0 w-full grid items-center">
          <div>
            <Link href={`${itemCaturl}/${data?.slug}`}>
              <h3 className="product-title text-dark mb-2">{data?.name}</h3>
            </Link>

            {data?.rating_count > 0 && (
              <ReviewCount
                average={data?.average_rating}
                ratingCount={data?.rating_count}
              />
            )}
            {data?.price && (
              <div>
                <span className="product-price">
                  {currency}
                  {data?.price}
                </span>
                <span className="product-price-regular ml-2">
                  {currency}
                  {data?.regular_price}
                </span>
                <span className="product-offer font-semibold ml-2">
                  <OfferPercentage
                    normalprice={data?.regular_price}
                    saleprice={data?.price}
                  />
                  % OFF
                </span>
              </div>
            )}
            {!inCartPage && data?.price && (
              <AddToCart
              card
              itemid={data?.id}
              price={data?.price !== null ? data?.price : data?.regular_price}
              name={data?.name}
              options={convertStringToJSON(data && data?.acf?.options)}
              image={data?.images[0]?.src || data?.images}
                slug={data?.slug}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const leftRightCardMobile = loading ? (
    <>
      <div className="sm:block hidden">
        <Skelton productCard />
      </div>
      <div className="sm:hidden">
        <Skelton productleftRightCard />
      </div>
    </>
  ) : (
    <li className="w-full sm:w-auto sm:mr-2 sm:min-h-80  justify-between">
      <div className="sm:grid flex relative h-full w-full">
        {wishlist && <AddToWishList small active />}
        <Link
          className="flex items-center min-w-32"
          href={`${itemCaturl}/${data?.slug}`}>
          <Images
            imageurl={
              data?.images[0]?.src || (data?.images.length > 0 && data?.images)
            }
            quality="100"
            width="150"
            height="150"
            title={`${data?.images[0]?.alt || data?.name}`}
            alt={`${data?.images[0]?.alt || data?.name}`}
            classes="block sm:size-[150px] size-[80px] my-[15px] mx-auto"
            placeholder={true}
          />
        </Link>

        <div className="sm:p-4 sm:pt-0 p-5 sm:pl-3 pl-0 pr-0 w-full sm:grid items-end">
          <Link href={`${itemCaturl}/${data?.slug}`}>
            <h3 className="product-title text-dark mb-2">{data?.name}</h3>
          </Link>
          {data?.rating_count > 0 && (
            <ReviewCount
              average={data?.average_rating}
              ratingCount={data?.rating_count}
            />
          )}
          {data?.price && (
            <div>
              <span className="product-price">
                {currency}
                {data?.price}
              </span>
              <span className="product-price-regular ml-2">
                {currency}
                {data?.regular_price}
              </span>
              <span className="product-offer font-semibold ml-2">
                <OfferPercentage
                  normalprice={data?.regular_price}
                  saleprice={data?.price}
                />
                % OFF
              </span>
            </div>
          )}


          <div>
            {!inCartPage && data?.price && (
              <AddToCart
              card
              itemid={data?.id}
              price={data?.price !== null ? data?.price : data?.regular_price}
              name={data?.name}
              options={convertStringToJSON(data && data?.acf?.options)}
              image={data?.images[0]?.src || data?.images}
                slug={data?.slug}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );

  let card;

  switch (true) {
    case column:
      // Left-Right Card layout
      card = leftRightCard;
      break;

    case mobileList:
      // Left-Right Card layout
      card = leftRightCardMobile;
      break;

    default:
      // Return nothing or a default layout
      card = loading ? (
        <>
          <div className="sm:block hidden">
            <Skelton productCard />
          </div>
          <div className="sm:hidden">
            <Skelton productleftRightCard />
          </div>
        </>
      ) : (
        <div className="product-card w-full mr-2">
          <div className="block w-full">
            <Link href={`${itemCaturl}/${data?.slug}`}>
              <Images
                imageurl={
                  data?.images[0]?.src ||
                  (data?.images.length > 0 && data?.images)
                }
                quality="100"
                width="150"
                height="150"
                title={`${data?.images[0]?.alt || data?.name}`}
                alt={`${data?.images[0]?.alt || data?.name}`}
                classes="block sm:size-[150px] size-[90px] my-[20px] mx-auto"
                placeholder={true}
              />
            </Link>

            <div className="p-4 pt-0">
              <Link href={`${itemCaturl}/${data?.slug}`}>
                <h3 className="product-title text-dark mb-2">{data?.name}</h3>
              </Link>
              {data?.rating_count > 0 && (
                <ReviewCount
                  average={data?.average_rating}
                  ratingCount={data?.rating_count}
                />
              )}
              {data?.price && (
                <div>
                  <span className="product-price">
                    {currency}
                    {data?.price}
                  </span>
                  <span className="product-price-regular ml-2">
                    {currency}
                    {data?.regular_price}
                  </span>
                  <span className="product-offer font-semibold ml-2">
                    <OfferPercentage
                      normalprice={data?.regular_price}
                      saleprice={data?.price}
                    />
                    % OFF
                  </span>
                </div>
              )}
              {!inCartPage && data?.price && (
                <AddToCart
                card
                itemid={data?.id}
                price={data?.price !== null ? data?.price : data?.regular_price}
                name={data?.name}
                options={convertStringToJSON(data && data?.acf?.options)}
                image={data?.images[0]?.src || data?.images}
                  slug={data?.slug}
                />
              )}
            </div>
          </div>
        </div>
      );
      break;
  }

  return card;
}
