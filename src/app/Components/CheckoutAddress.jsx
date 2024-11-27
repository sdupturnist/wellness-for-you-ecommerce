"use client";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ListOptions from "./ListOptions";
import AddNewAddressForm from "./Forms/AddNewAddress";
import Alerts from "./Alerts";

export default function CheckoutAddress({ data, multipleAddress }) {
  const [showNewAddress, setShowNewAddress] = useState(false); // Correct useState initialization

  const additionalAddresses =
    multipleAddress &&
    multipleAddress?.meta_data.find(
      (item) => item.key === "additional_addresses"
    ).value;



  return (
    <div className="card-rounded-none-small w-full bg-white py-5 px-4">
      <SectionHeader title="Billing details" card />
      <ul className="grid gap-5">
        {!data && <Alerts status="red" title="No address has been saved." />}

        {data && !showNewAddress && (
          <ListOptions
            data={data && data?.billing}
            title={`${data && data?.first_name}, ${data && data?.last_name}`}
            titleBold
          />
        )}

        {additionalAddresses &&
          additionalAddresses.map((item, index) => (
           <ListOptions
                key={index}
                data={item}
                title={`${data && data?.first_name}, ${
                  data && data?.last_name
                }`}
                titleBold
              />
          ))}

        <button
          className="btn-light btn-large w-full"
          onClick={() => setShowNewAddress(!showNewAddress)} // Toggle logic corrected
        >
          {!showNewAddress ? "Add a new address" : "Use saved address"}
        </button>
      </ul>
      {showNewAddress && (
        <div className="grid mt-5">
          <SectionHeader title="Add new address" card />
          <AddNewAddressForm />
        </div>
      )}
    </div>
  );
}
