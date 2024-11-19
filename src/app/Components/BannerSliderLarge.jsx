"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "./Images";


export default function BannerSliderLarge({ data }) {
  const settings = {
    dots: false, // Show navigation dots
    arrows:false,
    infinite: false, // Infinite looping
    speed: 500, // Slide transition speed in ms
    slidesToShow: 1, // Display one testimonial at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
  
    
  };

  const items = data.map((item, index) => (
    <Images
    key={index}
    imageurl={item?.product_photo}
    quality="100"
    width="900"
    height="150"
    title={item?.product_title}
    alt={item?.product_title}
    classes="block w-full h-[150px] banner"
    placeholder={true}
  />
  ));

  return <Slider {...settings}>{items}</Slider>;
}
