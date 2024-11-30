"use client";

import Link from "next/link";
import { useCheckoutContext } from "../Context/checkoutContext";
import { useEffect, useState } from "react";
import { homeUrl } from "../Utils/variables";

export default function PaymentOptionsList({ data }) {
  const { setPaymentMethodOption, setPaymentTerms, paymentTerms, validateTerms } =
    useCheckoutContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const enabledGateways =
    data && data.filter((gateway) => gateway.enabled === true);

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
      {data &&
        enabledGateways.map((item, index) => (
          <div key={index} className="list-options-small !gap-2">
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
      <div className={`${validateTerms && " !border-red-400 !border rounded-lg p-3 bg-red-50 animate__animated animate__pulse"} border-t border-border pt-5 mt-4`}>
        <div className="list-options-small !gap-2">
          <div>
            <input
              type="checkbox"
              className="checkbox  checkbox-success checkbox-sm"
              name="selected_address"
              onChange={(e) => setPaymentTerms(!paymentTerms)}
            />
             <label>
              I have read and agree to the website <Link className="underline" href={`${homeUrl}terms-conditions`}>terms and conditions</Link>.
            </label>
          </div>
       
        </div>
      </div>
    </>
  );
}
