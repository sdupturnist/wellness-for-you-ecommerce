"use client";

import AccountHeader from "@/app/Components/AccountHeader";
import ProfileMenu from "@/app/Components/ProfileMenu";
import SectionHeader from "@/app/Components/SectionHeader";
import AddNewAddress from "@/app/Components/AddNewAddress";
import ModifyAddress from "@/app/Components/ModifyAddress";
import Alerts from "@/app/Components/Alerts";
import { useEffect, useMemo, useState } from "react";
import { apiUrl, homeUrl, woocommerceKey } from "@/app/Utils/variables";
import ListOptionsAddress from "@/app/Components/ListOptionsAddress";
import Loading from "@/app/Components/Loading";
import Swal from "sweetalert2";
import { useSiteContext } from "@/app/Context/siteContext";
import Link from "next/link";

export default function Address() {


  const userInfo = {
    id: 2,
    name: `Anjali`,
    email: `upturnistuae@gmail.com`,
    phone: `911234567890`,
  };

  const { setEditData, editData } = useSiteContext();

  const [savedAddress, setAdditionalsavedAddress] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}wp-json/wc/v3/customers/2${woocommerceKey}`)
      .then((res) => res.json())
      .then((data) => {
        setAdditionalsavedAddress(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [savedAddress]);

  const additionalAddresses = useMemo(() => {
    return savedAddress?.meta_data?.find(
      (item) => item.key === "additional_addresses"
    )?.value;
  }, [savedAddress?.meta_data]);

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


 


  return loading ? (
    <div className="flex items-center justify-center sm:min-h-[70vh] min-h-[50vh]">
      <Loading spinner />
    </div>
  ) : (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto grid sm:gap-6 gap-5">
          {!additionalAddresses ? (
            <Alerts large title="You have not added any additional addresses" />
          ) : (
            additionalAddresses.map((item, index) => (
              <div
                key={index}
                className={`rounded-none sm:rounded-xl list-none sm:p-10 p-5  bg-white `}>
                <div className="pb-2">
                  <div className="flex gap-3 mb-2">
                    <label className={`font-semibold`}>
                      {item?.first_name} {item?.last_name}
                    </label>
                  </div>
                  <div
                    className={`!grid gap-1 [&>*]:text-base [&>*]:opacity-70 sm:max-w-[60%]`}>
                    {item?.address_1 && <span>{item?.address_1}</span>}
                    {item?.address_2 && <span>{item?.address_2}</span>}
                    {item?.company && <span>{item?.company}</span>}
                    {item?.city && (
                      <span>
                        {item?.city && <span>{item?.city}, </span>}
                        {item?.state && <span>{item?.state}, </span>}
                        {item?.country && <span>{item?.country}, </span>}
                        {item?.postcode && <span>{item?.postcode}</span>}
                      </span>
                    )}

                    <div>
                      <div className="join mt-4 !gap-0">
                        <Link
                          onClick={(e) =>  setEditData(item)}
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
          <AddNewAddress />
        </div>
      </section>
    </div>
  );
}
