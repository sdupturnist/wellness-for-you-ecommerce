"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import { Link } from "react-alice-carousel";

export default function BannerSliderSmall({ data, url }) {
  const settings = {
    dots: false, // Show navigation dots
    arrows: false,
    infinite: true, // Infinite looping
    speed: 500, // Slide transition speed in ms
    slidesToShow: 1, // Display one testimonial at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
  };
  const items = data?.map((item, index) =>
    item?.acf?.url !== null ? (
      <Link key={index} href={item?.acf?.url || homeUrl}>
        <Images
          imageurl={item?.featured_image?.url}
          quality="100"
          width="500"
          height="250"
          title={item?.featured_image?.alt}
          alt={item?.featured_image?.alt}
          classes="block w-full banner"
          placeholder={true}
        />
      </Link>
    ) : (
      <Images
        key={index}
        imageurl={item?.featured_image?.url}
        quality="100"
        width="500"
        height="250"
        title={item?.featured_image?.alt}
        alt={item?.featured_image?.alt}
        classes="block w-full banner"
        placeholder={true}
      />
    )
  );

  return <Slider {...settings}>{items}</Slider>;
}
