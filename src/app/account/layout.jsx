// AccountLayout.js
"use client";

import AccountHeader from "../Components/AccountHeader";
import Loading from "../Components/Loading";
import ProfileMenu from "../Components/ProfileMenu";
import SectionHeader from "../Components/SectionHeader";
import { useAuthContext } from "../Context/authContext";
import withAuth from "../Utils/withAuth"; // Import the HOC
import { usePathname } from "next/navigation";

function AccountLayout({ children }) {
  const pathname = usePathname();

const {auth} = useAuthContext()

if(!auth){
  return <Loading fullscreen message="You are not logged into your account. Please log in..."/>
 // return false
}

  return (
    <section className="bg-bggray sm:py-10 py-0">
      <main className="flex flex-col">
        <div className="container">
          <AccountHeader />
          <div className="xl:flex grid xl:mt-8 xl:gap-x-8">
            <aside className="xl:w-1/5 xl:order-first order-last w-full">
              <ProfileMenu />
            </aside>
            <div className="lg:w-[999px] w-full xl:order-last order-first mx-auto mb-3 xl:mb-0 xl:pt-0 pt-3">
              <div className="px-5 sm:px-0">
                <SectionHeader noSpacing title={pathname?.split("/").pop()?.replace(/-/g, ' ')} />
              </div>
              <div className="sm:pt-8">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

// Wrap the AccountLayout with withAuth HOC
export default withAuth(AccountLayout);
