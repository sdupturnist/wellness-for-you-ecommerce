import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";




export default function Orders() {



const myOrders = [
  
  {
    items: [
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
      },
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
      },
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
       
      }
    ],
    order_id: 25685,
    order_date: 'January 28, 2024',
    order_status: 'Completed',
    order_amount: 325,
    order_items: 1,
    tracking_message: 'Your order has been shipped!'
  },
  {
    items: [
      {
        product_photo: "/images/product.jpg",
        product_title: "Vitaminberry Just For Gut",
       
      }
    ],
    order_id: 25685,
    order_date: 'January 28, 2024',
    order_status: 'Completed',
    order_amount: 325,
    order_items: 1,
    tracking_message: 'Your order has been shipped!'
  }
];



  // const myOrders = null


  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="bg-bggray sm:py-10 pb-5 pt-3">
        <div className="container">
          <div className="max-w-[999px] mx-auto">
           <AccountHeader back/>
            <div className="sm:pt-2">
              <div>
              <ul className="general-list">
              {!myOrders &&  <Alerts large title="You have placed no orders"/>}
              {myOrders &&
                  myOrders.map((item, index) => (
                    <MyOrder data={item} key={index} />
                  ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
