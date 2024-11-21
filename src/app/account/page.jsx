import Breadcrumb from "../Components/Breadcrumb";
import AccountMenu from "../Components/AccountMenu";
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
import AccountHeader from "../Components/AccountHeader";

export default function MyAccount() {
  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="bg-bggray sm:py-10 pb-5 pt-3">
        <div className="container">
          <div className="max-w-[999px] mx-auto">
          <AccountHeader/>
            <div className="sm:pt-2">
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
                url="my-transactions"
              />

              <AccountMenu
                icon={<HeartIcon className="size-4 text-primary" />}
                title="My Wishlist"
                desc="Save items for future purchase."
                url="my-wishlist"
              />

              <AccountMenu
                icon={<MapIcon className="size-4 text-primary" />}
                title="My Address"
                desc="Manage your shipping and billing addresses."
                url="my-address"
              />

              <AccountMenu
                icon={<CreditCardIcon className="size-4 text-primary" />}
                title="My Payments"
                desc="Update and manage payment methods."
                url="my-payments"
              />

              <AccountMenu
                icon={<TruckIcon className="size-4 text-primary" />}
                title="My Returns"
                desc="Track and manage product returns."
                url="my-returns"
              />

              <AccountMenu
                icon={<StarIcon className="size-4 text-primary" />}
                title="My Reviews"
                desc="View and edit product reviews."
                url="my-reviews"
              />

              <AccountMenu
                icon={<GiftIcon className="size-4 text-primary" />}
                title="My Reward Points"
                desc="Check and redeem loyalty points."
                url="my-rewards"
              />

              <AccountMenu
                icon={<KeyIcon className="size-4 text-primary" />}
                title="Reset password"
                desc="Change your account password."
                url="reset-password"
              />

              <AccountMenu
                minimum
                logout
                icon={<PencilIcon className="size-4 text-primary" />}
                title="Logout"
                url="my-orders"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
