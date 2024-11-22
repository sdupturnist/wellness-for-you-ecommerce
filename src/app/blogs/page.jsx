import Pagination from "../Components/Pagination";
import Card from "../Components/Card";
import { homeUrl } from "../Utils/variables";

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
