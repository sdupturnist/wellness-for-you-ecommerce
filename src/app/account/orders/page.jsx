import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import ProfileMenu from "@/app/Components/ProfileMenu";
import { apiUrl, jwtTocken, woocommerceKey } from "@/app/Utils/variables";
import AllOrders from "@/app/Components/AllOrders";



export default async function Orders({ params }) {
  const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  return (
    <div className="bg-bggray">
    <section className="pb-0 sm:pt-0 pt-3">
       <div className="sm:bg-transparent max-w-[999px] mx-auto">
     <AllOrders/>
        </div>
   </section>
  </div>
  );
}
