import Breadcrumb from "../Components/Breadcrumb";
import CartView from "../Components/CartView";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

export default async function Cart() {


  // const cookieStore = await cookies();
  // const myCookie = cookieStore.get('myCookie') || 'No cookie found';
  

  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="sm:bg-white bg-bggray sm:py-10 py-0">
        <div className="container !px-0 sm:px-5">
          <CartView />
        </div>
      </section>
    </div>
  );
}
