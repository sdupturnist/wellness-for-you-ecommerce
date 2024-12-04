"use client";

import { avatar } from "../Components/Avatars";
import { accountMenus, homeUrl } from "../Utils/variables";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, HeartIcon, Bars2Icon } from "@heroicons/react/24/solid";
import Images from "./Images";
import DropDown from "./DropDown";
import Link from "next/link";
import Logout from "./Logout";
import { useAuthContext } from "../Context/authContext";

export default function AccountHeader({ back }) {
  const router = useRouter();
  const pathname = usePathname();

  const { userData } = useAuthContext();

  return (
    <div className="bg-white sm:bg-transparent sm:px-0 px-5 sm:py-0 py-4 flex gap-3 items-center justify-between sm:mb-5 xl:mb-0">
      <div className="flex gap-3 items-center">
        {!back && (
          <>
            <div className="avatar">
              <div className="w-10 rounded-full">
                {userData && (
                  <Images
                    imageurl={userData?.avatar_url}
                    quality="80"
                    width="150"
                    height="150"
                    title="test"
                    alt="test"
                    classes="block"
                    placeholder={true}
                  />
                )}
              </div>
            </div>
            <Link href={`${homeUrl}account`} className="text-lg font-semibold">
              Hi, {userData?.first_name}
            </Link>
          </>
        )}
        {back && (
          <>
            <button onClick={router.back}>
              <ArrowLeftIcon className="size-5 text-dark" />
            </button>
            <h3 className="text-lg font-semibold capitalize">
              {pathname?.split("/").pop()}
            </h3>
          </>
        )}
      </div>
      <div className="xl:hidden">
        <DropDown
          icon={<Bars2Icon className="size-8" />}
          label="medd"
          component={<Logout small />}
          items={[...accountMenus]}
        />
      </div>
    </div>
  );
}
