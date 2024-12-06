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
  url,
  buttonLabel,
  desc,
}) {
  const pathname = usePathname();

  let alertClass = "";
  // let icon = null;

  switch (status) {
    case "red":
      alertClass = "bg-red-100 border-red-600 text-red-600";
      break;
    case "green":
      alertClass = "bg-green-100 border-green-600 text-green-600";
      break;
    case "yellow":
      alertClass = "bg-yellow-100 border-yellow-600 text-yellow-600";
      break;
    default:
      alertClass = "bg-gray-100 border-border text-dark";
      break;
  }

  return (
    <>
      {!large && (
        <div
          role="alert"
          className={`alert ${
            nobg
              ? "bg-transparent  opacity-40 [&>*]:text-base"
              : alertClass
          } rounded-md p-3 sm:text-base flex ${
            center ? "text-center justify-center" : "text-start"
          } `}>
          {!noIcon && icon}
          <span
            className={`${center && "text-center"} ${
              titleSmall ? "text-sm" : "text-base"
            }`}>
            {title}
          </span>
        </div>
      )}
      {large && (
        <div
          className={`card bg-white !border-0 min-h-[50vh] rounded-md p-5 items-center justify-center flex text-dark sm:text-xl text-lg font-semi-bold `}>
          {/* <FaceFrownIcon className="size-[150px] text-slate-200"/> */}
          <Images
            imageurl="/images/banner_7.jpg"
            quality="100"
            width="500"
            height="350"
            alt="Wellness for you"
            classes="block w-full sm:h-[350px] h-[250px] mb-5"
            placeholder={true}
          />
          <span className={`${titleSmall ? 'text-lg font-medium' : 'sm:text-2xl text-lg font-semibold'}`}>
            {title} {!noPageUrl && pathname?.split("/").pop()}
          </span>
          {desc && <p className="sm:text-base mt-3 leading-relaxed">{desc}</p>}
          {url && (
            <Link className="btn btn-light btn-large my-6" href={url}>
              {buttonLabel}
            </Link>
          )}
        </div>
      )}
    </>
  );
}
