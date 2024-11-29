'use client'
import { PencilIcon, ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { homeUrl } from "../Utils/variables";
import Link from "next/link";


export default function AccountMenu({icon, title, url, desc, minimum, logout}){
    return(
        <Link href={`${homeUrl}${url}`}>
        <div className={`${logout ? 'border px-4 py-3 justify-center text-center sm:m-4 mb-0 mx-4 mt-4 rounded-lg' : 'p-5 justify-between lg:hover:opacity-80'}  transition-all border-b border-border flex items-center  gap-4 bg-white `}>
        <div className="flex items-center justify-start gap-4">
      {!minimum &&  <div className="rounded-full border border-border size-11 flex  items-center justify-center icon">
        {icon}
          </div>
}
          <span className={`${logout ? 'text-red-600 !hover:border-red-600' : 'text-dark'} font-semibold sm:text-[15px] text-[14px] grid items-center justify-center text-center sm:gap-1 gap-[0.8px]`}>
          {title}
         {/* {desc && <small className="block font-light opacity-90">{desc}</small>} */}
          </span>
        </div>
        {!minimum && 
          <ChevronRightIcon className="sm:size-4 size-4 sm:mr-3 mr-1"/>
        }
      
        </div>
        </Link>
    )
}


