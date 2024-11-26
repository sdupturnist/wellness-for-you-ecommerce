"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "./Images";
import { homeUrl } from "../Utils/variables";
import Link from "next/link";



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



  const items = data?.map((item, index) => (
   <Link 
   key={index}
   href={`${homeUrl}${item?.slug}`}>
     <Images
    imageurl={item?.featured_image?.url}
    quality="100"
    width="900"
    height="150"
    title={item?.featured_image?.alt}
    alt={item?.featured_image?.alt}
    classes="block w-full h-[150px] banner"
    placeholder={true}
  />
   </Link>
  ));

  return <Slider {...settings}>{items}</Slider>;
}
