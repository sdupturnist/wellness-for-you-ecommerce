"use client";
import { useEffect, useState } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import {
  CountrySelect,
  CitySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Loading from "../Loading";
import {
  apiUrl,
  homeUrl,
  siteName,
  woocommerceKey,
} from "@/app/Utils/variables";
import { sendMail } from "@/app/Utils/Mail";
import Alerts from "../Alerts";
import { useRouter, useParams } from "next/navigation";
import { useSiteContext } from "@/app/Context/siteContext";
import { useAuthContext } from "@/app/Context/authContext";

export default function UpdateAddressForm({ addressCount }) {
  const id = useParams();
  const router = useRouter();

  const { editData } = useSiteContext();

  const { userData } = useAuthContext();

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

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const addressId = addressCount + 1; // Increment counter for each request

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const updatedData = {
      address: {
        firstName: firstName || editData?.full_name,
        lastName: "",
        country: country || editData?.country,
        houseName: houseName || editData?.address_1,
        street: street || editData?.address_2,
        landmark: landmark || editData?.landmark,
        state: state || editData?.state,
        city: city || editData?.city,
        pinCode: pinCode || editData?.pincode,
        phone: phone || editData?.phone,
      },
    };

    // `${apiUrl}wp-json/wc/v3/customers/${userData?.id}/addresses/${id?.id}${woocommerceKey}`,

    try {
      const response = await fetch(
        `${apiUrl}wp-json/wc/v3/customers/${userData?.id}/addresses/${id?.id}${woocommerceKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: jwtTocken, // Replace with JWT or Basic Auth
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        //setBillingAddress(requestData);
        setLoading(false);
        setStatus(true);

        setTimeout(() => {
          setStatus(false);
        }, 1000);

        setRegion("");
        setCountryid(0);
        setstateid(0);
        setCountry("");
        setstate("");
        setCity("");
        setFirstName("");
        setPhone("");
        setPinCode("");
        setStreet("");
        setHousename("");
        setLandmark("");

        router.back();

        //  location.reload();

        //  router.replace(router.asPath)
      } else {
        const errorResponse = await response.json();
        console.error(
          "Failed to submit review",
          response.status,
          errorResponse
        );
        setError(true);
        setLoading(false);
        setStatus(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setStatus(false);
      console.error("An error occurred:", error);
    } finally {
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="none">
      <div className="grid gap-4">
        {status && (
          <Alerts
            status="green"
            title="You have successfully added your new address."
          />
        )}
        {error && (
          <Alerts
            status="red"
            title="There was an issue adding your new address. Please try again."
          />
        )}

        <input
          defaultValue={
            (editData && editData?.full_name) || editData?.shipping?.firstName
          }
          type="text"
          className="input"
          placeholder="Full Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.phone) || editData?.shipping?.phone
          }
          type="number"
          className="input"
          placeholder="Contact Number"
          onChange={(e) => setPhone(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.address_1) || editData?.shipping?.address_1
          }
          type="text"
          className="input"
          placeholder="House Name or Number"
          onChange={(e) => setHousename(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.address_2) || editData?.shipping?.address_2
          }
          type="text"
          className="input"
          placeholder="Street Name or Area"
          onChange={(e) => setStreet(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.landmark) || editData?.shipping?.landmark
          }
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
          defaultValue={
            (editData && editData?.pincode) || editData?.shipping?.pincode
          }
          type="number"
          className="input"
          placeholder="Pin Code"
          onChange={(e) => setPinCode(e.target.value)}
          required
          autoComplete="none"
        />

        <button className="btn btn-large w-full" type="submit">
          {loading && <Loading />}
          Save address
        </button>
      </div>
    </form>
  );
}
