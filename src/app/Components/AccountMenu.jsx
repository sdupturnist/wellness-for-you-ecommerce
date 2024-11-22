'use client'
import { PencilIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { homeUrl } from "../Utils/variables";
import Link from "next/link";


export default function AccountMenu({icon, title, url, desc, minimum, logout}){
    return(
        <Link href={`${homeUrl}${url}`}>
        <div className={`${logout ? 'border border-red-600 px-4 py-3' : 'border p-5'} lg:hover:border-primary transition-all mb-3 rounded-lg flex items-center justify-between gap-4 bg-white border border-border`}>
        <div className="flex items-center justify-start gap-4">
      {!minimum &&  <div className="rounded-full bg-primary-dim size-11 flex items-center justify-center icon">
        {icon}
          </div>
}
          <span className={`${logout ? 'text-red-600' : 'text-dark'} font-semibold sm:text-[15px] text-[14px] grid sm:gap-1 gap-[0.8px]`}>
          {title}
         {/* {desc && <small className="block font-light opacity-90">{desc}</small>} */}
          </span>
        </div>
        {!minimum && 
          <ArrowRightIcon className="sm:size-4 size-3 mr-3"/>
        }
      
        </div>
        </Link>
    )
}


