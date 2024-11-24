import AddToCart from "@/app/Components/AddToCart";
//import AddToCartWithQty from "@/app/Components/AddToCartWithQty";
import AddToWishList from "@/app/Components/AddToWishList";
import Breadcrumb from "@/app/Components/Breadcrumb";
import Features from "@/app/Components/Features";
import ImageSlider from "@/app/Components/ImagesSlider";
import ProductCartOptions from "@/app/Components/ProductCartOptions";
import ProductSlider from "@/app/Components/ProductSlider";
import ReviewCount from "@/app/Components/ReviewCount";
import Reviews from "@/app/Components/Reviews";
import SectionHeader from "@/app/Components/SectionHeader";
import SocialShare from "@/app/Components/SocialShare";
import WriteReview from "@/app/Components/WriteReview";
import { currency, OfferPercentage } from "@/app/Utils/variables";


export default function ItemSingle() {
  const singleProduct = {
    product_photos: [
      {
        url: "/images/product.jpg",
        alt: "tets",
      },
      {
        url: "/images/product.jpg",
        alt: "tets",
      },
      {
        url: "/images/product.jpg",
        alt: "tets",
      },
      {
        url: "/images/product.jpg",
        alt: "tets",
      },
    ],
    id:11,
    product_title: "Vitaminberry Just For Gut",
    normal_price: 1500,
    sale_price: 300,
    short_desc: `Lorem ipsum dolor sit amet consectetur. In sed id lorem ut vulputate augue consequat mauris. Porttitor sagittis luctus tincidunt bibendum. Sit orci vel ac turpis condimentum. Volutpat at aliquam nisl ut.`,
    features: [
      {
        icon: "/images/banner_7.jpg",
        title: "Secure Payment",
      },
      {
        icon: "/images/banner_7.jpg",
        title: "Free Shipping",
      },
      {
        icon: "/images/banner_7.jpg",
        title: "Money Back Guarantee",
      },
      {
        icon: "/images/banner_7.jpg",
        title: "24X7 Support",
      },
    ],
    cartOptions: [
      {
        title: "Single pack",
      },
      {
        title: "Buy1 Get 1Free (+₹225.00)",
      },
    ],
    description: `<p>If you're asking for the HTML content in a format that might come from a WYSIWYG (What You See Is What You Get) editor, the data is typically stored with extra markup or embedded metadata. For instance, WYSIWYG editors often store HTML content with additional styling, embedded elements, or special attributes. Here’s an example of how the <code>test</code> paragraph might be stored in a typical WYSIWYG editor's output, including some extra information:</p>`,
    shipping_delivery: `<p>If you're asking for the HTML content in a format that might come from a WYSIWYG (What You See Is What You Get) editor, the data is typically stored with extra markup or embedded metadata. For instance, WYSIWYG editors often store HTML content with additional styling, embedded elements, or special attributes. Here’s an example of how the <code>test</code> paragraph might be stored in a typical WYSIWYG editor's output, including some extra information:</p>`,
    additional_informations: `<p>If you're asking for the HTML content in a format that might come from a WYSIWYG (What You See Is What You Get) editor, the data is typically stored with extra markup or embedded metadata. For instance, WYSIWYG editors often store HTML content with additional styling, embedded elements, or special attributes. Here’s an example of how the <code>test</code> paragraph might be stored in a typical WYSIWYG editor's output, including some extra information:</p>`,
    reviews: [
      {
        review_author: `Esther Howard`,
        review_post_date: ` 22 Jul`,
        review_content: `Lorem ipsum dolor sit amet consectetur. Gravida accumsan semper lacus mus orci diam malesuada. Turpis et iaculis in dolor platea ut amet arcu auctor. Odio aliquam porta tincidunt sed senectus egestas vel ut. Sociis risus eu lobortis tortor vitae nunc volutpat. Erat posuere amet ligula pellentesque mauris porta viverra vitae.`,
        review_count: 4,
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
  };

  return (
    <div className="bg-bggray">
      <Breadcrumb />

      <section className="bg-white sm:py-14 py-5 ">
        <div className="container">
          <div className="grid grid-cols-1 sm:gap-12 gap-5 lg:grid-cols-[40%_60%] product-single">
            <div>
              <div className="border sm:rounded-xl rounded-lg overflow-hidden sm:min-h-[600px] sm:pt-8 pb-16 bg-white">
                <ImageSlider data={singleProduct?.product_photos} />
              </div>
            </div>
            <div className="grid gap-7 lg:max-w-[80%]">
              <div className="grid gap-4">
                <h1>{singleProduct && singleProduct?.product_title}</h1>
                {singleProduct?.reviews.length > 0 && (
                  <ReviewCount data={singleProduct?.reviews} large />
                )}
              </div>
              <div className="grid gap-1">
                <span className="product-price">
                  {currency}{singleProduct && singleProduct?.sale_price}
                </span>
                {singleProduct?.normal_price > 0 && (
                  <div className="flex items-center justify-start gap-3">
                    <span className="normal-price">
                      {currency}{singleProduct && singleProduct?.normal_price}
                    </span>
                    <span className="offer border-l pl-3">
                      Save {currency}
                      {singleProduct &&
                        singleProduct?.normal_price -
                          singleProduct?.sale_price}{" "}
                      (
                      {singleProduct && (
                        <OfferPercentage
                          normalprice={singleProduct?.normal_price}
                          saleprice={singleProduct?.sale_price}
                        />
                      )}
                      % off)
                    </span>
                  </div>
                )}
              </div>

              {singleProduct?.short_desc && (
                <p>{singleProduct && singleProduct?.short_desc}</p>
              )}
              <ProductCartOptions data={singleProduct?.cartOptions} />
              <div className="flex gap-3 lg:relative fixed bottom-0 left-0 right-0 z-40 bg-white lg:py-3 py-2 lg:px-0 px-4 border-t lg:border-none">
                {/* <AddToCartWithQty /> */}
            
              
                <AddToCart
            itemid={singleProduct?.id ?? null}
            price={
              singleProduct?.sale_price !== null
                ? singleProduct?.sale_price
                : singleProduct?.normal_price
            }
            name={singleProduct?.product_title}
            />
                <AddToWishList />
              </div>
              <div className="gap-2 sm:inline-flex">
                <Features data={singleProduct?.features} />
              </div>
              <div className="grid gap-4">
                <small className="opacity-50">Share with</small>
                <SocialShare />
              </div>
            </div>
          </div>
          <div className="sm:mt-14 mt-7">
            <div className="grid gap-5">
              {singleProduct?.description && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Description
                  </div>
                  <div className="collapse-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.description,
                      }}
                    />
                  </div>
                </div>
              )}

              {singleProduct?.additional_informations && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Additional information
                  </div>
                  <div className="collapse-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.additional_informations,
                      }}
                    />
                  </div>
                </div>
              )}

              {singleProduct?.shipping_delivery && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Shipping Delivery
                  </div>
                  <div className="collapse-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.shipping_delivery,
                      }}
                    />
                  </div>
                </div>
              )}

              {singleProduct?.reviews.length > 0 && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Reviews
                  </div>
                  <div className="collapse-content">
                    <div className="sm:flex gap-4 justify-between sm:items-center border-b pb-4">
                      <p>Rate this Backer and tell others what you think</p>
                      <div className="sm:mt-0 mt-2">
                      <WriteReview />
                      </div>
                    </div>
                   <div className="mt-5">
                   <Reviews data={singleProduct && singleProduct?.reviews} />
                   </div>

                    {/* <div  dangerouslySetInnerHTML={{ __html: singleProduct?.shipping_delivery }}/> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="sm:mt-10 mt-5">
            <div>
              <SectionHeader title="Frequently bought together" url="/" />
              <div className="products">
                {relatedProducts && (
                  <ProductSlider count="5" data={relatedProducts} />
                )}
              </div>
            </div>
          </div>
          <div className="sm:mt-10 mt-7 mb-5">
            <div>
              <SectionHeader title="Top rated products" url="/" />
              <div className="products">
                {topRatedProducts && (
                  <ProductSlider count="5" data={topRatedProducts} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const relatedProducts = [
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
];

const topRatedProducts = [
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },

  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
  {
    product_photo: "/images/product.jpg",
    product_title: "Vitaminberry Just For Gut",
    review_count: 3,
    normal_price: 1040,
    sale_price: 989,
    offer: 20,
  },
];
