import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import ProfileMenu from "@/app/Components/ProfileMenu";

export default function Returns() {
  const returns = [
    {
      items: [
        {
          product_photo: "/images/product.jpg",
          product_title: "Vitaminberry Just For Gut",
          qty: 1,
        },
      ],
      return_id: 223,
      order_id: 25685,
      order_date: "January 28, 2024",
      order_status: "Processing",
      order_amount: 325,
      order_items: 1,
      tracking_message: "",
    },
    {
      items: [
        {
          product_photo: "/images/product.jpg",
          product_title: "Vitaminberry Just For Gut",
          qty: 1,
        },
      ],
      return_id: 223,
      order_id: 25685,
      order_date: "January 28, 2024",
      order_status: "Returned",
      order_amount: 325,
      order_items: 1,
      tracking_message: "",
    },
  ];

  //const myOrders = null

  return (
    <div className="bg-bggray">
     <section className="bg-bggray sm:py-10 pb-5 pt-0">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
            <AccountHeader back/>
            <div className="sm:mt-5 mt-3 sm:pt-2">
              <div>
                <ul className="general-list">
                  {!returns && <Alerts large title="You have not any" />}
                  {returns &&
                    returns.map((item, index) => (
                      <MyOrder data={item} key={index} />
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
