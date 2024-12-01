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
      <section className="bg-bggray sm:py-10 p-0">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
            <AccountHeader back />
            <div className="sm:mt-5 mt-3 sm:pt-2">
        <AllOrders/>
              </div>
            <ProfileMenu />
          </div>
        </div>
      </section>
    </div>
  );
}
