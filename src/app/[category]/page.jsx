import Alerts from "../Components/Alerts";
import Breadcrumb from "../Components/Breadcrumb";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";
import SectionHeader from "../Components/SectionHeader";
import {
  apiUrl,
  siteAuthor,
  woocommerceKey,
} from "../Utils/variables";


export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  const currentPage = searchParams.page || 1; // Get the current page from the query string, default to 1

  const pageId = 76;

  // Fetch all products for the current page
  let allProductsData = await fetch(
    `${apiUrl}wp-json/wc-custom/v1/products?category=${category}&search=&min_price=0&page=${currentPage}&per_page=1&reviews_count=0`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  // Fetch featured products
  let featuredProductsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&orderby=id&order=desc&featured=true`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  // Fetch top products
  let topProductsData = await fetch(
    `${apiUrl}wp-json/top-products/v1/products`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  // Fetch categories for filters
  let categoriesData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}&orderby=name&order=desc`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  // Parse responses to JSON
  let allProductsDataJson = await allProductsData.json();
  let featuredProductsJson = await featuredProductsData.json();
  let topProductsJson = await topProductsData.json();
  let categoriesJson = await categoriesData.json();

  // Extract necessary data
  const allProducts = allProductsDataJson?.products;
  const totalProducts = allProducts?.length; // Total number of products
  const totalPages = Math.ceil(4); // Calculate total number of pages

  //totalProducts / 30);
 
  return (
    <div className="bg-bggray">
      <Breadcrumb />

      <section className="sm:py-6 py-0">
        <div className="container">
          {allProducts.length > 0 ? (
            <div
              className={`${
                topProductsJson.length > 0 ? "lg:grid-cols-[25%_75%]" : ""
              } grid grid-cols-1 sm:gap-8 gap-5`}>
              {topProductsJson.length > 0 && (
                <div className="w-full lg:pr-7 order-last lg:order-1">
                  <div className="section-header-card">
                    <SectionHeader title="Top rated products" />
                    <div className="products">
                      {topProductsJson.map((item, index) => (
                        <ProductCard key={index} data={item} column />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="grid gap-3 sm:gap-0 w-full lg:order-2 order-first ">
                {featuredProductsJson.length > 0 && (
                  <div className="section-header-card">
                    <SectionHeader
                      title="Featured products"
                      url="/"
                      spacingSm
                    />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {featuredProductsJson.map((item, index) => (
                        <ProductCard key={index} data={item} mobileList />
                      ))}
                    </ul>
                  </div>
                )}
                {allProducts.length > 0 && (
                  <div className="section-header-card">
                    <SectionHeader
                      title="All products"
                      url="/"
                      filter
                      filterData={categoriesJson}
                      spacingSm
                    />
                    <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                      {allProducts.map((item, index) => (
                        <ProductCard key={index} data={item} mobileList />
                      ))}
                    </ul>
                    <Pagination
                      currentPage={parseInt(currentPage, 10)}
                      totalPages={totalPages}
                      baseUrl={`/category/${category}`}
                    />

{  console.log(totalPages)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Alerts large title="Sorry, no products found." noPageUrl />
          )}
        </div>
      </section>
    </div>
  );
}


export async function generateMetadata({ params, searchParams }, parent) {
  const pageId = 76;

  try {
    // Fetch metadata for the page, e.g., SEO-related information
    const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/${pageId}`);
    const pageData = await page.json();

    const title = pageData?.yoast_head_json?.title || siteName;
    const description = pageData?.yoast_head_json?.description || "";
    const ogTitle = pageData?.yoast_head_json?.og_title || title;
    const ogDescription = pageData?.yoast_head_json?.og_description || "";
    const canonicalUrl = pageData?.yoast_head_json?.canonical || "";
    const modifiedTime = pageData?.yoast_head_json?.modified_time || "";
    const ogImage = pageData?.yoast_head_json?.og_image || "/favicon.ico"; // Fallback image
    const robots = pageData?.yoast_head_json?.robots || "index, follow"; // Fallback robots directive
    const keywords = pageData?.acf?.seo_keywords || "";

    // Return dynamic metadata based on the page data
    return {
      title,
      description,
      author: siteAuthor,
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