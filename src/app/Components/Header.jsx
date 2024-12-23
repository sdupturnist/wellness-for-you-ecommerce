"use client";

import Link from "next/link";
import Images from "./Images";
import Search from "./Search";
import { homeUrl, siteLogo } from "../Utils/variables";
import { useState } from "react";
import Nav from "./Nav";

export default function Header() {
  const [searchMobileVisible, setSearchMobileVisible] = useState(false);

  return (
    <header className="sm:py-4 py-2 border-b border">
      <div className="container">
        <div className="flex items-center justify-between sm:gap-[30px] gap-[20px]">
          <div className="logo">
            <Link href={homeUrl}>
              <Images
                imageurl={siteLogo}
                quality="100"
                width="150"
                height="50"
                alt="Wellness for you logo"
                classes="block w-full sm:h-[70px] h-[45px] object-contain"
                placeholder={true}
              />
            </Link>
          </div>
          <div className="block sm:max-w-[767px] max-w-[220px] w-full">
            <Search />
          </div>
          <div className="flex items-center justify-between gap-6">
            {/* <button */}
              {/* className="lg:hidden block" */}
              {/* onClick={(e) => { */}
                {/* setSearchMobileVisible((prev) => !prev); // Toggle visibility state */}
              {/* }}> */}
              {/* <svg */}
                {/* xmlns="http://www.w3.org/2000/svg" */}
                {/* width="28" */}
                {/* height="29" */}
                {/* viewBox="0 0 28 29" */}
                {/* fill="none"> */}
                {/* <g clipPath="url(#clip0_128_538)"> */}
                  {/* <path */}
                    {/* d="M10.4997 19.3534C12.3337 19.3534 14.0207 18.7414 15.3839 17.7206L20.333 23.6703L21.9827 22.02L17.0336 16.0709C18.0544 14.7077 18.6663 13.0207 18.6663 11.1867C18.6663 6.67635 15.01 3.02002 10.4997 3.02002C5.98934 3.02002 2.33301 6.67635 2.33301 11.1867C2.33301 15.697 5.98934 19.3534 10.4997 19.3534ZM10.4997 5.35335C13.7162 5.35335 16.333 7.97019 16.333 11.1867C16.333 14.4032 13.7162 17.02 10.4997 17.02C7.28317 17.02 4.66634 14.4032 4.66634 11.1867C4.66634 7.97019 7.28317 5.35335 10.4997 5.35335Z" */}
                    {/* fill="#15181E" */}
                  {/* /> */}
                {/* </g> */}
                {/* <defs> */}
                  {/* <clipPath id="clip0_128_538"> */}
                    {/* <rect */}
                      {/* width="28" */}
                      {/* height="28" */}
                      {/* fill="white" */}
                      {/* transform="translate(0 0.686523)" */}
                    {/* /> */}
                  {/* </clipPath> */}
                {/* </defs> */}
              {/* </svg> */}
            {/* </button> */}
            <div className="flex items-center justify-between gap-7">
              <Nav header/>
            </div>
          </div>
        </div>
        {/* {searchMobileVisible && ( */}
          {/* <div className="lg:hidden mt-4"> */}
            {/* <Search /> */}
          {/* </div> */}
        {/* )} */}
      </div>
    </header>
  );
}
