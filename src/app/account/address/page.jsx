import Breadcrumb from "@/app/Components/Breadcrumb";
import AccountHeader from "@/app/Components/AccountHeader";


export default function Orders() {
  return (
    <div className="bg-bggray">
      <Breadcrumb />
      <section className="bg-bggray sm:py-10 pb-5 pt-3">
        <div className="container">
          <div className="max-w-[999px] mx-auto">
           <AccountHeader back/>
            <div className="sm:pt-2">
              <div className="card bg-white border border-border">
                sadas
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
