import Alerts from "@/app/Components/Alerts";
import { homeUrl } from "@/app/Utils/variables";

export default function SuccessPage() {
  return (



    <section className="pt-0">
    <div className="container">
      <div className="container !px-0 sm:px-5 w-full min-w-full">
        <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
          <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[95%] mx-auto">
            <Alerts
            noPageUrl
              title="Thank you for your Order!"
              large
              url={`${homeUrl}`}
              buttonLabel="Continue Shopping"
              desc="We will keep you updated on your order status via given email address. Alternatively, you can check your order status at My Account > Orders"
            />
          </div>
        </div>
      </div>
    </div>
  </section>


  );
}
