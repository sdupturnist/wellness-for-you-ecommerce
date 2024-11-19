"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

export default function ProductSlider({ data }) {
  const settings = {
    dots: false, // Show navigation dots
    arrows:false,
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
            slidesToShow: 2,
            slidesToScroll: 2,
            centerPadding: "15px", // Adjust space for smaller screens
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            centerPadding: "10px", // Adjust space for mobile screens
          },
        },
      ], // Time between slides in ms
    
  };

  const items = data.map((item, index) => (
    <ProductCard key={index} data={item}/>
  ));

  return <Slider {...settings}>{items}</Slider>;
}
