import { apiUrl, homeUrl, woocommerceKey } from "./Utils/variables";

export default async function sitemap() {
  const pagesResponse = await fetch(`${apiUrl}wp-json/wp/v2/pages`);
  const pages = await pagesResponse.json();

  const postsResponse = await fetch(`${apiUrl}wp-json/wp/v2/posts`);
  const posts = await postsResponse.json();

  const productsResponse = await fetch(
    `${apiUrl}wp-json/wc/v3/products${woocommerceKey}`
  );
  const products = await productsResponse.json();

  const excludedPages = ["my-account", "category", "home"];

  const sitemapData = [
    ...pages
      .filter((page) => !excludedPages.includes(page.slug))
      .map((page) => ({
        url: `${homeUrl}${page.slug}`,
        lastModified: new Date(page.modified),
        changeFrequency: getChangeFrequency(page),
        priority: getPriority(page),
      })),
    ...posts.map((post) => ({
      url: `${homeUrl}blogs/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: getChangeFrequency(post),
      priority: getPriority(post),
    })),
    ...products.map((product) => {
      const categorySlug =
        product.categories && product.categories.length > 0
          ? product.categories[0].slug
          : "uncategorized";

      return {
        url: `${homeUrl}${categorySlug}/${product.slug}`,
        lastModified: new Date(product.date_modified),
        changeFrequency: getChangeFrequency(product),
        priority: getPriority(product),
      };
    }),

    // Static URLs
    {
      url: `${homeUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return sitemapData;
}

function getChangeFrequency(item) {
  if (item.type === "post") {
    return "weekly";
  }
  if (item.type === "product") {
    return "daily";
  }
  return "monthly";
}

function getPriority(item) {
  if (item.type === "post") {
    return 0.7;
  }
  if (item.type === "product") {
    return 0.9;
  }
  return 0.8;
}
