"use client";
import { accountMenus } from "../Utils/variables";
import AccountMenu from "./AccountMenu";
import Logout from "./Logout";

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
<Logout/>
      {/* <AccountMenu
        minimum
        logout
        icon={<PencilIcon className="size-4 text-primary" />}
        title="Logout"
        url="/"
      /> */}
    </div>
  );
}
