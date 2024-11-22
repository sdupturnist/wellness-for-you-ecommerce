"use client";

import { useState, useEffect } from "react";
import Alerts from "./Alerts";
import Images from "./Images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currency } from "../Utils/variables";

export default function MyOrder({ data, orderView }) {
  const pathname = usePathname();

  // Define the status to color mapping
  const statusColorMap = {
    Pending_payment: "text-orange-500",
    On_hold: "text-yellow-500",
    Processing: "text-yellow",
    Completed: "text-green-500",
    Failed: "text-red-500",
    Canceled: "text-gray-500",
    Refunded: "text-blue-500",
    Confirmed: "text-green-500",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
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
        <li className="card-rounded-none-small bg-white">
          <div className="w-full">
            <div className="lg:flex items-start justify-between w-full sm:gap-0 gap-3">
              <div>
                {data &&
                  data?.items?.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <Images
                        imageurl={item?.product_photo}
                        quality="100"
                        width="100"
                        height="100"
                        alt="Wellness for you"
                        classes="size-[50px] block"
                        placeholder={true}
                      />
                      <div>
                        <h3 className="text-xs text-body mb-2 leading-relaxed">
                          {item?.product_title} x {item?.qty}
                        </h3>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="lg:grid justify-between h-full gap-7">
                <div className="sm:flex items-center justify-between gap-2 border-t lg:border-none mt-4 lg:mt-0 ">
                  <ul className="list-order-view">
                    <li>
                      <label>Order ID</label>#{data?.order_id}
                    </li>
                    <li>
                      <label>Amount</label>
                      {currency}
                      {data?.order_amount} ({data?.items?.length} items)
                    </li>
                    <li>
                      <label>Order Date</label>
                      {data?.order_date}
                    </li>
                    <li>
                      <label>Status</label>
                      <span className={`${statusColorClass}`}>
                        {data?.order_status}
                      </span>
                    </li>
                    {!orderView && (
                      <li>
                        <Link
                          href={`${pathname}/${data?.order_id}`}
                          className="btn btn-medium btn-light md:ml-4 md:mt-0 mt-2">
                          View
                        </Link>
                      </li>
                    )}
                  </ul>

                  {/* <ul className="amount-list  lg:hidden"> */}
                  {/* <li> */}
                  {/* <span className="label">Order ID  #</span> */}
                  {/* <span className="val"> */}
                  {/* {data?.order_id} */}
                  {/* </span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/* <span className="label">Amount</span> */}
                  {/* <span */}
                  {/* className={` val`}> */}
                  {/* {currency}{data?.order_amount} ({data?.items?.length} items) */}
                  {/* </span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/* <span className="label">Order Date</span> */}
                  {/* <span className="val">{data?.order_date}</span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/* <span className="label">Status</span> */}
                  {/* <span className="val !text-green-600"> */}
                  {/* {data?.order_status} */}
                  {/* </span> */}
                  {/* </li> */}
                  {/*  */}
                  {/* </ul> */}
                </div>
              </div>
            </div>

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
