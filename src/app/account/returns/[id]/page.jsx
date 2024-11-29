
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import SectionHeader from "@/app/Components/SectionHeader";
import AmountList from "@/app/Components/AmountList";
import Alerts from "@/app/Components/Alerts";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function ReturnItem() {
  const order = {
    items: [
      
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
        qty: 2,
      },
    ],
    order_id: 25685,
    order_date: "January 28, 2024",
    order_status: "Returned",
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
<section className="bg-bggray sm:py-10">
   <div className="container !px-0 sm:px-5">
     <div className="max-w-[999px] mx-auto">
       <AccountHeader back/>
       <div className="sm:mt-5 mt-3 sm:pt-2">
              <div className="grid sm:gap-5 gap-3">
              <div className="flex gap-3 sm:px-0 px-3">
    <Alerts  status="green" icon={<InformationCircleIcon className="size-11"/>} title="If you have not yet received your refund, please rest assured. We would like to inform you that your refund request has been processed. The amount will be credited back to your original payment method within 7 working days. Kindly allow this time frame for the refund to be successfully completed."/>
  </div>
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
              
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
