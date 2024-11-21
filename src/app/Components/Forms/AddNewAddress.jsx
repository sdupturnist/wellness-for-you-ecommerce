'use client'
import { useEffect, useState } from "react";
import { CountrySelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function AddNewAddressForm(){


    const [region, setRegion] = useState("");
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [language, setLanguage] = useState(0);
    const [phoneCode, setPhoneCode] = useState("");
  
    const [phonecodeList, setPhonecodeList] = useState([]);
    const [regionsList, setRegionsList] = useState([]);
    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    // const [cityList, setCityList] = useState([]);
    const [languageList, setLanguageList] = useState([]);


    //API
//https://countrystatecity.in/docs/api/all-countries/
    //dDB4aHZ1RDY1WGJoU3dhallheGRyYVozQjN6VzRvTm9pd0R2RkF0dg==

    const cityList = [
        {
            city_name: 'test'
        }
    ]


    const countriesList_ = [
        {
            city_name: 'test'
        }
    ]


    // useEffect(() => {
    //     GetCountries().then((result) => {
    //       setCountriesList(result);
    //     })
    //   }, []);


    return(
        <form action="">


<div>
     
      <h6>Country</h6>
      <select
       className="input"
        onChange={(e) => {
          const country = stateList[e.target.value]; //here you will get full country object.
          setCountryid(country.id);
          GetState(country.id).then((result) => {
            setStateList(result);
          });
        }}
        value={countryid}
      >
        {countriesList_.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>State</h6>
      <select
       className="input"
        onChange={(e) => {
          const state = stateList[e.target.value]; //here you will get full state object.
          setStateid(state.id);
          GetCity(countryid, state.id).then((result) => {
            setCityList(result);
          });
        }}
        value={stateid}
      >
        {stateList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>City</h6>
      <select
       className="input"
        onChange={(e) => {
          const city = cityList[e.target.value]; //here you will get full city object.
          setCityid(city.id);
        }}
        value={cityid}
      >
        {cityList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
     
    </div>


               <div className="grid gap-4">
               <input type="text" className="input" placeholder="Full Name" />
                <input type="text" className="input" placeholder="Building Name/No" />
                <input type="text" className="input" placeholder="Street Name/Area" />
                <input type="text" className="input" placeholder="Nearest Landmark" />
                {/* <select */}
        {/* onChange={(e) => { */}
          {/* const city = cityList[e.target.value]; //here you will get full city object. */}
          {/* setCityid(city.id); */}
        {/* }} */}
        {/* value={cityid} */}
      {/* > */}
        {/* {cityList.map((item, index) => ( */}
          {/* <option key={index} value={index}> */}
            {/* {item.city_name} */}
          {/* </option> */}
        {/* ))} */}
      {/* </select> */}
{/*  */}
      {/* <CountrySelect */}
        {/* onChange={(e) => { */}
          {/* setCountryid(e.id); */}
        {/* }} */}
        {/* placeHolder="Select Country" */}
      {/* /> */}
{/*  */}
      {/* <CitySelect */}
        {/* countryid={countryid} */}
        {/* stateid={stateid} */}
        {/* onChange={(e) => { */}
          {/* console.log(e); */}
        {/* }} */}
        {/* placeHolder="Select City" */}
      {/* /> */}
                <input type="text" className="input" placeholder="Pin Code" />
                {/* <CountrySelect */}
                {/* onChange={(e) => setCountry(e.name)} */}
                {/* placeHolder="Country" */}
                {/* required */}
              {/* /> */}
                <input type="text" className="input" placeholder="Region / State" />
                <button className="btn btn-large w-full">
                    Save address
                  </button>
               </div>
               </form>
    )
}


