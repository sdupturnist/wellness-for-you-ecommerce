'use client'

import React, { useEffect, useState } from "react";
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

import { apiUrl, convertStringToJSON, currency, homeUrl, metaStaticData, OfferPercentage, siteAuthor, woocommerceKey } from "@/app/Utils/variables";
import Link from "next/link";

export default function SinglePage({ slug, category }) {


  // State to store fetched data
  const [singleProduct, setSingleProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [productReview, setProductReview] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch single product data
        const singleProductResponse = await fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}&slug=${slug}`);
        const [singleProductData] = await singleProductResponse.json();
        setSingleProduct(singleProductData);

        // Fetch related products
        const relatedProductsResponse = await fetch(`${apiUrl}wp-json/wc-custom/v1/products?category=${category}&search=&min_price=0&page=0&per_page=100&reviews_count=0`);
        const relatedProductsData = await relatedProductsResponse.json();
        setRelatedProducts(relatedProductsData.products);

        // Fetch all products
        const allProductsResponse = await fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}`);
        const allProductsData = await allProductsResponse.json();
        setAllProducts(allProductsData);

        // Fetch product reviews
        const productReviewResponse = await fetch(`${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}&product=${singleProductData?.id}`);
        const productReviewData = await productReviewResponse.json();
        setProductReview(productReviewData);

        // Fetch general reviews
        const reviewsResponse = await fetch(`${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        
        setLoading(false); // Set loading to false once all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [slug, category]); // Fetch data when the slug or category changes

  const accordianItems = [
    {
      title: "Description",
      content: singleProduct?.description && <div dangerouslySetInnerHTML={{ __html: singleProduct?.description }} />,
    },
    {
      title: "Specification",
      content: singleProduct?.acf?.specification && <div dangerouslySetInnerHTML={{ __html: singleProduct?.acf?.specification }} />,
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
              <Reviews data={productReview} />
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

  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner or message here
  }

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
                    {singleProduct?.images?.length > 1 ? (
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
                        placeholder={true}
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-7 lg:max-w-[80%]">
                  <div>
                    <div className="grid gap-4 mb-3">
                      <h1>{singleProduct?.name}</h1>
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
                          {singleProduct?.price}
                        </span>
                      )}
                      {singleProduct?.regular_price > 0 && singleProduct?.sale_price && (
                        <div className="flex items-center justify-start gap-3">
                          <span className="normal-price">
                            {currency}
                            {singleProduct?.regular_price}
                          </span>
                          <span className="offer border-l pl-3">
                            <span className="inline-block pr-1">
                              Save {currency}
                              {singleProduct?.regular_price - singleProduct?.sale_price}
                            </span>
                            (
                              <OfferPercentage
                                normalprice={singleProduct?.regular_price}
                                saleprice={singleProduct?.sale_price}
                              />
                            )
                          </span>
                        </div>
                      )}
                    </div>
                    {singleProduct?.short_description && (
                      <div
                        className="content sm:my-10 my-5"
                        dangerouslySetInnerHTML={{
                          __html: singleProduct?.short_description,
                        }}
                      />
                    )}
                    {singleProduct?.price && (
                      <div className="flex gap-3 bg-white">
                        <AddToCart
                          itemid={singleProduct?.id ?? null}
                          price={singleProduct?.sale_price || singleProduct?.price}
                          name={singleProduct?.name}
                          image={singleProduct?.images[0]?.src}
                          options={convertStringToJSON(singleProduct?.acf?.options)}
                          singlePage
                          slug={singleProduct?.slug}
                        />
                      </div>
                    )}
                    <div className="gap-2 sm:inline-flex my-5">
                      {singleProduct?.acf?.features && (
                        <Features
                          data={convertStringToJSON(singleProduct?.acf?.features)}
                        />
                      )}
                    </div>
                    <div>
                      <small className="opacity-50 mb-3 block">Share with</small>
                      <SocialShare
                        url={`${homeUrl}/${singleProduct?.categories[0]?.slug}/${singleProduct?.slug}`}
                        title={singleProduct?.name}
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
                    <SectionHeader title="Frequently bought together" spacingSm />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {relatedProducts.map((item, index) => (
                        <ProductCard key={index} data={item} mobileList />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {allProducts && allProducts.length > 0 && (
                <div className="sm:mt-10 mt-5">
                  <div className="section-header-card !p-0">
                    <SectionHeader title="Best selling products" spacingSm />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {allProducts.map((item, index) => (
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
