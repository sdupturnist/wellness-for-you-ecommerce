import Alerts from "@/app/Components/Alerts";
import { homeUrl } from "@/app/Utils/variables";

export default function SuccessPage() {
  return (



    <section className="pt-0">
    <div className="container">
      <div className="container !px-0 sm:px-5 w-full min-w-full">
        <div className="sm:min-h-[70vh] min-h-[60vh] flex items-center justify-center">
          <div className="text-center grid md:gap-8 sm:gap-6 gap-4 sm:max-w-[60%] max-w-[90%] mx-auto">
            <Alerts
              title="Thank You for Your Order!"
              large
              url={`${homeUrl}account`}
              buttonLabel="My account"
              desc="Thank you for shopping with us! We’ll keep you updated on your
            order status."
            />
          </div>
        </div>
      </div>
    </div>
  </section>


  );
}
