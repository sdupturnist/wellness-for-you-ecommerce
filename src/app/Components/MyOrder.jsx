"use client";

import { useState, useEffect } from "react";
import Alerts from "./Alerts";
import Images from "./Images";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function MyOrder({ data, orderView }) {

  const pathname = usePathname()

  console.log(data?.items[0])
  // Define the status to color mapping
  const statusColorMap = [
    {
      Pending_payment: "text-orange-500",
      On_hold: "text-yellow-500",
      Processing: "text-yellow",
      Completed: "text-green-500",
      Failed: "text-red-500",
      Canceled: "text-gray-500",
      Refunded: "text-blue-500",
      Confirmed: "text-green-500",
    }
  ]

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (data && data) {
      setLoading(false); 
    }
  }, [data]); 


  const statusColorClass = statusColorMap[data?.order_status] || "text-dark"; // Fallback to default primary color if not matched

  return (
    <>
      {loading ? (
        // Skeleton Loader
        <div className="skeleton h-32 w-full mb-5"></div>
      ) : (
        <li className="card bg-white">
          <div className="w-full">
            <div className="lg:flex items-center justify-between w-full sm:gap-0 gap-3">
             
             <div>
            {data &&
                  data?.items?.map((item, index) => (
                   
<div key={index} className="flex gap-4">
                <Images
                  imageurl={item?.product_photo}
                  quality="100"
                  width="100"
                  height="100"
                  alt="Wellness for you"
                  classes="size-[80px] block"
                  placeholder={true}
                />
                <div>
              

                  <h3 className="text-sm text-body mb-2 leading-relaxed">
                    {item?.product_title}
                  </h3>

               
                </div>
              </div>
                  ))}



 </div>
              
              <div className="flex items-center gap-2 border-t lg:border-none mt-4 pt-4 lg:mt-0 lg:pt-0">
              <span className="block mb-2">
                    <span className="font-bold uppercase text-sm text-primary">
                      #{data?.order_id}
                    </span>
                  </span>
                  <span className="font-semibold text-sm block w-full whitespace-nowrap uppercase ">
                    ₹{data?.order_amout} ({data?.order_items} items)
                  </span>
                <span className="text-sm block whitespace-nowrap">
                  {data?.order_date}{" "}
                  {data?.order_status !== "Processing" && (
                    <span className="text-xs opacity-20 ml-1">&#x2022;</span>
                  )}
                </span>
                <span
                  className={`${statusColorClass} font-semibold text-sm  whitespace-nowrap uppercase flex items-center gap-2`}>
                  {data?.order_status === "Processing" && (
                    <span className="loading loading-spinner size-3"></span>
                  )}
                  {data?.order_status}
                </span>
              </div>
            </div>
          {!orderView &&  <div className="flex lg:justify-end mt-4 lg:mt-0">
              <div className="">
                <Link href={`${pathname}/${data?.order_id}`} className="btn btn-medium btn-light">View</Link>
              </div>
            </div>
}
            {data?.tracking_message && !orderView && (
              <div className="mt-4">
                <Alerts status="green" title={data?.tracking_message} />
              </div>
            )}
          </div>
        </li>
      )}
    </>
  );
}
