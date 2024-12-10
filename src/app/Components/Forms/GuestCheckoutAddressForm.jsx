"use client";
import { useState, useEffect } from "react";
import {
  CountrySelect,
  CitySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Alerts from "../Alerts";
import { useCheckoutContext } from "@/app/Context/checkoutContext";
import { useCartContext } from "@/app/Context/cartContext";

export default function GuestCheckoutAddressForm({ addressCount, currentData, onAddressAdded }) {

  const { setGuestUserData, guestUserData, guestUserDataValidation } = useCartContext();

  const [region, setRegion] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [houseName, setHousename] = useState("");
  const [landmark, setLandmark] = useState("");
  const [state, setstate] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");

  const requestData = {
    address: {
      firstName: firstName,
      lastName: "",
      country: country,
      houseName: houseName,
      street: street,
      landmark: landmark,
      state: state,
      city: city,
      pinCode: pinCode,
      phone: phone,
      email: email,
    },
  };

  const handleChange = (e, setterFunction) => {
    setterFunction(e.target.value);
    setGuestUserData(requestData);
  };





  useEffect(() => {
    // Re-set the guest user data when any field changes
    setGuestUserData(requestData);
  }, [firstName, country, houseName, street, landmark, state, city, pinCode, phone, email]);

  return (
    <form autoComplete="off">
    {guestUserDataValidation && (
      <div className="mb-5">
        <Alerts status="red" title="Please enter your billing address completely or check the entered values are valid"/>
      </div>
    )}
      <div className="grid gap-4">
        <input
          type="text"
          className="input"
          placeholder="Full Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          type="email"
          className="input"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="none"
        />
          <input
          type="number"
          className="input"
          placeholder="Contact Number"
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          type="text"
          className="input"
          placeholder="House Name or Number"
          onChange={(e) => setHousename(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          type="text"
          className="input"
          placeholder="Street Name or Area"
          onChange={(e) => setStreet(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          type="text"
          className="input"
          placeholder="Nearest Landmark"
          onChange={(e) => setLandmark(e.target.value)}
          required
          autoComplete="none"
        />
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id);
            setCountry(e.name || e.target.value);
          }}
          placeHolder="Country"
          region={region}
          autoComplete="none"
          required
        />

        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);
            setstate(e.name || e.target.value);
          }}
          placeHolder="State"
          required
          autoComplete="none"
        />
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            setCity(e.name || e.target.value);
          }}
          placeHolder="Town/City"
          required
          autoComplete="none"
        />
        <input
          type="number"
          className="input"
          placeholder="Pin Code"
          onChange={(e) => setPinCode(e.target.value)}
          required
          autoComplete="none"
        />
      </div>
</form>
  );
}
