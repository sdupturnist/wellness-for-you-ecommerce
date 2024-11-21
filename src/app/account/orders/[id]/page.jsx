import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import SectionHeader from "@/app/Components/SectionHeader";
import AmountList from "@/app/Components/AmountList";





export default function OrderItem() {



  const order = 
    {
      product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    order_id: 25685,
    order_date: 'January 28, 2024',
    order_status: 'Confirmed',
    order_amout: 675,
    order_qty: 2,
    tracking_message:'asdasd asda sdasd sad asdasd sad asd sad',
     order_shipping_address:'Jenny Wilson Limeyard, Schanzengasse 10, 8001, Zürich, CHE, 34451 binhan628@gmail.com (225) 555-0118',
     shipping:`Free Shipping`,
payment_method:`Direct bank transffer`,
coupon_discount:498,
subtotal:-5498,
total:5000,
    }



    
   
   
  


  // const myOrders = null


  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="bg-bggray pt-0">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
          <div className="px-5">
          <AccountHeader back/>
          </div>
            <div className="sm:pt-2">
              <div className="grid sm:gap-5 gap-3">
              <MyOrder data={order} orderView />
              <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                <SectionHeader title="Shipping address" card-sm spacingSm titleSmall/>
                <div className="grid gap-5">
                 <p>{order?.order_shipping_address}</p>
                  </div>
                  
              </div>
              <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                <SectionHeader title="Order Details" card-sm spacingSm titleSmall/>
                <div className="grid gap-5">
                <AmountList data={order} forOrderDetails/>
                  </div>
                  
              </div>
              <div className="card-rounded-none-small w-full bg-white py-4 px-3">
                <SectionHeader title="Track order" card spacingSm titleSmall/>
                <div className="grid gap-5">
                 dasdasdsa
                  </div>
                  
              </div>
              <div className="flex gap-3 sm:px-0 px-3">
               {order?.order_status === 'Confirmed' && <button  className="btn btn-medium btn-light">Cancel order</button>}
               {order?.order_status === 'Completed' && <button  className="btn btn-medium btn-light">Return</button>}
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
