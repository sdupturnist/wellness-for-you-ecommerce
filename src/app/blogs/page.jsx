import Pagination from "../Components/Pagination";
import Card from "../Components/Card";
import { apiUrl, homeUrl, siteAuthor } from "../Utils/variables";

export default function Blogs() {
  return (
    <div className="bg-bggray">
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 max-w-[999px] mx-auto grid sm:gap-7 gap-5">
              <h1 className="sm:text-3xl text-2xl font-bold text-center">
                Blogs
              </h1>
              <div className="grid sm:grid-cols-2 sm:gap-8 gap-5">
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
                <Card
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url={`${homeUrl}blogs/test-blog`}
                />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


// export async function generateMetadata({ params, searchParams }, parent) {
//   try {
//     const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/19`);
//     const pageData = await page.json();


//     const title = pageData?.yoast_head_json?.title || siteName;
//     const description = pageData?.yoast_head_json?.description || "";
//     const ogTitle = pageData?.yoast_head_json?.og_title || title;
//     const ogDescription = pageData?.yoast_head_json?.og_description || "";
//     const canonicalUrl = pageData?.yoast_head_json?.canonical || "";
//     const modifiedTime = pageData?.yoast_head_json?.modified_time || "";
//     const ogImage = pageData?.yoast_head_json?.og_image || "/favicon.ico"; // Fallback image
//     const robots = pageData?.yoast_head_json?.robots || "index, follow"; // Fallback image
//     const keywords = pageData?.acf?.seo_keywords || "";
//     // Return metadata object dynamically
//     return {
//       title,
//       description,
//       author: siteAuthor, // Dynamic author can be added if fetched from the API
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
