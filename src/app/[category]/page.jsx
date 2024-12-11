import Alerts from "../Components/Alerts";
import Breadcrumb from "../Components/Breadcrumb";
import Pagination from "../Components/Pagination";
import ProductCard from "../Components/ProductCard";
import ProductGrid from "../Components/ProductGrid";
import SectionHeader from "../Components/SectionHeader";
import {
  apiUrl,
  homeUrl,
  siteAuthor,
  woocommerceKey,
} from "../Utils/variables";

export default async function CategoryPage({ params, searchParams }) {
  const { category } = params;
  const currentPage = searchParams.page || 1;

  const pageId = 76;
  const itemsShowPerPage = 30;

  // Fetch all products for the current page
  let allProductsData = await fetch(
    `${apiUrl}wp-json/wc-custom/v1/products?sort_by_acf=asc&category=${category}&search=&min_price=0&page=${currentPage}&per_page=${itemsShowPerPage}&reviews_count=0`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  let allProductsDataCount = await fetch(
    `${apiUrl}wp-json/wc-custom/v1/products?category=${category}&search=&min_price=0&page=0&per_page=100&reviews_count=0`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  // Fetch featured products
  let featuredProductsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&orderby=id&order=desc&featured=true`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  let reviewsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/reviews${woocommerceKey}`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  // Fetch categories for filters
  let categoriesData = await fetch(
    `${apiUrl}wp-json/wc/v3/products/categories${woocommerceKey}&orderby=name&order=desc`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  // TOP products
  let topProductsData = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}&orderby=id&order=desc`,
    {
      next: {
        revalidate: 1,
        cache: "no-store",
      },
    }
  );

  // Parse responses to JSON
  let topProductsDataJson = await topProductsData.json();
  let allProductsDataJson = await allProductsData.json();
  let featuredProductsJson = await featuredProductsData.json();
  let reviews = await reviewsData.json();
  let categoriesJson = await categoriesData.json();
  let allProductsCount = await allProductsDataCount.json();

  // Extract necessary data
  const allProducts = allProductsDataJson?.products;
  const totalProductsCount = allProductsCount?.products ?? [];
  const totalProducts = totalProductsCount?.length ?? [];
  const totalPages = Math.ceil(totalProducts / itemsShowPerPage);

  // Filter the products based on matching product_id from the reviews
  // const filteredProductsTopProducts =
  //   allProducts &&
  //   allProducts.filter((product) =>
  //     reviews.some((review) => review.product_id === product.id)
  //   );

  const filteredProductsTopProducts =
    topProductsDataJson &&
    topProductsDataJson.filter(
      (product) => product.acf && product.acf.top === true
    );

  return (
    <main>
      <div className="bg-bggray">
        <div className="container">
          <Breadcrumb />
          <section className="sm:pb-6 py-0">
            <div className="container">
              {allProducts.length > 0 ? (
                <div className={`grid grid-cols-1 sm:gap-5 gap-5`}>
                  <div className="grid gap-3 sm:gap-0 w-full xl:order-2 order-first ">
                    {allProducts.length > 0 && (
                      <div className="section-header-card">
                        <SectionHeader
                          title="All products"
                          url="/"
                          filter
                          filterData={categoriesJson}
                          spacingSm
                        />
                        <ProductGrid items={allProducts} />
                        <Pagination
                          currentPage={parseInt(currentPage, 10)}
                          totalPages={totalPages}
                          baseUrl={`${category}`}
                          itemsShowPerPage={itemsShowPerPage}
                        />
                      </div>
                    )}
                    {filteredProductsTopProducts.length > 0 && (
                      <div className="section-header-card">
                        <SectionHeader title="Best selling Product" spacingSm />
                        <ProductGrid items={filteredProductsTopProducts} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Alerts
                  large
                  title="Sorry, No products Found"
                  noPageUrl
                  url={homeUrl}
                  buttonLabel="Return to home"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
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
