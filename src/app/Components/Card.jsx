"use client";

import Link from "next/link";
import Images from "./Images";
import { truncateText } from "../Utils/variables";

export default function Card({
    thumbnail,
    alt,
    heading,
    desc,
    url,
    date,
    author,
    small
}) {
  return (
    <div className="card !p-0 card-compact bg-base-100 hover:shadow-xl transition-all overflow-hidden">
      <Link href={url && url}>
        <Images
            imageurl={thumbnail && thumbnail}
            quality="80"
            width="300"
            height="300"
            title={alt && alt}
            alt={alt && alt}
            classes={`${small ? 'sm:h-[200px]' : 'sm:h-[250px]'} block w-full  object-cover`}
            placeholder={true}
          />
      </Link>
      <div className="card-body !p-6 !pb-8">
        <Link href={url && url}>
          <h2 className="card-title">{heading && heading}</h2>
        </Link>
        <p className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: desc && truncateText(desc, 200) }}></p>

  
        <div className="card-actions justify-start mt-2">
       <p className="text-xs text-gray-500 mt-2 uppercase">{author && author} <span className="text-[8px] mx-1 opacity-50">|</span> {date && date}</p>
        </div>
      </div>
    </div>
  );
}
