export default function RefundPolicy() {
  return (
    <div>
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 xxl:max-w-[1199px] max-w-[767px] mx-auto grid sm:gap-7 gap-5">
              <h1 className="sm:text-3xl text-2xl font-bold text-start !leading-[1.3]">
                Return And Refund Policy
              </h1>

              <div className="content text-justify">
                <h1>Return and Refund Policy at Wellness4U</h1>

                <p>
                  At Wellness4U, we want you to be completely satisfied with
                  your purchase. If you&apos;re not happy with your order for any
                  reason, we offer a straightforward return and refund policy to
                  ensure your peace of mind. Please review the following
                  guidelines carefully:
                </p>

                <h2>1. Returns Eligibility</h2>
                <p>
                  We accept returns for most unused and unopened products within
                  07 days of the delivery date. To be eligible for a return, the
                  item must be in its original packaging and in the same
                  condition as when you received it.
                </p>

                <h2>2. Return Process</h2>
                <p>
                  To initiate a return, please contact our customer service team
                  with your order number and details of the item(s) you wish to
                  return. We will provide you with instructions on how to
                  proceed with the return.
                </p>

                <h2>3. Return Shipping</h2>
                <p>
                  Customers are responsible for the return shipping costs unless
                  the return is due to an error on our part or a defective
                  product.
                </p>

                <h2>4. Refund Processing</h2>
                <p>
                  Once we receive your returned item, our team will inspect it
                  to ensure that it meets our return eligibility criteria. Upon
                  approval, we will process your refund to the original method
                  of payment within 5-7 business days.
                </p>

                <h2>5. Refund Amount</h2>
                <p>
                  The refund amount will be for the original purchase price of
                  the item(s) returned, minus any applicable restocking fees or
                  return shipping charges.
                </p>

                <h2>6. Restocking Fees</h2>
                <p>
                  In some cases, a restocking fee may apply to returns. This fee
                  covers the cost of processing and restocking the returned
                  item(s). The amount of the restocking fee, if applicable, will
                  be deducted from your refund.
                </p>

                <h2>7. Refunds for Promotional Items or Combo items</h2>
                <p>
                  If your purchase included a promotional item or a gift with
                  the purchase, the value of the promotional item will be
                  deducted from your refund if the promotional item is not
                  returned with the qualifying purchase in its original
                  condition.
                </p>

                <h2>8. Refunds for Combo items</h2>
                <p>
                  If your purchase included a combo offer item or a gift with
                  purchase, the value of the combo offer item will be deducted
                  from your refund if the combo offer item is not returned along
                  with the qualifying purchase in its original condition.
                </p>

                <h2>9. Exchanges</h2>
                <p>
                  Unfortunately, we do not offer direct exchanges at this time.
                  If you would like to exchange an item for a different size,
                  flavor, or product, please follow the return process outlined
                  above and place a new order for the desired item.
                </p>

                <h2>10. Damaged or Defective Products</h2>
                <p>
                  If you receive a damaged or defective product, please contact
                  us immediately. We will arrange for a replacement or refund,
                  depending on your preference, and provide instructions on
                  returning the damaged or defective item.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions or concerns regarding our return and
                  refund policy, please don&apos;t hesitate to reach out to our
                  customer service team at{" "}
                  <a href="mailto:care@wellness4u.in">care@wellness4u.in</a>. We
                  are here to assist you and ensure that you have a positive
                  shopping experience with Wellness4U.
                </p>

                <p>
                  <strong>Note:</strong> This return and refund policy is
                  subject to change without prior notice. Please refer to the
                  most recent version on our website for any updates or
                  revisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



export async function generateMetadata({ params, searchParams }, parent) {
  
  const pageId = 34;

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
