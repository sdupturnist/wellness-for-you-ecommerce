import Alerts from "@/app/Components/Alerts";
import { homeUrl } from "@/app/Utils/variables";

export default function FailedPage() {
  return (
    <section className="pt-0">
      <div className="container">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
            <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[95%] mx-auto">
              <Alerts
                title="Oops! Something Went Wrong"
                large
                url={homeUrl}
                buttonLabel="Go to home"
                desc=" We're unable to complete your order at the moment. Please check your information and try again. If any amount has been debited from your account, please be assured that it will be credited back to your account within 7 business days."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
