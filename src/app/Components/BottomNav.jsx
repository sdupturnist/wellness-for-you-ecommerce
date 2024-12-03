'use client'

import Nav from "./Nav"



export default function BottomNav(){
    return(
       <div className="container">
         <div className="flex items-center justify-between gap-7">
      <Nav bottomNav/>
      </div>
       </div>
    )
}