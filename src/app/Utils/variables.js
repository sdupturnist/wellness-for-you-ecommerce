const date = new Date();


//WOOCOMMERECE KEY

export let woocommerceKey = '?consumer_key=ck_c10388e89a3e74feeaf32ec349bf9f810f8071bc&consumer_secret=cs_48ef9b20fbd7ca0883b3cb20e9cd0d78398f3d03'


//URL'S
export let homeUrl = process.env.NEXT_PUBLIC_SITE_URL;
export let apiUrl = process.env.NEXT_PUBLIC_API_URL;

export let year = date.getFullYear();

export let siteName = 'wellness4u'
export let siteAuthor = 'wellness4u admin'


//OFFER PERCENTAGE
export let OfferPercentage = ({ normalprice, saleprice }) => {
  let normalPrice = normalprice;
  let salePrice = saleprice;

  let discountPercentage = Math.round(
    ((normalPrice - salePrice) / normalPrice) * 100
  );

  return discountPercentage; // Or any message you want to return
};


//CURRENCY

export let currency = '₹'



//META TAG


export async function generateMetadata({ params, searchParams }, parent, { pageId, apiUrl, siteAuthor = "Wellness4u", defaultMetadata = {} } = {}) {
  try {
    // Fetch the page data using the provided pageId and apiUrl
    const page = await fetch(`${apiUrl}wp-json/wp/v2/pages/${pageId}`);
    if (!page.ok) {
      throw new Error('Failed to fetch data');
    }
    const pageData = await page.json();
    
    // Log the fetched data for debugging purposes
    console.log('Page Data:', pageData?.yoast_head_json);

    // Extract metadata from Yoast SEO fields or use default values
    const title = pageData?.yoast_head_json?.title || defaultMetadata.title || "Home - Wellness4u";
    const description = pageData?.yoast_head_json?.description || defaultMetadata.description || "Wellness4u Food Supplements was founded with a strong passion for promoting health and wellness through high-quality nutrition supplements and wellness equipment.";
    const ogTitle = pageData?.yoast_head_json?.og_title || defaultMetadata.ogTitle || title;
    const ogDescription = pageData?.yoast_head_json?.og_description || defaultMetadata.ogDescription || description;
    const canonicalUrl = pageData?.yoast_head_json?.canonical || defaultMetadata.canonicalUrl || "https://admin.wellness4u.in/home/";
    const modifiedTime = pageData?.yoast_head_json?.modified_time || defaultMetadata.modifiedTime || "2024-11-23T10:14:07+00:00";
    const ogImage = pageData?.yoast_head_json?.og_image || defaultMetadata.ogImage || "/path-to-image.jpg"; // Fallback image
    const robots = pageData?.yoast_head_json?.robots || defaultMetadata.robots || "index, follow"; // Fallback robots

    // Return the metadata dynamically
    return {
      title,
      description,
      author: siteAuthor, // Dynamic author if fetched or passed as a prop
      keywords: defaultMetadata.keywords || "Next.js, React, JavaScript, App, Web Development",
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
        "Est. reading time": "1 minute"
      },
      twitter_site: defaultMetadata.twitterSite || "@yourhandle",
      twitter_creator: defaultMetadata.twitterCreator || "@yourhandle",
      twitter_image: ogImage,
     };
  } catch (error) {
    console.error('Error fetching page data:', error);
    // Return default metadata in case of failure
    return {
      title: "Home - Wellness4u",
      description: "Wellness4u Food Supplements was founded with a strong passion for promoting health and wellness through high-quality nutrition supplements and wellness equipment.",
      author: siteAuthor,
      keywords: "Next.js, React, JavaScript, App, Web Development",
      viewport: "width=device-width, initial-scale=1",
      robots: "index, follow",
      canonical: "https://admin.wellness4u.in/home/",
      og_locale: "en_US",
      og_type: "article",
      og_title: "Home - Wellness4u",
      og_description: "Wellness4u Food Supplements was founded with a strong passion for promoting health and wellness through high-quality nutrition supplements and wellness equipment.",
      og_url: "https://admin.wellness4u.in/home/",
      og_site_name: "Wellness4u",
      article_modified_time: "2024-11-23T10:14:07+00:00",
      twitter_card: "summary_large_image",
      twitter_misc: {
        "Est. reading time": "1 minute"
      },
      twitter_site: "@yourhandle",
      twitter_creator: "@yourhandle",
      twitter_image: "/path-to-image.jpg",
    };
  }
}
