import Link from "next/link";
import BannerSliderLarge from "./Components/BannerSliderLarge";
import BannerSliderSmall from "./Components/BannerSliderSmall";
import Images from "./Components/Images";
import ProductSlider from "./Components/ProductSlider";
import SectionHeader from "./Components/SectionHeader";
import Testimonials from "./Components/Testimonials";
import {
  apiUrl,
  homeUrl,
  siteAuthor,
  siteName,
  woocommerceKey,
} from "./Utils/variables";


export default async function Home({ params, searchParams }) {
  let pageData = await fetch(`${apiUrl}wp-json/wp/v2/pages/19`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

  let testimonialdata = await fetch(`${apiUrl}wp-json/wp/v2/testimonials`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

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
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let categoriesData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}`,
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
  let testimonial = await testimonialdata.json();
  let bottomBannerLarge = await bottomBannerLargedata.json();
  let bottomBannerSmall = await bottomBannerSmalldata.json();
  let featuredProducts = await featuredProductsData.json();
  let categories = await categoriesData.json();

  return (
    <div className="container ">
      <section className="pb-0 sm:pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-[70%_30%]">
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
          <SectionHeader title="Featured products" url="/" />
          <ProductSlider data={featuredProducts} />
        </section>
      )}
      <section className="banners-bottom grid sm:gap-12 gap-6 pt-0">
        {bottomBannerLarge &&
          bottomBannerLarge.map((item, index) => (
            <Link key={index} href={`${homeUrl}${item?.slug}`}>
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
          ))}
        <div className="grid md:grid-cols-2 sm:gap-12 gap-6">
          {bottomBannerSmall &&
            bottomBannerSmall.map((item, index) => (
              <div key={index}>
                <Link key={index} href={`${homeUrl}${item?.slug}`}>
                  <Images
                    imageurl={item?.featured_image?.url}
                    quality="100"
                    width="600"
                    height="350"
                    title={item?.featured_image?.alt}
                    alt={item?.featured_image?.alt}
                    classes="block w-full banner sm:h-[350px]"
                    placeholder={true}
                  />
                </Link>
              </div>
            ))}
        </div>
      </section>
      {testimonial.length > 0 && (
        <section className="testimonials text-center border-t">
          <div className="max-w-screen-lg mx-auto gap-7">
            <Testimonials data={testimonial} />
          </div>
        </section>
      )}
      {page?.content?.rendered && (
        <section className="about content border-t sm:pb-14 sm:text-center text-justify">
          <div className="max-w-screen-lg mx-auto [&>*]:opacity-70">
            <div
              dangerouslySetInnerHTML={{
                __html: page?.content?.rendered,
              }}></div>
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  try {
    const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/19`);
    const pageData = await page.json();


    const title = pageData?.yoast_head_json?.title || siteName;
    const description = pageData?.yoast_head_json?.description || "";
    const ogTitle = pageData?.yoast_head_json?.og_title || title;
    const ogDescription = pageData?.yoast_head_json?.og_description || "";
    const canonicalUrl = pageData?.yoast_head_json?.canonical || "";
    const modifiedTime = pageData?.yoast_head_json?.modified_time || "";
    const ogImage = pageData?.yoast_head_json?.og_image || "/favicon.ico"; // Fallback image
    const robots = pageData?.yoast_head_json?.robots || "index, follow"; // Fallback image
    const keywords = pageData?.acf?.seo_keywords || "";
    // Return metadata object dynamically
    return {
      title,
      description,
      author: siteAuthor, // Dynamic author can be added if fetched from the API
      keywords: keywords,
      viewport: "width=device-width, initial-scale=1",
      robots: robots,
      canonical: canonicalUrl,
      og_locale: "en_US",
      og_type: "article",
      og_title: ogTitle,
      og_description: ogDescription,
      og_url: canonicalUrl,
      og_site_name: "Wellness4u",
      article_modified_time: modifiedTime,
      twitter_card: "summary_large_image",
      twitter_misc: {
        "Est. reading time": "1 minute",
      },
      twitter_site: "@yourhandle",
      twitter_creator: "@yourhandle",
      twitter_image: ogImage,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
  }
}


