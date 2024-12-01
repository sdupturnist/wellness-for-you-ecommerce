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
import Price from "./Price";

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
    <li className="w-full sm:w-auto sm:mr-2 justify-between py-5 sm:pb-0 first:pt-0">
    <div className="sm:grid flex relative h-full w-full sm:gap-0 gap-5 pb-1">
      {wishlist && <AddToWishList small active />}
      <div className="border rounded-md h-[130px] sm:border-0 sm:h-auto flex sm:block items-center">
        <Link
          className="flex sm:block items-center min-w-32"
          href={`${itemCaturl}/${data?.slug}`}>
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
            classes="block sm:size-[150px] size-[80px] my-[15px] mx-auto"
            placeholder={true}
          />
        </Link>
      </div>

      <div className="w-full grid items-center sm:px-4 sm:pb-3 sm:pt-3">
       
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
            <Price
            regular={data?.regular_price}
            sale= {data?.price}
            />
           
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
    </div>
  </li>
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
    <li className="w-full sm:w-auto sm:mr-2 justify-between py-5 sm:pb-0 first:pt-0">
      <div className="sm:grid flex relative h-full w-full sm:gap-0 gap-5 pb-1">
        {wishlist && <AddToWishList small active />}
        <div className="border rounded-md h-[130px] sm:border-0 sm:h-auto flex sm:block items-center">
          <Link
            className="flex sm:block items-center min-w-32"
            href={`${itemCaturl}/${data?.slug}`}>
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
              classes="block sm:size-[150px] size-[80px] my-[15px] mx-auto"
              placeholder={true}
            />
          </Link>
        </div>

        <div className="w-full grid items-center sm:px-4 sm:pb-3 sm:pt-3">
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
            <Price
            regular={data?.regular_price}
            sale= {data?.price}
            />
           
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
            <Price
            regular={data?.regular_price}
            sale= {data?.price}
            />
           
          )}
              {!inCartPage && data?.price && (
                <AddToCart
                  card
                  itemid={data?.id}
                  price={
                    data?.price !== null ? data?.price : data?.regular_price
                  }
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
