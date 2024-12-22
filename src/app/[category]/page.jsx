
import Breadcrumb from "../Components/Breadcrumb";
import ProductWrapper from "../Components/ProductWrapper";
import {
  apiUrl,
  siteAuthor,
} from "../Utils/variables";

export default async function CategoryPage({ params, searchParams }) {

  const { category } = params;

  return (
    <main>
      <div className="bg-bggray">
        <div className="container">
          <Breadcrumb />
          <section className="sm:pb-6 py-0">
            <div className="container">
             <ProductWrapper searchParams={searchParams} category={category}/>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

// export async function generateMetadata({ params, searchParams }, parent) {
//   const pageId = 76;

//   try {
//     // Fetch metadata for the page, e.g., SEO-related information
//     const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/${pageId}`);
//     const pageData = await page.json();

//     const title = pageData?.yoast_head_json?.title || siteName;
//     const description = pageData?.yoast_head_json?.description || "";
//     const ogTitle = pageData?.yoast_head_json?.og_title || title;
//     const ogDescription = pageData?.yoast_head_json?.og_description || "";
//     const canonicalUrl = pageData?.yoast_head_json?.canonical || "";
//     const modifiedTime = pageData?.yoast_head_json?.modified_time || "";
//     const ogImage = pageData?.yoast_head_json?.og_image || "/favicon.ico"; // Fallback image
//     const robots = pageData?.yoast_head_json?.robots || "index, follow"; // Fallback robots directive
//     const keywords = pageData?.acf?.seo_keywords || "";

//     // Return dynamic metadata based on the page data
//     return {
//       title,
//       description,
//       author: siteAuthor,
//       keywords: keywords,
//       viewport: "width=device-width, initial-scale=1",
//       robots: robots,
//       canonical: canonicalUrl,
//       og_locale: "en_US",
//       og_type: "article",
//       og_title: ogTitle,
//       og_description: ogDescription,
//       og_url: canonicalUrl,
//       og_site_name: "Wellness4u",
//       article_modified_time: modifiedTime,
//       twitter_card: "summary_large_image",
//       twitter_misc: {
//         "Est. reading time": "1 minute",
//       },
//       twitter_site: "@yourhandle",
//       twitter_creator: "@yourhandle",
//       twitter_image: ogImage,
//     };
//   } catch (error) {
//     console.error("Error fetching page data:", error);
//   }
// }
