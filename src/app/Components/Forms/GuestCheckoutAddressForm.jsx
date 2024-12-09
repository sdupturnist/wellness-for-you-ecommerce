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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  const requestData = {
    address: {
      full_name: firstName,
      last_name: lastName,
      company: companyName,
      country: country,
      address_1: addressOne,
      address_2: addressTwo,
      state: state,
      city: city,
      pincode: pinCode,
      phone: phone,
      email: email
    }
  };

  const handleChange = (e, setterFunction) => {
    setterFunction(e.target.value);
    setGuestUserData(requestData);
  };


  console.log(guestUserData)

  useEffect(() => {
    // Re-set the guest user data when any field changes
    setGuestUserData(requestData);
  }, [firstName, lastName, phone, email, addressOne, addressTwo, pinCode, country, state, city]);

  return (
    <form autoComplete="off">
        {guestUserDataValidation && (
          <div className="mb-5">
            <Alerts status="red" title="Please enter your billing address completely or check the entered values are valid"/>
          </div>
        )}
      <div className="grid gap-4">
        {/* Full Name Field */}
        <input
          type="text"
          className="input"
          placeholder="Full Name"
          value={firstName}
          onChange={(e) => handleChange(e, setFirstName)}
          name="firstName"
          required
          autoComplete="off"
        />

        {/* Last Name Field */}
        <input
          type="text"
          className="input"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e, setLastName)}
          name="lastName"
          required
          autoComplete="off"
        />

        {/* Phone Field */}
        <input
          type="text"
          className="input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => handleChange(e, setPhone)}
          name="phone"
          required
          autoComplete="off"
        />

        {/* Email Field */}
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          name="email"
          required
          autoComplete="off"
        />

        {/* Company Field */}
        <input
          type="text"
          className="input"
          value={companyName}
          onChange={(e) => handleChange(e, setCompanyName)}
          placeholder="Company name (optional)"
          autoComplete="off"
        />

        {/* Country Select */}
        <CountrySelect
          onChange={(e) => {
            setCountryId(e.id);
            setCountry(e.name || e.target.value);
          }}
          value={country}
          placeHolder="Country"
          region={region}
          required
        />

        {/* Address Fields */}
        <input
          type="text"
          className="input"
          placeholder="House number and street name"
          value={addressOne}
          onChange={(e) => handleChange(e, setAddressOne)}
          name="addressOne"
          required
          autoComplete="off"
        />

        <input
          type="text"
          className="input"
          placeholder="Apartment, suite, unit, etc. (optional)"
          value={addressTwo}
          onChange={(e) => handleChange(e, setAddressTwo)}
          autoComplete="off"
        />

        {/* State Select */}
        <StateSelect
          countryid={countryId}
          onChange={(e) => {
            setStateId(e.id);
            setState(e.name || e.target.value);
          }}
          value={state}
          placeHolder="State"
          required
        />

        {/* City Select */}
        <CitySelect
          countryid={countryId}
          stateid={stateId}
          onChange={(e) => {
            setCity(e.name || e.target.value);
          }}
          value={city}
          placeHolder="Town/City"
          required
        />

        {/* Pin Code Field */}
        <input
          type="text"
          className="input"
          placeholder="Pin Code"
          value={pinCode}
          onChange={(e) => handleChange(e, setPinCode)}
          name="pinCode"
          required
          autoComplete="off"
        />
      </div>
    </form>
  );
}
