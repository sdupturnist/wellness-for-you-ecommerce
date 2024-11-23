"use client";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ListOptions from "./ListOptions";
import AddNewAddressForm from "./Forms/AddNewAddress";

export default function AddNewAddress() {
  const [showNewAddress, setShowNewAddress] = useState(false); // Correct useState initialization

  return (
    <>
     <div className="sm:px-0 px-5">
         <button
        className="btn-light btn-large w-full"
        onClick={() => setShowNewAddress(!showNewAddress)} // Toggle logic corrected
      >
        Add a new address
      </button>
      </div>  
     {showNewAddress && <div className="grid mt-5 b">
        <div className="sm:px-0 px-5">
       <SectionHeader title="Add new address" card  />
       </div>
       <div className="card-rounded-none-small bg-white">
       <AddNewAddressForm />
       </div>
      </div> }
    </>
  );
}
