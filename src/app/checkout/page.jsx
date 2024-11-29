import AmountList from "../Components/AmountList";
import Breadcrumb from "../Components/Breadcrumb";
import CouponCode from "../Components/CouponCode";
import SectionHeader from "../Components/SectionHeader";
import CheckoutAddress from "../Components/CheckoutAddress";
import { apiUrl, woocommerceKey } from "../Utils/variables";
import PaymentButton from "../Components/PaymentButton";
import PaymentOptionsList from "../Components/PaymentOptionsList";
import TestComponent from "../Components/TestComponent";

export default async function Checkout() {


 
  
  let paymentOptionsData = await fetch(
    `${apiUrl}wp-json/wc/v3/payment_gateways${woocommerceKey}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

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
  let paymentOptions = await paymentOptionsData.json();



  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="sm:bg-white bg-bggray sm:py-10 py-0">
        <div className="container !px-0 sm:px-5">
          <div className="grid sm:gap-16 gap-5 lg:grid-cols-[60%,35%] checkout lg:justify-between">
            <div className="grid gap-7">
              <CheckoutAddress />
            </div>
            <div className="grid gap-7">
              <div className="card-rounded-none-small w-full bg-white py-5 px-4">
                <SectionHeader title="Your order" card />
                <div className="grid gap-5">
                  <CouponCode data={couponCodes} />
                  <div className="border-b pb-4">
                    <AmountList />
                  </div>
                  <div className="grid gap-2">
                    <SectionHeader title="Payment options" small spacingSm />
                    {paymentOptions && (
                      <PaymentOptionsList data={paymentOptions} />
                    )}
                  </div>
                  {/* <TestComponent /> */}
                  <PaymentButton userData={userInfo} />
                  <small className="text-xs opacity-55 leading-5">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
