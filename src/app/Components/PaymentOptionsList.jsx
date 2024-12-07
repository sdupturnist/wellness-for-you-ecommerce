"use client";

import { useCheckoutContext } from "../Context/checkoutContext";
import { useEffect, useState } from "react";
import ModalPopup from "./ModalPopup";
import { apiUrl } from "../Utils/variables";

export default function PaymentOptionsList({ data }) {
  const {
    setPaymentMethodOption,
    setPaymentTerms,
    paymentTerms,
    validateTerms,
    setValidateTerms,
  } = useCheckoutContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const enabledGateways =
    data && data.filter((gateway) => gateway.enabled === true);

  const [termsContent, setTermsContent] = useState([]);

  const terms = () =>
    fetch(`${apiUrl}wp-json/wp/v2/pages/36`)
      .then((res) => res.json())
      .then((data) => {
        setTermsContent(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  useEffect(() => {
    setTermsContent(terms);
  }, []);

  useEffect(() => {
    if (
      enabledGateways &&
      enabledGateways.length > 0 &&
      !selectedPaymentMethod
    ) {
      setSelectedPaymentMethod(enabledGateways[0].id);
      setPaymentMethodOption(enabledGateways[0].id);
    }
  }, [enabledGateways, selectedPaymentMethod, setPaymentMethodOption]);

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setPaymentMethodOption(e.target.value);
  };

  return (
    <>
      <ModalPopup
        title="Terms and conditions"
        item={
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: (terms && termsContent?.content?.rendered) || "",
            }}></div>
        }
        noButton
      />
      {data &&
        enabledGateways.map((item, index) => (
          <div key={index} className="list-options-small !gap-2 mb-1">
            <div>
              <input
                type="radio"
                className="radio radio-success radio-sm"
                name="payment_option"
                onChange={handlePaymentMethodChange}
                value={item?.id}
                checked={selectedPaymentMethod === item?.id}
              />
              <label>{item?.title}</label>
            </div>
          </div>
        ))}
      <div className={`border-t border-border pt-5 mt-4`}>
        <div className="list-options-small !gap-2">
          <div>
            <input
              type="checkbox"
              className="checkbox  checkbox-success checkbox-sm"
              name="selected_address"
              onChange={(e) => {
                setPaymentTerms(!paymentTerms), setValidateTerms(true);
              }}
            />
            <label>
              I have read and agree to the website{" "}
              <span
                className="underline text-primary cursor-pointer hover:opacity-60 transition-all"
                onClick={(e) =>
                  document.getElementById("modal_all").showModal()
                }>
                terms and conditions
              </span>
              .
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
