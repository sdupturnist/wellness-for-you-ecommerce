import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import SectionHeader from "@/app/Components/SectionHeader";
import AmountList from "@/app/Components/AmountList";
import CancelOrder from "@/app/Components/CancelOrder";
import Return from "@/app/Components/Return";

export default function OrderItem() {
  const order = {
    items: [
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
        qty: 2,
      },
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
        qty: 2,
      },
    ],
    order_id: 25685,
    order_date: "January 28, 2024",
    order_status: "Confirmed",
    order_amout: 675,
    tracking_message: "asdasd asda sdasd sad asdasd sad asd sad",
    order_shipping_address:
      "Jenny Wilson Limeyard, Schanzengasse 10, 8001, Zürich, CHE, 34451 binhan628@gmail.com (225) 555-0118",
    shipping: `Free Shipping`,
    payment_method: `Direct bank transffer`,
    coupon_discount: 498,
    subtotal: 5498,
    total: 5000,
  };

  // const myOrders = null

  return (
    <div className="bg-bggray">
    <section className="bg-bggray sm:py-10 pb-5 pt-0">
       <div className="container !px-0 sm:px-5">
         <div className="max-w-[999px] mx-auto">
           <AccountHeader back/>
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
                  <div className="grid gap-5">
                    <p>{order?.order_shipping_address}</p>
                  </div>
                </div>
                <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                  <SectionHeader
                    title="Order Details"
                    card-sm
                    spacingSm
                    titleSmall
                  />
                  <div className="grid gap-5">
                    <AmountList data={order} forOrderDetails />
                  </div>
                </div>
                {order?.tracking_message && (
                  <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                    <SectionHeader
                      title="Track order"
                      card
                      spacingSm
                      titleSmall
                    />
                    <div className="grid gap-5 order-tracking">
                      {order?.tracking_message}
                    </div>
                  </div>
                )}{" "}
                <div className="flex gap-3 sm:px-0 px-3">
                  {order?.order_status === "Confirmed" && <CancelOrder />}
                  {order?.order_status === "Completed" && <Return />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
