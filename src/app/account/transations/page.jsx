import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";
import MyOrder from "@/app/Components/MyOrder";
import Alerts from "@/app/Components/Alerts";
import TableView from "@/app/Components/TableView";
import ProfileMenu from "@/app/Components/ProfileMenu";

export default function Transations() {
  const transation = [
    {
      transaction_ID: 25685,
      payment_method: "Stripe", //Payment Gateway (e.g., PayPal, Stripe, Credit Card, Bank Transfer, etc.)
      payment_status: "Completed", //Current payment status (e.g., Completed, Pending, Failed, Refunded).
      //payment_confirmation: '', //Payment Gateway Confirmation (e.g., a receipt or reference number indicating successful payment).
      refund_information: 0, //(if the transaction is partially or fully refunded).
    },
    {
      transaction_ID: 11223,
      payment_method: "Stripe", 
      payment_status: "Completed", 
      refund_information: 0, 
    },
    {
      transaction_ID: 47444,
      payment_method: "Stripe", 
      payment_status: "Completed", 
      refund_information: 0, 
    },
    {
      transaction_ID: 53443,
      payment_method: "Stripe", 
      payment_status: "Failed", 
      refund_information: 1, 
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
               {!transation && <Alerts large title="You have not any" />}
                  {transation &&
                    transation.map((item, index) => (
                      <TableView
                        data={[item]}
                        key={index}
                        labels={[
                          { label: "Transaction ID" },
                          { label: "Payment Method" },
                          { label: "Payment Status" },
                          { label: "Refund" },
                          { label: "Invoice" },
                        ]}
                      />
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
