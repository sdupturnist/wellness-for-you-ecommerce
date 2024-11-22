import Link from "next/link";
import Images from "../Components/Images";
import SectionHeader from "../Components/SectionHeader";
import { homeUrl } from "../Utils/variables";
import Login from "../Components/Forms/Login";

export default function ShippingPolicy() {
  return (
    <div className="bg-bggray">
      <section className="sm:bg-white bg-bggray py-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
          <Images
            imageurl="/images/banner_6.jpg"
            quality="100"
            width="1700"
            height="600"
            alt="Wellness for you"
         classes="block w-full sm:h-[350px] h-[150px] sm:rounded-lg object-cover sm:my-5 sm:w-[98%] mx-auto"
            placeholder={true}
          />

          <div className="card bg-white py-5 px-4 sm:max-w-[500px] max-w-[350px] w-full mx-auto relative sm:top-[-200px] top-[-100px]">
            <SectionHeader title="Log in to your account" titleCenter />
            <div className="grid gap-5">
              <Login />
              <Link
                href={`${homeUrl}signup`}
                className="btn btn-light btn-large">
                Create a account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
