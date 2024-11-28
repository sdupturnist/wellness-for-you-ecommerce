"use client";

import { useState } from "react";
import { apiUrl, homeUrl, woocommerceKey } from "../Utils/variables";
import Swal from "sweetalert2";
import Link from "next/link";
import { useSiteContext } from "../Context/siteContext";
import { useCheckoutContext } from "../Context/checkoutContext";

export default function ListOptionsAddress({
  title,
  noButton,
  small,
  data,
  titleBold,
}) {
  const { setEditData } = useSiteContext();
  const { setBillingAddress } = useCheckoutContext();

  const [savedAddress, setSavedAddress] = useState(data); // Initialize with `data`
  //const [selectAddress, setSelectAddress] = useState(null); // Initialize with null or an empty object

  const handleEditClick = () => {
    setEditData(savedAddress); // Update the state before navigating
  };

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

  // This is the object that will be set when the radio button is selected
  // const selectedBillingAddress = {
  //   fullname_and_lastname: title,
  //   company: savedAddress?.company,
  //   country: savedAddress?.country,
  //   address_1: savedAddress?.address_1,
  //   address_2: savedAddress?.address_2,
  //   state: savedAddress?.state,
  //   city: savedAddress?.city,
  //   postcode: savedAddress?.postcode,
  // };

  // Handle radio button selection and set the address
  const handleSelectAddress = (selectedBillingAddress) => {
    setBillingAddress(selectedBillingAddress);
  };

  //console.log(selectAddress)

  return (
    <li className="card shadow-sm bg-white hover:shadow-none transition-all hover:border-primary">
      <div className="pb-2">
        <div className="flex gap-3 mb-2">
          <input
            onChange={(e) =>
              handleSelectAddress({
                fullname_and_lastname: title,
                company: savedAddress?.company,
                country: savedAddress?.country,
                address_1: savedAddress?.address_1,
                address_2: savedAddress?.address_2,
                state: savedAddress?.state,
                city: savedAddress?.city,
                postcode: savedAddress?.postcode,
              })
            }
            type="radio"
            className="radio radio-sm"
            name="selected_address"
            value={title} // This is just for unique identification, not the actual address
          />
          <label className={`${titleBold && "font-semibold"}`}>{title}</label>
        </div>
        <div className="pl-8 !grid gap-1 [&>*]:text-base [&>*]:opacity-70 sm:max-w-[60%]">
          {savedAddress?.address_1 && <span>{savedAddress?.address_1}</span>}
          {savedAddress?.address_2 && <span>{savedAddress?.address_2}</span>}
          {savedAddress?.company && <span>{savedAddress?.company}</span>}
          {savedAddress?.city && (
            <span>
              {savedAddress?.city && <span>{savedAddress?.city}, </span>}
              {savedAddress?.state && <span>{savedAddress?.state}, </span>}
              {savedAddress?.country && <span>{savedAddress?.country}, </span>}
              {savedAddress?.postcode && <span>{savedAddress?.postcode}</span>}
            </span>
          )}

          <div>
            <div className="join mt-4 !gap-0">
              <Link
                onClick={handleEditClick} // Call the handler here, not directly setting state
                href={`${homeUrl}account/address/edit/${savedAddress?.id}`}
                className="btn btn-light btn-medium join-item min-w-20 flex justify-center">
                Edit
              </Link>
              <button
                className="btn btn-light btn-medium join-item min-w-20 flex justify-center"
                onClick={() => deleteAddress(savedAddress?.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
