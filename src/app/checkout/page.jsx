import AmountList from "../Components/AmountList";
import Breadcrumb from "../Components/Breadcrumb";
import CouponCode from "../Components/CouponCode";
import SectionHeader from "../Components/SectionHeader";
import CheckoutAddress from "../Components/CheckoutAddress";
import ListOptions from "../Components/ListOptions";
import { apiUrl, woocommerceKey } from "../Utils/variables";

export default async function Checkout() {



//  POST https://admin.wellness4u.in//wp-json/wc/v3/customers/2/addresses?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03&reviewer=Muhammed&reviewer_email=test@test.com&product_id=84

// {
//   "address": {
//     "address_1": "dfgdf gfgdfg",
//     "address_2": "dfg dfg ",
//     "city": "Lodfgdfg Angeles",
//     "state": "CA",
//     "postcode": "90005",
//     "country": "US",
//     "phone": "123-456-7890"
//   }
// }


// GET https://admin.wellness4u.in//wp-json/wc/v3/customers/2/addresses?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03&reviewer=Muhammed&reviewer_email=test@test.com&product_id=84




    // Fetch ADDRESS data
    let savedAddressData = await fetch(
      `${apiUrl}wp-json/wc/v3/customers/2${woocommerceKey}`,
      {
        next: {
          revalidate: 60,
          cache: "no-store",
        },
      }
    );
  
    let savedAdrress = await savedAddressData.json();


  

  const paymentOptions = [
    {
      option_title: `Direct bank transfer`,
    },
    {
      option_title: `Cash on delivery`,
    },
  ];

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
          <div className="grid sm:gap-16 gap-5 lg:grid-cols-[60%,35%] checkout lg:justify-between">
            <div className="grid gap-7">
              <CheckoutAddress data={savedAddressData && savedAdrress} multipleAddress={savedAddressData && savedAdrress}/>
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
                    {paymentOptions &&
                      paymentOptions.map((item, index) => (
                        <ListOptions
                          key={index}
                          title={item?.option_title}
                          noButton
                          small
                        />
                      ))}
                  </div>
                  <div className="border-t border-border pt-5">
                    <ListOptions
                      title="I have read and agree to the website terms and conditions."
                      noButton
                      small
                    />
                  </div>
                  <button className="btn-large">Proceed to checkout</button>
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
