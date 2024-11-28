import { homeUrl } from "@/app/Utils/variables";
import Alerts from "./Components/Alerts";

export default function NotFoundPage() {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
            <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[90%] mx-auto">
              <Alerts
                title="Oops! we can't find that page."
                large
                url={homeUrl}
                buttonLabel="Go to home"
                desc="It seems like the page you were looking for has disappeared into thin air! Don't worry, though. You can:"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
