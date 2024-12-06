import Card from "@/app/Components/Card";
import Images from "@/app/Components/Images";
import SectionHeader from "@/app/Components/SectionHeader";
import {
  apiUrl,
  formatDate,
  homeUrl,
  metaStaticData,
} from "@/app/Utils/variables";



export default async function BlogSingle({ params }) {
  const { slug } = params;

  let blogData = await fetch(`${apiUrl}wp-json/wp/v2/posts?slug=${slug}`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

  let blog_ = await blogData.json();

  const blog = blog_[0];

  let blogsData = await fetch(
    `${apiUrl}wp-json/wp/v2/posts?per_page=4&exclude=${blog?.id}`,
    {
      next: {
        revalidate: 60,
        cache: "no-store",
      },
    }
  );

  let blogs = await blogsData.json();

  return (
    <div>
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 xxl:max-w-[1199px] max-w-[767px] mx-auto grid sm:gap-7 gap-5">
              <h1 className="sm:text-3xl text-2xl font-bold text-start !leading-[1.3]">
                {blog?.title?.rendered}
              </h1>
              <Images
                imageurl={blog?.featured_image_url}
                quality="100"
                width="600"
                height="400"
                title={blog?.title?.rendered}
                alt={blog?.title?.rendered}
                classes="block w-full sm:h-[400px] object-cover rounded-lg"
                placeholder={true}
              />
              <div>
                <p className="opacity-50 text-sm">
                  Admin <span className="text-sm mx-1 opacity-50">|</span>{" "}
                  {formatDate(blog?.date)}
                </p>
              </div>
              <div
                className={`blog-content text-justify ${
                  blogs && blogs.length >= 1 && "border-b pb-8"
                }`}
                dangerouslySetInnerHTML={{
                  __html: blog && blog?.content?.rendered,
                }}
              />

              {blogs && blogs.length >= 1 && (
                <>
                  <SectionHeader
                    title="More blogs"
                    spacingSm
                    url={`${homeUrl}blogs`}
                  />
                  <div className="grid sm:grid-cols-2 sm:gap-8 gap-5">
                    {blogs &&
                      blogs.map((item, index) => (
                        <Card
                          key={index}
                          thumbnail={item?.featured_image_url}
                          alt={item?.title?.rendered}
                          heading={item?.title?.rendered}
                          desc={item?.content?.rendered}
                          date={formatDate(item?.date)}
                          author="Admin"
                          url={`${homeUrl}blogs/${item?.slug}`}
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const staticData = metaStaticData;
  const { slug } = params;

  try {
    const page = await fetch(`${apiUrl}wp-json/wc/v3/posts?slug=${slug}`);
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
