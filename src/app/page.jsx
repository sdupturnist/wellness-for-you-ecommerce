import Link from "next/link";
import BannerSliderLarge from "./Components/BannerSliderLarge";
import BannerSliderSmall from "./Components/BannerSliderSmall";
import Images from "./Components/Images";
import SectionHeader from "./Components/SectionHeader";
import Testimonials from "./Components/Testimonials";
import {
  apiUrl,
  homeUrl,
  metaStaticData,
  siteAuthor,
  siteName,
  woocommerceKey,
} from "./Utils/variables";
import ProductCard from "./Components/ProductCard";
import ProductGrid from "./Components/ProductGrid";
import FloatingIcons from "./Components/FloatingIcons";

export default async function Home({ params, searchParams }) {
  const pageId = 19;

  let pageData = await fetch(`${apiUrl}wp-json/wp/v2/pages/${pageId}`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

  // let testimonialdata = await fetch(`${apiUrl}wp-json/wp/v2/testimonials`, {
  //   next: {
  //     revalidate: 60,
  //     cache: "no-store",
  //   },
  // });

  let topBannerLargedata = await fetch(
    `${apiUrl}wp-json/wp/v2/home-slider-banner-b`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let topBannerSmalldata = await fetch(
    `${apiUrl}wp-json/wp/v2/home-slider-banner-s`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let bottomBannerLargedata = await fetch(
    `${apiUrl}wp-json/wp/v2/home-bottom-banner-b`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let bottomBannerSmalldata = await fetch(
    `${apiUrl}wp-json/wp/v2/home-bottom-banner-s`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let featuredProductsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&orderby=id&order=desc&featured=true`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let categoriesData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}&orderby=name&order=desc`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let page = await pageData.json();
  let topBannerLarge = await topBannerLargedata.json();
  let topBannerSmall = await topBannerSmalldata.json();
  // let testimonial = await testimonialdata.json();
  let bottomBannerLarge = await bottomBannerLargedata.json();
  let bottomBannerSmall = await bottomBannerSmalldata.json();
  let featuredProducts = await featuredProductsData.json();
  let categories = await categoriesData.json();

  return (
    <>
      <div className="container">
        <section className="pb-0 sm:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
            {topBannerLarge && (
              <div className="w-full lg:pr-7">
                <BannerSliderLarge data={topBannerLarge} />
              </div>
            )}
            {topBannerSmall && (
              <div className="lg:block hidden w-full">
                <BannerSliderSmall data={topBannerSmall} />
              </div>
            )}
          </div>
        </section>
        <section className="banners-full grid sm:gap-12 gap-6 pt-6 sm:pt-10">
          {categories &&
            categories.map((item, index) => (
              <Link key={index} href={`${homeUrl}${item?.slug}`}>
                <Images
                  imageurl={item?.image?.src}
                  quality="100"
                  width="1500"
                  height="500"
                  title={item?.featured_image?.image?.alt}
                  alt={item?.featured_image?.image?.alt}
                  classes="block w-full banner"
                  placeholder={true}
                />
              </Link>
            ))}
        </section>
        {featuredProducts.length > 0 && (
          <section className="featured-products products pt-0">
            <SectionHeader title="Featured products" />

            <ProductGrid items={featuredProducts} />

            {/* <ProductSlider data={featuredProducts} /> */}
          </section>
        )}
        <section className="banners-bottom grid sm:gap-12 gap-6 pt-0">
          {bottomBannerLarge &&
            bottomBannerLarge.map((item, index) =>
              item?.acf?.url !== "" ? (
                <Link key={index} href={item?.acf?.url || homeUrl}>
                  <Images
                    imageurl={item?.featured_image?.url}
                    quality="100"
                    width="1500"
                    height="500"
                    title={item?.featured_image?.alt}
                    alt={item?.featured_image?.alt}
                    classes="block w-full banner"
                    placeholder={true}
                  />
                </Link>
              ) : (
                <Images
                  key={index}
                  imageurl={item?.featured_image?.url}
                  quality="100"
                  width="1500"
                  height="500"
                  title={item?.featured_image?.alt}
                  alt={item?.featured_image?.alt}
                  classes="block w-full banner"
                  placeholder={true}
                />
              )
            )}
          <div className="grid md:grid-cols-2 sm:gap-12 gap-6">
            {bottomBannerSmall &&
              bottomBannerSmall.map((item, index) =>
                item?.acf?.url !== "" ? (
                  <div key={index}>
                    <Link href={item?.acf?.url || homeUrl}>
                      <Images
                        imageurl={item?.featured_image?.url}
                        quality="100"
                        width="600"
                        height="350"
                        title={item?.featured_image?.alt}
                        alt={item?.featured_image?.alt}
                        classes="block w-full banner"
                        placeholder={true}
                      />
                    </Link>
                  </div>
                ) : (
                  <div key={index}>
                    <Images
                      key={index}
                      imageurl={item?.featured_image?.url}
                      quality="100"
                      width="600"
                      height="350"
                      title={item?.featured_image?.alt}
                      alt={item?.featured_image?.alt}
                      classes="block w-full banner"
                      placeholder={true}
                    />
                  </div>
                )
              )}
          </div>
        </section>
        {/* {testimonial.length > 0 && ( */}
        {/* <section className="testimonials text-center border-t"> */}
        {/* <div className="max-w-screen-lg mx-auto gap-7"> */}
        {/* <Testimonials data={testimonial} /> */}
        {/* </div> */}
        {/* </section> */}
        {/* )} */}
        {page?.content?.rendered && (
          <section className="about content border-t sm:pb-14 text-center">
            <div className="max-w-screen-lg mx-auto [&>*]:opacity-70 sm:[&>*]:text-[14px] [&>*]:text-[13px] [&>*]:leading-[1.7]">
              <div
                dangerouslySetInnerHTML={{
                  __html: page?.content?.rendered,
                }}></div>
            </div>
          </section>
        )}
      </div>
      <FloatingIcons />
    </>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const pageId = 19;

  const staticData = metaStaticData;

  try {
    const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/${pageId}`);
    const pageData = await page.json();

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
