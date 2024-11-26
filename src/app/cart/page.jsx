import Breadcrumb from "../Components/Breadcrumb";
import CartView from "../Components/CartView";
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
          <CartView coupon={couponCodes} />
        </div>
      </section>
    </div>
  );
}
