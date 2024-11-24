'use client'

import Images from "./Images"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function ImageSlider({data}){


    const settings = {
        dots: true, // Show navigation dots
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
        imageurl={item?.src || ''}
        quality="100"
        width="500"
        height="500"
        title={item?.alt || 'Icon'}
        alt={item?.alt || 'Icon'}
        classes="block w-full max-w-[500px] mx-auto"
        placeholder={true}
      />
       ));



      return <Slider {...settings}>{items}</Slider>;



  
}


