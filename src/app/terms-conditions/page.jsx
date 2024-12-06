import { apiUrl } from "../Utils/variables";

export default async function Terms() {
  let pageData = await fetch(`${apiUrl}wp-json/wp/v2/pages/36`, {
    next: {
      revalidate: 60,
      cache: "no-store",
    },
  });

  let page = await pageData.json();

  return (
    <div>
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 xxl:max-w-[1199px] max-w-[767px] mx-auto grid sm:gap-7 gap-5">
              <h1 className="sm:text-3xl text-2xl font-bold text-start !leading-[1.3]">
                {page?.title?.rendered}
              </h1>

              <div
                className="content text-justify"
                dangerouslySetInnerHTML={{
                  __html: page && page?.content?.rendered,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
