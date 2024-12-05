

import Link from "next/link";
import Images from "../Components/Images";
import SectionHeader from "../Components/SectionHeader";
import { homeUrl } from "../Utils/variables";
import Register from "../Components/Register";



export default function SignupPage() {



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

          <div className="bg-white sm:p-14 p-8 sm:max-w-[500px] max-w-[400px] w-full mx-auto relative sm:top-[-200px] top-[-100px] rounded-lg border border-border">
            <SectionHeader title="Create a account" titleCenter />
            <div className="grid gap-5 pt-3">
            <Register/>
              <Link
                href={`${homeUrl}login`}
                className="btn btn-light btn-large">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
