'use client'
import { useState } from "react";
import { homeUrl } from "../Utils/variables";
import Images from "./Images";
import Link from "next/link";
import Loading from "./Loading";



export default function HomeLargeBanner({item, index}){

      const [clicked, setClicked] = useState(false);

    return(
         <Link  onClick={(index) => setClicked(!clicked)} href={`${homeUrl}${item?.slug}`} className="relative">
                         {clicked && (
                                   <div className="absolute top-0 bottom-0 left-0 right-0 bg-white z-[9] flex items-center justify-center bg-opacity-90">
                                     <Loading dot classes="size-5" />
                                   </div>
                                 )}
                        <Images
                          imageurl={item?.image?.src}
                          quality="100"
                          width="1500"
                          height="500"
                          title={item?.featured_image?.image?.alt}
                          alt={item?.featured_image?.image?.alt}
                          classes="block w-full banner"
                          placeholder={true}
                        />
                      </Link>
    )
}