"use client";
import { useEffect, useState } from "react";
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
  const [state, setstate] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
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
        address_1: addressOne,
        address_2: addressTwo,
        city: city,
        state: state,
        postcode: pinCode,
        country: country,
        first_name: firstName,
        last_name: lastName,
        company: companyName,
      },
    };

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
        setLastName("");
        setCompanyName("");
        setAddressOne("");
        setAddressTwo("");
        setPinCode("");

        //MAIL NOTIFICATION TO USER

        //         await sendMail({
        //           sendTo: userData && userData?.user_email,
        //           subject: `You have successfully added your new address. | ${siteName}`,
        //           name: userData && userData?.first_name,
        //           message:
        //             `<table style="width: 100%; border-collapse: collapse;">
        //     <tbody>
        //       <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">First Name</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             firstName +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Last Name</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             lastName +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Company Name</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             companyName +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Address Line 1</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             addressOne +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Address Line 2</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             addressTwo +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">City</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             city +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">State</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             state +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Pin Code / Postcode</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             pinCode +
        //             `</td>
        //         </tr>
        //         <tr>
        //             <td style="padding: 8px; border: 1px solid #ddd;">Country</td>
        //             <td style="padding: 8px; border: 1px solid #ddd;">` +
        //             country +
        //             `</td>
        //         </tr>
        //      </tbody>
        // </table>`,
        //         });

  

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
          type="text"
          defaultValue={
            (editData && editData?.first_name) || editData?.shipping?.first_name
          }
          className="input"
          placeholder="Full Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.last_name) || editData?.shipping?.last_name
          }
          type="text"
          className="input"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="none"
        />
        <input
          defaultValue={
            (editData && editData?.country) || editData?.shipping?.company
          }
          type="text"
          className="input"
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company name"
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
        <input
          defaultValue={
            (editData && editData?.address_1) || editData?.shipping?.address_1
          }
          type="text"
          className="input"
          placeholder="House number and street name"
          onChange={(e) => setAddressOne(e.target.value)}
          required
        />
        <input
          defaultValue={
            (editData && editData?.address_2) || editData?.shipping?.address_2
          }
          type="text"
          className="input"
          placeholder="Apartment, suite, unit, etc. (optional)"
          onChange={(e) => setAddressTwo(e.target.value)}
          autoComplete="none"
        />
        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id); // Updates the stateid when the user selects a state
            setstate(e.name || e.target.value); // Updates the state name based on selection
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
            (editData && editData?.postcode) || editData?.shipping?.postcode
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
