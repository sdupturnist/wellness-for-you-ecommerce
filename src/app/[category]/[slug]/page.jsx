import Accordion from "@/app/Components/Accordion";
import AddToCart from "@/app/Components/AddToCart";
import Alerts from "@/app/Components/Alerts";
import Breadcrumb from "@/app/Components/Breadcrumb";
import Features from "@/app/Components/Features";
import Images from "@/app/Components/Images";
import ImageSlider from "@/app/Components/ImagesSlider";
import ImageWithZoom from "@/app/Components/ImageZoom";
import ProductCard from "@/app/Components/ProductCard";
import ReviewCount from "@/app/Components/ReviewCount";
import Reviews from "@/app/Components/Reviews";
import SectionHeader from "@/app/Components/SectionHeader";
import SocialShare from "@/app/Components/SocialShare";
import WriteReview from "@/app/Components/WriteReview";

import {
  apiUrl,
  convertStringToJSON,
  currency,
  homeUrl,
  metaStaticData,
  OfferPercentage,
  siteAuthor,
  woocommerceKey,
} from "@/app/Utils/variables";
import Link from "next/link";

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

  let allProductsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let reviewsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  const [singleProduct] = await singleProductData.json();

  let productReviewData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}&product=${singleProduct?.id}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  const relatedProductsGet = await relatedProductsData.json();
  const relatedProducts = relatedProductsGet?.products;
  let productReview = await productReviewData.json();
  let reviews = await reviewsData.json();
  let allProducts = await allProductsData.json();

  // Filter the products based on matching product_id from the reviews
  const filteredProductsTopProducts =
    allProducts &&
    allProducts.filter((product) =>
      reviews.some((review) => review.product_id === product.id)
    );

  const accordianItems = [
    {
      title: "Description",
      content: singleProduct?.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: singleProduct?.description,
          }}
        />
      ),
    },
    {
      title: "Specification",
      content: singleProduct?.acf?.specification && (
        <div
          dangerouslySetInnerHTML={{
            __html: singleProduct?.acf?.specification,
          }}
        />
      ),
    },
    {
      title: "Reviews",
      content: (
        <>
          {productReview.length > 0 && (
            <div className="grid gap-4 justify-between sm:items-center">
              <p>Rate this Backer and tell others what you think</p>
              <div className="sm:mt-0 mt-2">
                <WriteReview productId={singleProduct?.id} />
              </div>
            </div>
          )}

          <div className={`${productReview.length > 0 && "mt-5"}`}>
            {productReview.length > 0 ? (
              <Reviews data={productReview && productReview} />
            ) : (
              <div className="items-start">
                <Alerts status="red" title="No reviews available yet" />
                <div className="text-center pb-7 pt-3">
                  <WriteReview productId={singleProduct?.id} />
                </div>
              </div>
            )}
          </div>
        </>
      ),
    },
  ];


  if (singleProduct) {
    return (
      <main>
        <div className="container">
          <Breadcrumb />

          <section className="bg-white sm:pb-14 pt-0 pb-5 px-5 sm:px-0">
            <div className="container">
              <div className="grid grid-cols-1 sm:gap-12 gap-5 lg:grid-cols-[40%_60%] product-single">
                <div>
                  <div className="border sm:rounded-xl rounded-lg overflow-hidden sm:min-h-[600px] p-5 pb-7 bg-white min-h-80">
                    {singleProduct && singleProduct?.images?.length > 1 ? (
                      <ImageSlider data={singleProduct?.images} />
                    ) : (

                      <ImageWithZoom
                      imageurl={singleProduct?.images[0]?.src}
                      quality="100"
                      width="800"
                      height="800"
                      title={singleProduct?.images[0]?.alt || singleProduct?.name}
                      alt={singleProduct?.images[0]?.alt || singleProduct?.name}
                      classes="block w-full mx-auto"
                      placeholder={true} // lazy loading if needed
                    />
                  
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-7 lg:max-w-[80%]">
                  <div>
                    <div className="grid gap-4 mb-3">
                      <h1>{singleProduct && singleProduct?.name}</h1>
                      {productReview.length > 0 && (
                        <Link href="#reviews">
                          <ReviewCount
                            average={singleProduct?.average_rating}
                            ratingCount={singleProduct?.rating_count}
                            large
                          />
                        </Link>
                      )}
                    </div>
                    <div className="sm:mt-8">
                      {singleProduct?.price && (
                        <span className="product-price block mb-2">
                          {currency}
                          {singleProduct && singleProduct?.price}
                        </span>
                      )}
                      {singleProduct?.regular_price > 0 &&
                        singleProduct?.sale_price && (
                          <div className="flex items-center justify-start gap-3">
                            <span className="normal-price">
                              {currency}
                              {singleProduct && singleProduct?.regular_price}
                            </span>
                            <span className="offer border-l pl-3">
                              <span className="inline-block pr-1">
                                Save {currency}
                                {singleProduct &&
                                  singleProduct?.regular_price -
                                    singleProduct?.sale_price}
                              </span>
                              (
                              {singleProduct && (
                                <OfferPercentage
                                  normalprice={singleProduct?.regular_price}
                                  saleprice={singleProduct?.sale_price}
                                />
                              )}
                              )
                            </span>
                          </div>
                        )}
                    </div>
                    {singleProduct?.short_description && (
                      <div
                        className="content sm:my-10 my-5"
                        dangerouslySetInnerHTML={{
                          __html:
                            singleProduct && singleProduct?.short_description,
                        }}
                      />
                    )}

                    {/* {singleProduct?.acf?.options && (
                  <div className="mb-5">
                    <ProductCartOptions
                      data={convertStringToJSON(
                        singleProduct && singleProduct?.acf?.options
                      )}
                    />
                  </div>
                )} */}

                    {/* flex gap-3 lg:relative fixed bottom-0 left-0 right-0 z-40 bg-white lg:py-3 py-2 lg:px-0 px-4 border-t lg:border-none */}

                    {singleProduct?.price && (
                      <div className="flex gap-3  bg-white">
                        <AddToCart
                          itemid={singleProduct?.id ?? null}
                          price={
                            singleProduct?.sale_price !== null
                              ? singleProduct?.regular_price
                              : singleProduct?.sale_price
                          }
                          name={singleProduct?.name}
                          image={singleProduct?.images[0]?.src}
                          options={convertStringToJSON(
                            singleProduct && singleProduct?.acf?.options
                          )}
                          singlePage
                          slug={singleProduct?.slug}
                        />
                      </div>
                    )}
                    <div className="gap-2 sm:inline-flex my-5">
                      {singleProduct?.acf?.features && (
                        <Features
                          data={convertStringToJSON(
                            singleProduct && singleProduct?.acf?.features
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <small className="opacity-50 mb-3 block">
                        Share with
                      </small>
                      <SocialShare
                        url={`${homeUrl}/${singleProduct?.categories[0]?.slug}/${singleProduct?.slug}`}
                        title={`${singleProduct?.name}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:mt-14 mt-10">
                <div className="grid gap-5">
                  <Accordion items={accordianItems} />
                </div>
              </div>

              {relatedProducts.length > 0 && (
                <div className="sm:mt-10 mt-5">
                  <div className="section-header-card !p-0">
                    <SectionHeader
                      title="Frequently bought together"
                      spacingSm
                    />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {relatedProducts.map((item, index) => (
                        <ProductCard key={index} data={item} mobileList />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {allProducts && filteredProductsTopProducts.length > 0 && (
                <div className="sm:mt-10 mt-5">
                  <div className="section-header-card !p-0">
                    <SectionHeader title="Best selling products" spacingSm />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {allProducts &&
                        filteredProductsTopProducts.map((item, index) => (
                          <ProductCard key={index} data={item} mobileList />
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="container">
          <Breadcrumb />

          <section className="bg-white sm:py-14 pb-5 px-5">
            <div className="container">
              <div className="grid grid-cols-1 sm:gap-12 gap-5">
                <div>
                  <Alerts large title="Sorry, no page found." noPageUrl />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
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
