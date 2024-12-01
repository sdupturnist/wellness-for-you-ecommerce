import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import ProfileMenu from "@/app/Components/ProfileMenu";
import { apiUrl, jwtTocken, woocommerceKey } from "@/app/Utils/variables";

export default async function Orders({ params }) {
  const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  let ordersData = await fetch(
    `${apiUrl}wp-json/wc/v3/orders${woocommerceKey}&customer=${userInfo?.id}&per_page=100`,
    {
      method: "GET", // Add method if needed
      headers: {
        Authorization: `Bearer ${jwtTocken}`, // Ensure token is a string within backticks
      },
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  let orders = await ordersData.json();


 

  return (
    <div className="bg-bggray">
      <section className="bg-bggray sm:py-10">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
            <AccountHeader back />
            <div className="sm:mt-5 mt-3 sm:pt-2">
              <div>
                <ul className="general-list">
                  {!orders?.length > 0 && <Alerts large title="You have not any" />}
                  {orders &&
                    orders.map((item, index) => (
                      <MyOrder data={item} key={index} userInfo={userInfo} />
                    ))}
                </ul>
              </div>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </section>
    </div>
  );
}
