import ContactInfo from "../Components/ContactInfo";
import ContactForm from "../Components/Forms/ContactForm";
import Images from "../Components/Images";
import SocialIcons from "../Components/SocialIcons";
import { apiUrl, metaStaticData, siteAuthor } from "../Utils/variables";

export default async function ContactUs() {
  let pageData = await fetch(`${apiUrl}wp-json/wp/v2/pages/32`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

  let page = await pageData.json();

 

  return (
    <div className="bg-white">
      <section className="sm:pt-0">
        <div className="container sm:px-0 w-full min-w-full">
          <Images
            imageurl={page?.featured_image_url}
            quality="100"
            width="2000"
            height="400"
            alt= {page?.title?.rendered}
            classes="block w-full sm:h-[400px] h-[150px] rounded-lg object-cover sm:my-5 sm:w-[98%] mx-auto"
            placeholder={true}
          />

          <div className="container sm:px-5 !px-0 text-center sm:text-start">
            <div className="sm:pt-8 py-5 pb-5 max-w-[767px] mx-auto grid sm:gap-7 gap-3">
              <h1 className="sm:text-3xl text-2xl font-bold">
                {page?.title?.rendered}
              </h1>
              <div
                className="[&>*]:text-base [&>*]:mb-3 border-b border-border pb-5"
                dangerouslySetInnerHTML={{
                  __html: page?.content?.rendered,
                }}
              />
              <div className="grid gap-8 lg:grid-cols-2 mt-4 ">
                <ContactInfo />
                <div className="tf-content-right sm:mt-5 mt-2 lg:mt-0 border-t border-border pt-10 lg:pt-0 lg:border-none">
                  <div className="px-5 sm:px-0">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const pageId = 32;

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
