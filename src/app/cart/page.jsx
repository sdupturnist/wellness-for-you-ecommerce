

import Link from "next/link";
import AmountList from "../Components/AmountList";
import Breadcrumb from "../Components/Breadcrumb";
import CartListItem from "../Components/CartListItem";
import CouponCode from "../Components/CouponCode";
import SectionHeader from "../Components/SectionHeader";
import { apiUrl, woocommerceKey } from "../Utils/variables";



export default async function Cart() {



    let couponCodeData = await fetch(
      `${apiUrl}wp-json/wc/v3/coupons${woocommerceKey}`,
      {
        next: {
          revalidate: 60,
          cache: "no-store",
        },
      }
    );



    let couponCodes = await couponCodeData.json();








  return (
    <div className="bg-bggray">
      <Breadcrumb />

      <section className="sm:bg-white bg-bggray sm:py-10 py-0">
        <div className="container !px-0 sm:px-5">
          <div className="grid sm:gap-16 gap-5 lg:grid-cols-[60%,28%] cart lg:justify-between">
            <div className="bg-white sm:p-0 py-5 px-4">
              <CartListItem />
              <Link href="/" className="btn btn-light">
                Continue shopping
              </Link>
            </div>
            <div className="grid gap-7">
              <div className="card-rounded-none-small w-full bg-white py-5 px-4">
                <SectionHeader title="Cart totals" card />
                <div className="grid gap-5">
                  <CouponCode data={couponCodes} />
                  <AmountList/>
                  <button className="btn-large">Proceed to checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
