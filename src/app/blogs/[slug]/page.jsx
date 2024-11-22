import Card from "@/app/Components/Card";
import Images from "@/app/Components/Images";
import SectionHeader from "@/app/Components/SectionHeader";
import { homeUrl } from "@/app/Utils/variables";

export default function BlogSingle() {
  return (
    <div>
      <section className="pt-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="container">
            <div className="sm:pt-8 py-5 pb-5 xxl:max-w-[1199px] max-w-[767px] mx-auto grid sm:gap-7 gap-5">
              <h1 className="sm:text-3xl text-2xl font-bold text-start !leading-[1.3]">
              If a dog chews shoes whose shoes does he choose?  If a dog chews shoes whose shoes does he choose?
              </h1>
              <Images
                imageurl="/images/banner_6.jpg"
                quality="80"
                width="600"
                height="400"
                title="test"
                alt="test"
                classes="block w-full h-[400px] object-cover rounded-lg"
                placeholder={true}
              />
                <div>
                  <p className="opacity-50 text-sm">
                    Admin <span className="text-sm mx-1 opacity-50">|</span> Nov
                    24, 2024
                  </p>
                </div>
              <div className="content text-justify border-b pb-8">
                <h2>Company&apos;s Journey</h2>
                <p>
                  Wellness4u Food Supplements was founded with a strong passion
                  for promoting health and wellness through high-quality
                  nutrition supplements and wellness equipment. Our journey
                  began in Kerala, India, where we recognized the need for a
                  trusted supplier of wellness products that prioritize safety,
                  effectiveness, and affordability.
                </p>

                <h2>Purpose and Goals</h2>
                <p>
                  Our primary goal at Wellness4u Food Supplements is to provide
                  our customers with a wide selection of nutrition supplements
                  and wellness equipment that have been rigorously tested for
                  both quality and safety. We strive to offer products that not
                  only enhance overall health and well-being but also empower
                  individuals to take control of their own wellness journey.
                </p>

                <h2>Introduction to the Team</h2>
                <p>
                  Our dedicated team at Wellness4u Food Supplements is comprised
                  of experienced professionals in the health and wellness
                  industry. From nutritionists to fitness experts, we are
                  committed to delivering exceptional customer service and
                  expert guidance to help our customers make informed decisions
                  about their health.
                </p>
                <Images
                  imageurl="/images/banner_6.jpg"
                  quality="80"
                  width="600"
                  height="400"
                  title="test"
                  alt="test"
                  classes="block w-full"
                  placeholder={true}
                />
                <h2>Offerings</h2>
                <p>
                  At Wellness4u Food Supplements, we take pride in offering a
                  diverse range of nutrition supplements and wellness equipment
                  to meet the unique needs of our customers. Whether you are
                  looking to boost your immune system, improve your energy
                  levels, or enhance your workout routine, we have the perfect
                  solution for you. Our products are sourced from reputable
                  manufacturers and undergo stringent quality control measures
                  to ensure efficacy and safety.
                </p>

                <h2>Our Certification</h2>
                <h3>FSSAI – Food Safety and Standards Authority of India</h3>
                <p>
                  FSSAI stands for Food Safety and Standards Authority of India,
                  an organization that monitors and governs the food business in
                  India. It is an autonomous body established under the Ministry
                  of Health & Family Welfare, Government of India.
                </p>
              
              </div>

              <SectionHeader title="More blogs" spacingSm url={`${homeUrl}blogs`} />
              <div className="grid sm:grid-cols-2 sm:gap-8 gap-5">
                <Card
                small
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url="/"
                />
                <Card
                small
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url="/"
                />
                <Card
                small
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url="/"
                />
                <Card
                small
                  thumbnail="/images/banner_6.jpg"
                  alt="test"
                  heading="Shoes!"
                  desc="If a dog chews shoes whose shoes does he choose?"
                  date="Nov 24, 2024"
                  author="Admin"
                  url="/"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
