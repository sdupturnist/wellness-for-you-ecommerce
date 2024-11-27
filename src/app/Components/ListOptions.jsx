"use client";

import { useState } from "react";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSiteContext } from "../Context/siteContext";


export default function ListOptions({
  title,
  noButton,
  small,
  data,
  titleBold,
}) {

 const { setEditData } =  useSiteContext()

 const [savedAddress, setSavedAddress] = useState(data); // Initialize with `data`

 const handleEditClick = () => {
   setEditData(savedAddress); // Update the state before navigating
 }

 const deleteAddress = (id) => {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: "btn btn-success",
       cancelButton: "btn btn-light",
     },
     buttonsStyling: false,
   });
   swalWithBootstrapButtons
     .fire({
       title: "Are you sure?",
       text: `Do you need to remove this address?`,
       icon: false,
       showCancelButton: true,
       confirmButtonText: "Yes",
       cancelButtonText: "Cancel",
       reverseButtons: true,
     })
     .then((result) => {
       if (result.isConfirmed) {
         fetch(
           `${apiUrl}wp-json/wc/v3/customers/2/addresses/${id}${woocommerceKey}`,
           {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json",
             },
           }
         )
           .then((res) => res.json())
           .then((data) => {
             setSavedAddress(data); // Update state with the response data
           })
           .catch((error) => {
             console.error("Error deleting address:", error);
           });
       }
     });
 };

 return (
   <li className={`${small ? "list-options-small" : "list-options"} !gap-2`}>
     <div>
       <input
         type="radio"
         className="radio radio-sm"
         name="selected_address"
       />
       <label className={`${titleBold && "font-semibold"}`}>{title}</label>
     </div>
     <div className="pl-8 !grid">
       <div className="!grid !gap-2">
         {savedAddress?.id && <span>{savedAddress?.id}</span>}
         {savedAddress?.address_1 && <span>{savedAddress?.address_1}</span>}
         {savedAddress?.address_2 && <span>{savedAddress?.address_2}</span>}
         {savedAddress?.city && (
           <span>
             {savedAddress?.city},{" "}
             {savedAddress?.state && savedAddress?.state},{" "}
             {savedAddress?.country && savedAddress?.country},{" "}
             {savedAddress?.postcode && savedAddress?.postcode}
           </span>
         )}
       </div>
       <div>
         {!noButton && (
           <div className="join mt-2 !gap-0">
             <Link
               onClick={handleEditClick} // Call the handler here, not directly setting state
               href={`${homeUrl}account/address/edit/${savedAddress?.id}`}
               className="btn btn-light btn-medium join-item min-w-20 flex justify-center">
               Edit
             </Link>
             <button
               className="btn-light btn-medium join-item min-w-20 flex justify-center"
               onClick={() => deleteAddress(savedAddress?.id)}>
               Delete
             </button>
           </div>
         )}
       </div>
     </div>
   </li>
 );
}
