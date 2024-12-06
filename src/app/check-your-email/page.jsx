'use client'

import React, { Suspense, useState, useEffect } from "react";
import Alerts from "../Components/Alerts";
import { useSearchParams } from "next/navigation";
import Loading from "../Components/Loading";

const CheckYourEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  // State to check if it's client-side rendering (after mount)
  const [isClient, setIsClient] = useState(false);

  // UseEffect to set client-side flag after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the content on client-side
  if (!isClient) return <Loading fullscreen />;

  return (
    <Suspense fallback={<Loading fullscreen />}>
      <section className="pt-0">
        <div className="container">
          <div className="container !px-0 sm:px-5 w-full min-w-full">
            <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
              <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[95%] mx-auto">
                <Alerts
                  noLogo
                  title="You're Almost Done!"
                  large
                  noPageUrl
                  desc={`Thanks for signing up! Please check your email at ${email} for a confirmation link to finish your registration.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default CheckYourEmail;
