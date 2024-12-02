"use client";

import { useState, useEffect } from "react";
import Alerts from "./Alerts";
import Images from "./Images";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currency, formatDate } from "../Utils/variables";
import Skelton from "./Skelton";

export default function MyOrder({ data, orderView, userInfo }) {

  
  const pathname = usePathname();

  // Define the status to color mapping
  const statusColorMap = {
    pending_payment: "text-orange-500",
    on_hold: "text-yellow-500",
    processing: "text-yellow",
    completed: "text-green-500",
    failed: "text-red-500",
    canceled: "text-gray-500",
    refunded: "text-blue-500",
    confirmed: "text-green-500",
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const statusColorClass = statusColorMap[data?.status] || "text-dark"; // Fallback to default primary color if not matched


  const returnedItems = data?.meta_data.filter(
    (item) => item.key === "returned" && item.value === "yes"
  );

  return (
    <>
      {loading ? (
        // Skeleton Loader
        <Skelton productleftRightCard/>
      ) : (
        <li className={`${orderView ? 'mb-0' : 'mb-5'} card-rounded-none-small bg-white`} data-id={data?.id}>
          <Link className="w-full" href={`${pathname}/${userInfo?.id}/${data?.id}`}>
            <div className="lg:flex items-start justify-between w-full  gap-3">
              <div className="grid gap-[10px]">
                {data &&
                  data?.line_items?.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="border rounded-md flex items-center sm:h-[60px] sm:w-[60px] h-[50px] w-[50px] p-3">
                       <Images
                          imageurl={item?.image?.src || item?.image}
                          quality="100"
                          width="100"
                          height="100"
                          title={item?.name || item?.product_name}
                          alt={item?.name || item?.product_name}
                          classes="size-[30px] block mx-auto"
                          placeholder={true}
                        />
                      </div>
                      <div className="grid gap-[3px]">
                        <small className="text-[12px] font-normal opacity-60 ">
                          Order ID #{data?.id} 
                       
                        </small>
                        <h3 className="text-[14px] text-body leading-relaxed">
                          {item?.name || item?.product_name} x {item?.quantity}
                        </h3>
                        <div className="flex justify-between"></div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="lg:grid justify-between h-full gap-7">
                <div className="sm:flex items-center justify-between gap-2 border-t lg:border-none mt-4 lg:mt-0 pt-3 lg:pt-0">
{returnedItems?.length > 0 ? <span
                    className={`text-red-500 font-bold capitalize lg:pt-4 sm:text-base text-sm`}>
                   Returned
                  </span> :
                  
                  <span
                  className={`${statusColorClass} font-bold capitalize lg:pt-4 sm:text-base text-sm`}>
                  {data?.status}
                </span>
                  }
               


                
                  {/* <ul className="list-order-view"> */}
                  {/* {console.log(data)} */}
                  {/* <li> */}
                  {/* <label>Amount</label> */}
                  {/* <span > */}
                  {/* {currency} */}
                  {/* {data?.total} ({data?.line_items?.length} {`item${data?.line_items?.length > 1 ? 's' : ''}`}) */}
                  {/* </span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/* <label>Order Date</label> */}
                  {/* <span> */}
                  {/* {formatDate(data?.date_created)} */}
                  {/* </span> */}
                  {/* </li> */}
                  {/* <li> */}
                  {/* <label>Status</label> */}
                  {/* <span className={`${statusColorClass} font-bold capitalize`}> */}
                  {/* {data?.status} */}
                  {/* </span> */}
                  {/* </li> */}
                  {/* {!orderView && ( */}
                  {/* <li> */}
                  {/* <Link */}
                  {/* href={`${pathname}/${data?.id}`} */}
                  {/* className="btn btn-medium btn-light lg:ml-4 lg:mt-0"> */}
                  {/* View */}
                  {/* </Link> */}
                  {/* </li> */}
                  {/* )} */}
                  {/* </ul> */}

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
            <div className="text-[12px] font-extralight lg:border-t lg:border-border lg:mt-5 lg:pt-3 pt-2">{formatDate(data?.date_created)} </div>
            {data?.tracking_message && !orderView && (
              <div className="mt-4">
                <Alerts status="green" title={data?.tracking_message} />
              </div>
            )}
          </Link>
        </li>
      )}
    </>
  );
}
