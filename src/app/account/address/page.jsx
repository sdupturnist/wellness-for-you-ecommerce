"use client";

import AddNewAddress from "@/app/Components/AddNewAddress";
import Alerts from "@/app/Components/Alerts";
import { useEffect, useMemo, useState } from "react";
import { apiUrl, homeUrl, woocommerceKey } from "@/app/Utils/variables";
import Loading from "@/app/Components/Loading";
import Swal from "sweetalert2";
import { useSiteContext } from "@/app/Context/siteContext";
import Link from "next/link";
import { useAuthContext } from "@/app/Context/authContext";

export default function Address() {
  const { userData } = useAuthContext();
  const { setEditData } = useSiteContext();
  
  const [savedAddress, setSavedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data and addresses on mount or when userData.id changes



  const fetchData = async () => {
    try {
      const response = await fetch(
        `${apiUrl}wp-json/wc/v3/customers/${userData?.id}${woocommerceKey}`
      );
      const data = await response.json();
      setSavedAddress(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch addresses. Please try again later.");
      setLoading(false);
    }
  };


  useEffect(() => {

    if (userData?.id) {
      fetchData();
    }
  }, [userData?.id]);

  // Extract additional addresses from meta_data
  const additionalAddresses = savedAddress?.meta_data?.find(
    (item) => item.key === "additional_addresses"
  )?.value;

  // Handle address deletion
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
            `${apiUrl}wp-json/wc/v3/customers/${userData?.id}/addresses/${id}${woocommerceKey}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then(() => {
              // Re-fetch addresses after deletion
            fetchData(); // This should ensure the latest data is fetched.
            })
            .catch((error) => {
              console.error("Error deleting address:", error);
              setError("Failed to delete address. Please try again.");
            });
        }
      });
  };



  return loading ? (
    <div className="flex items-center justify-center sm:min-h-[70vh] min-h-[50vh]">
      <Loading spinner />
    </div>
  ) : error ? (
    <div className="flex items-center justify-center sm:min-h-[70vh] min-h-[50vh]">
      <Alerts title={error} />
    </div>
  ) : (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto grid sm:gap-6 gap-5">
          {!additionalAddresses ? (
            <Alerts
              noPageUrl
              large
              title="You have not added any additional addresses"
            />
          ) : (
            additionalAddresses.map((item, index) => (
              <div
                key={index}
                className={`rounded-none sm:rounded-xl list-none sm:p-10 p-5 bg-white`}>
                <div className="pb-2">
                  <div className="flex gap-3 mb-2">
                    <label className="font-semibold">
                      {item?.first_name} {item?.last_name}
                    </label>
                  </div>
                  <div className="!grid gap-1 [&>*]:text-base [&>*]:opacity-70 sm:max-w-[60%]">
                    {item?.address_1 && <span>{item?.address_1}</span>}
                    {item?.address_2 && <span>{item?.address_2}</span>}
                    {item?.company && <span>{item?.company}</span>}
                    {item?.city && (
                      <span>
                        {item?.city && <span>{item?.city}, </span>}
                        {item?.state && <span>{item?.state}, </span>}
                        {item?.country && <span>{item?.country}, </span>}
                        {item?.postcode && <br />}
                        {item?.postcode && <span>Pin. {item?.postcode}</span>}
                        {item?.phone && <br />}
                        {item?.phone && <span>Ph. {item?.phone}</span>}
                      </span>
                    )}
                    <div>
                      <div className="join mt-4 !gap-0">
                        <Link
                          onClick={(e) => setEditData(item)}
                          href={`${homeUrl}account/address/edit/${item?.id}`}
                          className="btn btn-light btn-medium join-item min-w-20 flex justify-center">
                          Edit
                        </Link>
                        <button
                          className="btn btn-light btn-medium join-item min-w-20 flex justify-center"
                          onClick={() => deleteAddress(item?.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
                <AddNewAddress onAddressAdded={fetchData} />
        </div>
      </section>
    </div>
  );
}
