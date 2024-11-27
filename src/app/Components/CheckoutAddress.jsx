"use client";
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import ListOptions from "./ListOptions";
import AddNewAddressForm from "./Forms/AddNewAddress";
import Alerts from "./Alerts";
import { apiUrl, woocommerceKey } from "../Utils/variables";
import { useUserContext } from "../Context/userContext";

export default function CheckoutAddress({ data }) {
  

  const {showAddNewAddress, setShowAddNewAddress} = useUserContext()

  
  const [showNewAddress, setShowNewAddress] = useState(false); 
  const [savedAddress, setSavedAddress] = useState(''); 
  const [loading, setLoading] = useState(true); 




useEffect(() => {
  fetch(`${apiUrl}wp-json/wc/v3/customers/2${woocommerceKey}`)
    .then((res) => res.json())
    .then((data) => {
      setSavedAddress(data)
      setLoading(false)
    })
}, [savedAddress])


const additionalAddresses = savedAddress?.meta_data?.find(
  (item) => item.key === "additional_addresses"
)?.value;



console.log(additionalAddresses)

  return (
    <div className="card-rounded-none-small w-full bg-white py-5 px-4">
      <SectionHeader title="Billing details" card />
      <ul className="grid gap-5">
        {!savedAddress && <Alerts status="red" title="No address has been saved." />}

        {savedAddress && !showNewAddress && (
          <ListOptions
            data={data && data?.billing}
            title={`${data && data?.first_name}, ${data && data?.last_name}`}
            titleBold
          />
        )}

        {savedAddress && additionalAddresses.map((item, index) => (
            <ListOptions
              key={index}
              data={item}
              title={`${data && data?.first_name}, ${data && data?.last_name}`}
              titleBold
            />
          ))}

        <button
          className="btn-light btn-large w-full"
          onClick={() => setShowAddNewAddress(!showNewAddress)} // Toggle logic corrected
        >
          {!showAddNewAddress ? "Add a new address" : "Use saved address"}
        </button>
      </ul>
   
      {/* {console.log(additionalAddresses ? additionalAddresses?.length : 0)} */}
      
      {showAddNewAddress && (
        <div className="grid mt-5">
          <SectionHeader title="Add new address" card />
        
          <AddNewAddressForm addressCount={additionalAddresses ? additionalAddresses?.length : 0}/>
        </div>
      )}
    </div>
  );
}
