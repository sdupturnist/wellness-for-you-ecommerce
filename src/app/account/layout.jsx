// AccountLayout.js
"use client";

import AccountHeader from "../Components/AccountHeader";
import ProfileMenu from "../Components/ProfileMenu";
import withAuth from "../Utils/withAuth"; // Import the HOC

function AccountLayout({ children }) {
  return (
    <section className="bg-bggray sm:py-10 py-0">
      <main className="flex flex-col">
        <div className="container">
          <AccountHeader />
          <div className="xl:flex grid xl:mt-8 xl:gap-x-8">
            <aside className="xl:w-1/5 xl:order-first order-last w-full">
              <ProfileMenu />
            </aside>
            <div className="xl:w-4/5 xl:order-last order-first w-full mb-5 xl:mb-0">
              {children}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

// Wrap the AccountLayout with withAuth HOC
export default withAuth(AccountLayout);
