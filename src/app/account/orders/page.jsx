import AllOrders from "@/app/Components/AllOrders";

export default async function Orders({ params }) {
 
 


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
