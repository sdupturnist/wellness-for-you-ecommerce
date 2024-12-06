"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for navigation
import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import SectionHeader from "@/app/Components/SectionHeader";
import AmountList from "@/app/Components/AmountList";
import CancelOrder from "@/app/Components/CancelOrder";
import Return from "@/app/Components/Return";
import AddNewReturn from "@/app/Components/AddNewReturn";
import { apiUrl, jwtTocken, woocommerceKey } from "@/app/Utils/variables";
import ProfileMenu from "@/app/Components/ProfileMenu";
import Loading from "@/app/Components/Loading";
import Alerts from "@/app/Components/Alerts";
import { userId } from "@/app/Utils/UserInfo";
import { useAuthContext } from "@/app/Context/authContext";

export default function OrderItem() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state for error handling

  const { userData } = useAuthContext();

  const { id } = useParams();
  const router = useRouter();

  // Ensure id is available before proceeding
  if (!id) {
    return <Loading spinner />;
  }

  const splitSlug = id;
  const customerId = splitSlug[0];
  const orderId = splitSlug[1];


 function fetchOrder(){

  fetch(`${apiUrl}wp-json/wc/v3/orders/${orderId}${woocommerceKey}&customer=${userId}&per_page=1`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

      
 }


useEffect(() => {
  
  fetchOrder()

}, []);



  // Redirect to account page if no order is found
  useEffect(() => {
    if (error) {
      router.push("/account"); // Redirect to account page
    }
  }, [error, router]);

  const trackingMessage =
    order && order?.meta_data.filter((item) => item.key === "tracking");

  return (
    <div>
      {loading ? (
        <div className="text-center min-h-[70vh] flex items-center justify-center">
          <Loading spinner />
        </div>
      ) : error ? (
        <Alerts title={error} status="red" />
      ) : (
        <>
          <div className="bg-bggray">
            <section className="pb-0 sm:pt-0 pt-3">
              <div className="sm:bg-transparent max-w-[999px] mx-auto grid gap-5">
                <ul>
                  <MyOrder data={order} orderView />
                </ul>
                <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                  <SectionHeader
                    title="Shipping address"
                    card-sm
                    spacingSm
                    titleSmall
                  />
                  <div className="[&>*]:text-sm [&>*]:opacity-90 [&>*]:leading-relaxed">
                    <div className="grid gap-1 sm:max-w-[50%]">
                      <p>
                        {order?.billing?.first_name} {order?.billing?.last_name}
                      </p>
                      <p>
                        {order?.billing?.address_1}
                        {order?.billing?.address_2 && (
                          <span className="pl-1 inline-block">
                            , {order?.billing?.address_2}
                          </span>
                        )}
                      </p>
                      <p>
                        <span className="pr-1 inline-block">
                          {order?.billing?.city},
                        </span>
                        <span className="pr-1 inline-block">
                          {order?.billing?.state},
                        </span>
                        {order?.billing?.country}
                      </p>
                      <p>
                        Postal code.{" "}
                        <span className="pl-1 inline-block">
                          {order?.billing?.postcode}
                        </span>
                      </p>
                      <p>
                        Phone.{" "}
                        <span className="pl-1 inline-block">
                          {order?.billing?.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                  <SectionHeader
                    title="Order Details"
                    card-sm
                    spacingMd
                    titleSmall
                  />
                  <div className="grid gap-5">
                    <AmountList data={order} forOrderDetails />
                  </div>
                </div>
                {trackingMessage.length > 0 && (
                  <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                    <SectionHeader
                      title="Track order"
                      card
                      spacingSm
                      titleSmall
                    />
                    <div className="grid gap-5 order-tracking">
                      {trackingMessage[0]?.value}
                    </div>
                  </div>
                )}

                <div className="gap-3 sm:px-0 px-3">
                   {order?.status === "completed" &&
                  <AddNewReturn
                    userInfo={userData && userData}
                    data={order && order}
                    orderedDate={order && order?.date_completed}
                  />
                   }
                  {order?.status === "confirmed" ||
                    ((order?.status === "processing" ||
                      order?.status === "pending") && (
                      <CancelOrder
                        userInfo={userData && userData}
                        data={order && order}
                        orderedDate={order && order?.date_completed}
                      />
                    ))}

                  {order?.status === "cancelled" && (
                    <Alerts
                      status="green"
                      title="Your order cancellation request has been successfully submitted. If any amount has been debited, we will transfer it to your bank account within 7 days."
                    />
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
