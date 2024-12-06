import Alerts from "../Components/Alerts";
//import { homeUrl } from "../Utils/variables";
//import { useSearchParams } from "next/navigation";

export default function CheckYourEmail() {
  //const searchParams = useSearchParams();
  //const email = searchParams.get("email");

  return (
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
                desc={`Thanks for signing up! Please check your email for a confirmation link to finish your registration.`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
