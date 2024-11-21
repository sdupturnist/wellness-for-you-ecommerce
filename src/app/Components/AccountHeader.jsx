"use client";

import { Link } from "react-alice-carousel";
import { avatar } from "../Components/Avatars";
import { homeUrl } from "../Utils/variables";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function AccountHeader({ back }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="pb-5 flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        {!back && (
          <>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={avatar} />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Hi, Test user</h3>
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
      <Link
        href={`${homeUrl}account/edit-profile`}
        className="btn btn-light btn-small">
        Edit profile
      </Link>
    </div>
  );
}
