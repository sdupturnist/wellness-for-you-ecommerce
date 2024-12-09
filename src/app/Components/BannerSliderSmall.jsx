"use client";
import Slider from "react-slick";
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import { Link } from "react-alice-carousel";

export default function BannerSliderSmall({ data, url }) {
  const settings = {
    dots: false, // Show navigation dots
    arrows: false, // Hide arrows
    infinite: true, // Infinite loop for continuous scrolling
    speed: 500, // Slide transition speed in ms
    slidesToShow: 1, // Display one testimonial at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in ms
    pauseOnHover: true, // Pause autoplay when hovered
  };
  const items = data?.map((item, index) =>
    item?.acf?.url !== null || item?.acf?.url !== '' ? (
      <Link key={index} href={item?.acf?.url || homeUrl}>
        <Images
          imageurl={item?.featured_image?.url}
          quality="100"
          width="400"
          height="200"
          title={item?.featured_image?.alt}
          alt={item?.featured_image?.alt}
          classes="block  banner"
          placeholder={true}
        />
      </Link>
    ) : (
      
      <Images
        key={index}
        imageurl={item?.featured_image?.url}
        quality="100"
        width="400"
        height="200"
        title={item?.featured_image?.alt}
        alt={item?.featured_image?.alt}
        classes="block  banner"
        placeholder={true}
      />
    )
  );

  return <Slider {...settings}>{items}</Slider>;
}
