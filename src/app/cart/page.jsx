import Link from "next/link";
import AmountList from "../Components/AmountList";
import Breadcrumb from "../Components/Breadcrumb";
import CartListItem from "../Components/CartListItem";
import CouponCode from "../Components/CouponCode";
import SectionHeader from "../Components/SectionHeader";

export default function Cart() {
  const cartItems = [
    {
      product_photo: "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
      reviews: [
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 1,
        },
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 2,
        },
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 5,
        },
      ],
    },
    {
      product_photo: "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
      reviews: [
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 1,
        },
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 2,
        },
        {
          review_author: `Esther Howard`,
          review_post_date: ` 22 Jul`,
          review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
          review_count: 5,
        },
      ],
    },
  ];

  return (
    <div className="bg-bggray">
      <Breadcrumb />

      <section className="sm:bg-white bg-bggray sm:py-10 py-0">
      <div className="container !px-0 sm:px-5">
          <div className="grid sm:gap-16 gap-5 lg:grid-cols-[60%,28%] cart lg:justify-between">
          <div className="bg-white sm:p-0 py-5 px-4">
              <ul className="added-cart-list mb-5">
                {cartItems &&
                  cartItems.map((item, index) => (
                    <CartListItem data={item} key={index} />
                  ))}
              </ul>
              <Link href="/" className="btn btn-light">Continue shopping</Link>
            </div>
            <div className="grid gap-7">
              <div className="card-rounded-none-small w-full bg-white py-5 px-4">
                <SectionHeader title="Cart totals" card />
                <div className="grid gap-5">
                  <CouponCode />
                  <AmountList />
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
