"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import { Link } from "react-alice-carousel";
import { StarIcon } from "@heroicons/react/24/solid";

export default function ProductSlider({ data }) {
  const settings = {
    dots: false, // Show navigation dots
    infinite: false, // Infinite looping
    speed: 500, // Slide transition speed in ms
    slidesToShow: 5, // Display one testimonial at a time
    slidesToScroll: 5, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            centerPadding: "15px", // Adjust space for smaller screens
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "10px", // Adjust space for mobile screens
          },
        },
      ], // Time between slides in ms
    
  };

  const items = data.map((item, index) => (
    <div key={index} className="product-card mr-8">
      <Link href={homeUrl}>
        <Images
          imageurl={item?.product_photo}
          quality="100"
          width="150"
          height="150"
          alt="Wellness for you"
          classes="block size-[150px] m-[15px] mx-auto"
          placeholder={true}
        />
        <div className="p-4 pt-0">
          <h3 className="product-title text-dark mb-2">
            {item?.product_title}
          </h3>
          {item?.review_count > 0 && (
            <small className="flex items-center gap-1 text-body mb-2">
              <StarIcon className="size-3 text-yellow" />
              <span className="opacity-50">{item?.review_count} Review</span>
            </small>
          )}
          <span className="product-price">₹{item?.sale_price}</span>
          <div>
            <span className="product-price-regular">₹{item?.normal_price}</span>
            <span className="product-offer ml-2">₹{item?.offer}</span>
          </div>
          <button className="btn mt-3">
            add
          </button>
        </div>
      </Link>
    </div>
  ));

  return <Slider {...settings}>{items}</Slider>;
}
