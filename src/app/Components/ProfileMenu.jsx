"use client";
import {
  PencilIcon,
  HeartIcon,
  ArchiveBoxIcon,
  TruckIcon,
  MapIcon,
  CreditCardIcon,
  StarIcon,
  GiftIcon,
  KeyIcon,
  UserIcon,
  CogIcon,
  CalendarIcon,
  ArrowUturnUpIcon,
} from "@heroicons/react/24/solid";
import { accountMenus } from "../Utils/variables";
import AccountMenu from "./AccountMenu";

export default function ProfileMenu({}) {
  return (
    <div className="card-rounded-none-small !pt-0 !px-0 sm:pb-0  rounded-lg overflow-hidden">
      {accountMenus &&
        accountMenus.map((item, index) => (
          <AccountMenu
            key={index}
            icon={item?.icon}
            title={item?.label}
            desc="View and manage your orders."
            url={item?.url}
          />
        ))}

      <AccountMenu
        minimum
        logout
        icon={<PencilIcon className="size-4 text-primary" />}
        title="Logout"
        url="/"
      />
    </div>
  );
}
