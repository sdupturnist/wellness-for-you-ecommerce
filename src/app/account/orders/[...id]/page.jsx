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

export default async function OrderItem({ params }) {
  const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  const { id } = params;

  const splitSlug = id;

  const customerId = splitSlug[0];
  const orderKey = splitSlug[1];

  let orderData = await fetch(
    `${apiUrl}wp-json/custom/v1/orders?order_key=${orderKey}&customer_id=${customerId}`,
    {
      method: "GET", // Add method if needed
      headers: {
        Authorization: `Bearer ${jwtTocken}`, // Ensure token is a string within backticks
      },
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let [order] = await orderData.json();

  const trackingMessage =
    order && order?.meta_data.filter((item) => item.key === "tracking");

  return (
    <>
      <div className="bg-bggray">
        <section className="bg-bggray sm:py-10 py-0">
          <div className="container !px-0 sm:px-5">
            <div className="max-w-[999px] mx-auto">
              <AccountHeader back />
              <div className="sm:mt-5 mt-3 sm:pt-2">
                <div className="grid sm:gap-5 gap-3">
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
                          {order?.billing?.first_name}{" "}
                          {order?.billing?.last_name}
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
                    <AddNewReturn
                      userInfo={userInfo && userInfo}
                      data={order && order}
                      orderedDate={order && order?.date_completed}
                    />
                    {order?.status === "confirmed" ||
                      ((order?.status === "processing" ||
                        order?.status === "pending") && <CancelOrder />)}
                  </div>
                </div>
              </div>
              <ProfileMenu />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
