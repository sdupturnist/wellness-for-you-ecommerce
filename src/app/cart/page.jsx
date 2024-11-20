import AddToCartWithQty from "../Components/AddToCartWithQty";
import Breadcrumb from "../Components/Breadcrumb";
import ProductCard from "../Components/ProductCard";
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

      <section className="bg-white spacing-sm">
        <div className="container">
          <div className="grid grid-cols-1 sm:gap-12 gap-5 lg:grid-cols-[70%_30%] cart">
            <div>
              <ul className="added-cart-list">
                 {cartItems &&
                    cartItems.map((item, index) => (
                      <li
                      key={index}
                      >
                      <ProductCard key={index} data={item} column inCartPage/>
                      <div>
                      <AddToCartWithQty inCartPage />
                   </div>
                   <div>
                   <div className="join">
  <button className="btn join-item">Button</button>
  <button className="btn join-item">Button</button>
  <button className="btn join-item">Button</button>
</div>
                   </div>
                      </li>
                    ))}
                </ul>
            </div>
            <div className="grid gap-7">
              <div className="card">
                <SectionHeader title="Cart totals" card />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
