import AddToCart from "@/app/Components/AddToCart";
//import AddToCartWithQty from "@/app/Components/AddToCartWithQty";
import AddToWishList from "@/app/Components/AddToWishList";
import Alerts from "@/app/Components/Alerts";
import Breadcrumb from "@/app/Components/Breadcrumb";
import Features from "@/app/Components/Features";
import Images from "@/app/Components/Images";
import ImageSlider from "@/app/Components/ImagesSlider";
import ProductCard from "@/app/Components/ProductCard";
import ProductCartOptions from "@/app/Components/ProductCartOptions";
import ProductSlider from "@/app/Components/ProductSlider";
import ReviewCount from "@/app/Components/ReviewCount";
import Reviews from "@/app/Components/Reviews";
import SectionHeader from "@/app/Components/SectionHeader";
import SocialShare from "@/app/Components/SocialShare";
import WriteReview from "@/app/Components/WriteReview";

import {
  apiUrl,
  convertStringToJSON,
  currency,
  metaStaticData,
  OfferPercentage,
  siteAuthor,
  woocommerceKey,
} from "@/app/Utils/variables";

export default async function ItemSingle({ params, searchParams }) {
  const { slug } = params;
  const { category } = params;

  let singleProductData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&slug=${slug}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let relatedProductsData = await fetch(
    `${apiUrl}wp-json/wc-custom/v1/products?category=${category}&search=&min_price=0&page=0&per_page=100&reviews_count=0`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let topProductsData = await fetch(
    `${apiUrl}wp-json/top-products/v1/products`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  const [singleProduct] = await singleProductData.json();
  const relatedProductsGet = await relatedProductsData.json();
  const relatedProducts = relatedProductsGet?.products;
  let topRatedProducts = await topProductsData.json();

  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="bg-white sm:py-14 py-5 px-5">
        <div className="container">
          <div className="grid grid-cols-1 sm:gap-12 gap-5 lg:grid-cols-[40%_60%] product-single">
            <div>
              <div className="border sm:rounded-xl rounded-lg overflow-hidden sm:min-h-[600px] sm:pt-8 pb-16 bg-white">
                {singleProduct && singleProduct?.images?.length > 1 ? (
                  <ImageSlider data={singleProduct?.images} />
                ) : (
                  <Images
                    imageurl={singleProduct?.images[0]?.src}
                    quality="100"
                    width="800"
                    height="800"
                    title={`${
                      singleProduct?.images[0]?.alt || singleProduct?.name
                    }`}
                    alt={`${
                      singleProduct?.images[0]?.alt || singleProduct?.name
                    }`}
                    classes="block w-full mx-auto"
                    placeholder={true}
                  />
                )}
              </div>
            </div>
            <div className="grid gap-7 lg:max-w-[80%]">
              <div className="grid gap-4">
                <h1>{singleProduct && singleProduct?.name}</h1>
                {singleProduct?.rating_count > 0 && (
                  <ReviewCount data={singleProduct?.reviews} large />
                )}
              </div>
              <div>
                {singleProduct?.price && (
                  <span className="product-price block mb-2">
                    {currency}
                    {singleProduct && singleProduct?.price}
                  </span>
                )}
                {singleProduct?.regular_price > 0 && (
                  <div className="flex items-center justify-start gap-3">
                    <span className="normal-price">
                      {currency}
                      {singleProduct && singleProduct?.regular_price}
                    </span>
                    <span className="offer border-l pl-3">
                      Save {currency}
                      {singleProduct &&
                        singleProduct?.regular_price -
                          singleProduct?.sale_price}
                      (
                      {singleProduct && (
                        <OfferPercentage
                          normalprice={singleProduct?.regular_price}
                          saleprice={singleProduct?.sale_price}
                        />
                      )}
                      % off)
                    </span>
                  </div>
                )}
              </div>

              {singleProduct?.short_description && (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: singleProduct && singleProduct?.short_description,
                  }}
                />
              )}

              {singleProduct?.acf?.options && (
                <ProductCartOptions
                  data={convertStringToJSON(
                    singleProduct && singleProduct?.acf?.options
                  )}
                />
              )}
              {singleProduct?.price && (
                <div className="flex gap-3 lg:relative fixed bottom-0 left-0 right-0 z-40 bg-white lg:py-3 py-2 lg:px-0 px-4 border-t lg:border-none">
                  <AddToCart
                    itemid={singleProduct?.id ?? null}
                    price={
                      singleProduct?.sale_price !== null
                        ? singleProduct?.sale_price
                        : singleProduct?.regular_price
                    }
                    name={singleProduct?.name}
                    image={singleProduct?.images[0]?.src}
                  />
                </div>
              )}
              <div className="gap-2 sm:inline-flex">
                {singleProduct?.acf?.features && (
                  <Features
                    data={convertStringToJSON(
                      singleProduct && singleProduct?.acf?.features
                    )}
                  />
                )}
              </div>
              <div>
                <small className="opacity-50 mb-3 block">Share with</small>
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
                  <div className="collapse-content content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.description,
                      }}
                    />
                  </div>
                </div>
              )}

              {singleProduct?.acf?.specification && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Specification
                  </div>
                  <div className="collapse-content content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.acf?.specification,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* {singleProduct?.shipping_delivery && (
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Shipping Delivery
                  </div>
                  <div className="collapse-content content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleProduct?.shipping_delivery,
                      }}
                    />
                  </div>
                </div>
              )} */}

         
                <div className="collapse collapse-plus border rounded-lg">
                  <input type="radio" name="my-accordion-3" />
                  <div className="collapse-title text-md text-dark font-medium">
                    Reviews
                  </div>
                  <div className="collapse-content content">
                  {singleProduct?.review && <div className="sm:flex gap-4 justify-between sm:items-center border-b pb-4">
                      <p>Rate this Backer and tell others what you think</p>
                      <div className="sm:mt-0 mt-2">
                        <WriteReview />
                      </div>
                    </div>
}
                    <div className={`${singleProduct?.review && "mt-5"}`}>
                    {
                    singleProduct?.reviews ? <Reviews data={singleProduct && singleProduct?.reviews} />
                    :
                    <div className="items-start">
                      <Alerts title="No reviews available yet" center nobg/>
                      <div className="text-center pb-7 pt-3">
                      <WriteReview />
                      </div>
                    </div>
                    }
                    </div>
                  </div>
                </div>
            
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="sm:mt-10 mt-5">
              <div className="section-header-card !p-0">
                <SectionHeader title="Frequently bought together" spacingSm />
                <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                  {relatedProducts.map((item, index) => (
                    <ProductCard key={index} data={item} mobileList />
                  ))}
                </ul>
              </div>
            </div>
          )}

          {topRatedProducts.length > 0 && (
            <div className="sm:mt-10 mt-5">
              <div className="section-header-card !p-0">
                <SectionHeader title="Top rated products" spacingSm />
                <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                  {topRatedProducts.map((item, index) => (
                    <ProductCard key={index} data={item} mobileList />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const staticData = metaStaticData;
  const { slug } = params;

  try {
    const page = await fetch(
      `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&slug=${slug}`
    );
    const [pageData] = await page.json();

    // Return metadata object with dynamic values, or fall back to static values
    return {
      title: pageData?.yoast_head_json?.title || staticData.title,
      description:
        pageData?.yoast_head_json?.description || staticData.description,
      author: siteAuthor || staticData.author, // Dynamic author or static fallback
      keywords: pageData?.acf?.seo_keywords || staticData.keywords,
      viewport: "width=device-width, initial-scale=1",
      robots: pageData?.yoast_head_json?.robots || staticData.robots,
      canonical: pageData?.yoast_head_json?.canonical || staticData.canonical,
      og_locale: staticData.og_locale,
      og_type: staticData.og_type,
      og_title: pageData?.yoast_head_json?.og_title || staticData.og_title,
      og_description:
        pageData?.yoast_head_json?.og_description || staticData.og_description,
      og_url: pageData?.yoast_head_json?.canonical || staticData.og_url,
      og_site_name: staticData.og_site_name,
      article_modified_time:
        pageData?.yoast_head_json?.modified_time ||
        staticData.article_modified_time,
      twitter_card: staticData.twitter_card,
      twitter_misc:
        pageData?.yoast_head_json?.twitter_misc || staticData.twitter_misc,
      twitter_site: staticData.twitter_site,
      twitter_creator: staticData.twitter_creator,
      twitter_image:
        pageData?.yoast_head_json?.og_image || staticData.twitter_image,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    // Return static data in case of an error
    return staticData;
  }
}
