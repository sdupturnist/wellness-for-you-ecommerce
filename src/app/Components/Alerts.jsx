"use client";
import { XCircleIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { homeUrl } from "../Utils/variables";
import Link from "next/link";
import Images from "./Images";
import { usePathname } from "next/navigation";

export default function Alerts({
  status,
  title,
  titleSmall,
  large,
  noIcon,
  icon,
  noPageUrl,
  center,
  nobg,
}) {
  const pathname = usePathname();

  let alertClass = "";
  // let icon = null;

  switch (status) {
    case "red":
      alertClass = "bg-red-100 text-red-600";
      // icon = <XCircleIcon className="size-4" />;
      break;
    case "green":
      alertClass = "bg-green-100 text-green-600";
      // icon = <XCircleIcon className="size-4" />;
      break;
    case "yellow":
      alertClass = "bg-yellow-100 text-yellow-600";
      //  icon = <XCircleIcon className="size-4" />;
      break;
    default:
      alertClass = "bg-gray-100 text-gray-600";
      //  icon = <XCircleIcon className="size-4" />;
      break;
  }

  return (
    <>
      {!large && (
        <div
          role="alert"
          className={`alert ${
            nobg
              ? "bg-transparent border-none opacity-40 [&>*]:text-base"
              : alertClass
          } rounded-md p-3 sm:text-base flex ${
            center ? "text-center justify-center" : "text-start"
          }`}>
          {!noIcon && icon}
          <span className={`${center && "text-center"} ${titleSmall ? 'text-sm' : 'text-base'}`}>{title}</span>
        </div>
      )}
      {large && (
        <div
          className={`card bg-white !border-0 min-h-[50vh] rounded-md p-5 items-center justify-center flex text-dark sm:text-xl text-lg font-semi-bold `}>
          {/* <FaceFrownIcon className="size-[150px] text-slate-200"/> */}
          <Images
            imageurl="/images/banner_7.jpg"
            quality="100"
            width="600"
            height="350"
            alt="Wellness for you"
            classes="block w-full sm:h-[350px] h-[250px] mb-5"
            placeholder={true}
          />
          <span className="font-semibold text-body opacity-65">
            {title} {!noPageUrl && pathname?.split("/").pop()}
          </span>
          {/* <Link className="btn btn-light btn-large my-6" href={homeUrl}> */}
          {/* Shop now */}
          {/* </Link> */}
        </div>
      )}
    </>
  );
}
