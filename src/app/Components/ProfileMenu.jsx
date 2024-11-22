'use client'
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
    CalendarIcon,
    ArrowUturnUpIcon,
  } from "@heroicons/react/24/solid";
import AccountMenu from "./AccountMenu";

export default function ProfileMenu({}){
    return(
       <div className="card-rounded-none-small !p-0 rounded-lg overflow-hidden sm:mt-10 mt-3">
         <AccountMenu
                icon={<ArchiveBoxIcon className="size-4 text-primary" />}
                title="My Orders"
                desc="View and manage your orders."
                url={`account/orders`}
              />

              <AccountMenu
                icon={<CalendarIcon className="size-4 text-primary" />}
                title="My Transactions"
                desc="Review payment and transaction history."
                url={`account/transations`}
              />

              <AccountMenu
                icon={<HeartIcon className="size-4 text-primary" />}
                title="My Wishlist"
                desc="Save items for future purchase."
                url={`account/wishlist`}
              />

              <AccountMenu
                icon={<MapIcon className="size-4 text-primary" />}
                title="My Address"
                desc="Manage your shipping and billing addresses."
                url={`account/address`}
              />

              <AccountMenu
                icon={<CreditCardIcon className="size-4 text-primary" />}
                title="My Payments"
                desc="Update and manage payment methods."
                url={`account/payments`}
              />

              <AccountMenu
                icon={<TruckIcon className="size-4 text-primary" />}
                title="My Returns"
                desc="Track and manage product returns."
                url={`account/returns`}
              />

              <AccountMenu
                icon={<StarIcon className="size-4 text-primary" />}
                title="My Reviews"
                desc="View and edit product reviews."
                url={`account/reviews`}
              />

              <AccountMenu
                icon={<GiftIcon className="size-4 text-primary" />}
                title="My Reward Points"
                desc="Check and redeem loyalty points."
                url={`account/rewards`}
              />

              <AccountMenu
                icon={<KeyIcon className="size-4 text-primary" />}
                title="Reset password"
                desc="Change your account password."
                url={`account/reset-password`}
              />

              <AccountMenu
                minimum
                logout
                icon={<PencilIcon className="size-4 text-primary" />}
                title="Logout"
                url="/"
              />
       </div>
    )
}