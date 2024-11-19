// import { Link } from "react-alice-carousel";
import Images from "./Components/Images";
import ProductSlider from "./Components/ProductSlider";
import SectionHeader from "./Components/SectionHeader";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  const testimonialsData = [
    {
      review:
        "I have been a loyal customer of Wellness4u for years and have never been disappointed with the quality of their products. The staff is always friendly and knowledgeable, and I trust their recommendations for my health and wellness needs.",
      customer: "Priya S",
    },
    {
      review:
        "I have been a loyal customer of Wellness4u for years and have never been disappointed with the quality of their products. The staff is always friendly and knowledgeable, and I trust their recommendations for my health and wellness needs.",
      customer: "Priya S",
    },

    {
      review:
        "I have been a loyal customer of Wellness4u for years and have never been disappointed with the quality of their products. The staff is always friendly and knowledgeable, and I trust their recommendations for my health and wellness needs.",
      customer: "Priya S",
    },

    {
      review:
        "I have been a loyal customer of Wellness4u for years and have never been disappointed with the quality of their products. The staff is always friendly and knowledgeable, and I trust their recommendations for my health and wellness needs.",
      customer: "Priya S",
    },
  ];


  const featuredProductData = [
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },

    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },


    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    {
      product_photo:
        "/images/product.jpg",
      product_title: "Vitaminberry Just For Gut",
      review_count: 3,
      normal_price: 1040,
      sale_price: 989,
      offer: 20,
    },
    
  ];

  return (
    <div className="container">
      <section className="banners-full grid gap-12">
        <Images
          imageurl="/images/banner_6.jpg"
          quality="100"
          width="1500"
          height="500"
          alt="Wellness for you"
          classes="block w-full banner"
          placeholder={true}
        />
        <Images
          imageurl="/images/banner_6.jpg"
          quality="100"
          width="1500"
          height="500"
          alt="Wellness for you"
          classes="block w-full banner"
          placeholder={true}
        />
        <Images
          imageurl="/images/banner_6.jpg"
          quality="100"
          width="1500"
          height="500"
          alt="Wellness for you"
          classes="block w-full banner"
          placeholder={true}
        />
      </section>
      <section className="featured-products pt-0">
        <div className="mb-9">
        <SectionHeader />
        </div>
        <ProductSlider data={featuredProductData}/>
      </section>
      <section className="banners-bottom grid gap-6 pt-0">
        <Images
          imageurl="/images/banner_6.jpg"
          quality="100"
          width="1500"
          height="500"
          alt="Wellness for you"
          classes="block w-full banner"
          placeholder={true}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Images
              imageurl="/images/banner_7.jpg"
              quality="100"
              width="600"
              height="600"
              alt="Wellness for you"
              classes="block w-full banner"
              placeholder={true}
            />
          </div>
          <div>
            <Images
              imageurl="/images/banner_7.jpg"
              quality="100"
              width="600"
              height="600"
              alt="Wellness for you"
              classes="block w-full banner"
              placeholder={true}
            />
          </div>
        </div>
      </section>
      <section className="testimonials text-center border-t">
        <div className="max-w-screen-md mx-auto  gap-7">
          <Testimonials data={testimonialsData} />
        </div>
      </section>
      <section className="about content border-t">
        <h2>Company's Journey</h2>

        <p>
          Wellness4u Food Supplements was founded with a strong passion for
          promoting health and wellness through high-quality nutrition
          supplements and wellness equipment. Our journey began in Kerala,
          India, where we recognized the need for a trusted supplier of wellness
          products that prioritize safety, effectiveness, and affordability.
        </p>
        <h2>Purpose and Goals</h2>
        <p>
          Wellness4u Food Supplements was founded with a strong passion for
          promoting health and wellness through high-quality nutrition
          supplements and wellness equipment. Our journey began in Kerala,
          India, where we recognized the need for a trusted supplier of wellness
          products that prioritize safety, effectiveness, and affordability.
        </p>
        <h2>Introduction to the Team</h2>
        <p>
          Wellness4u Food Supplements was founded with a strong passion for
          promoting health and wellness through high-quality nutrition
          supplements and wellness equipment. Our journey began in Kerala,
          India, where we recognized the need for a trusted supplier of wellness
          products that prioritize safety, effectiveness, and affordability.
        </p>
        <h2>Offerings</h2>
        <p>
          Wellness4u Food Supplements was founded with a strong passion for
          promoting health and wellness through high-quality nutrition
          supplements and wellness equipment. Our journey began in Kerala,
          India, where we recognized the need for a trusted supplier of wellness
          products that prioritize safety, effectiveness, and affordability.
        </p>
      </section>
    </div>
  );
}
