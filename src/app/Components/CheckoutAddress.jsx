'use client'
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ListOptions from "./ListOptions";
import AddNewAddressForm from "./Forms/AddNewAddress";

export default function CheckoutAddress({data}){

    const [showNewAddress, setShowNewAddress] = useState(false); // Correct useState initialization

    return (
      <div className="card-rounded-none-small w-full bg-white py-5 px-4">
        <SectionHeader title="Billing details" card />
        <div className="grid gap-5">
          {!data && <Alerts status="red" title="No address has been saved." />}
          {data && !showNewAddress &&
            data.map((item, index) => (
              <ListOptions key={index} title={item?.user_address} />
            ))
          }
          <button
            className="btn-light btn-large w-full"
            onClick={() => setShowNewAddress(!showNewAddress)} // Toggle logic corrected
          >
            {!showNewAddress ? 'Add a new address' : 'Use saved address'}
          </button>
        </div>
        {showNewAddress && (
          <div className="grid mt-5">
            <SectionHeader title="Add new address" card />
            <AddNewAddressForm />
          </div>
        )}
      </div>
    );
  }
  