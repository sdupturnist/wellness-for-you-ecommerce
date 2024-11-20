'use client'

import Link from "next/link"
import { homeUrl } from "../Utils/variables"






export default function Breadcrumb(){
    return(
        <div className="container py-2">
        <div className="breadcrumbs text-xs">
        <ul>
          <li><Link href={homeUrl}>Home</Link></li>
          <li><Link href="">Documents</Link></li>
          <li>Add Document</li>
        </ul>
      </div>
      </div>
    )
}