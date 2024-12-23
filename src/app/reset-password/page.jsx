import Link from "next/link";
import Images from "../Components/Images";
import SectionHeader from "../Components/SectionHeader";
import { homeUrl } from "../Utils/variables";
import ResetPasswordForm from "../Components/Forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="bg-bggray">
      <section className="sm:bg-white bg-bggray py-0">
        <div className="container !px-0 sm:px-5 w-full min-w-full">
        <Images
            imageurl="/images/login-bg.webp"
            quality="100"
        width="2000"
            height="300"
            alt="Wellness for you"
            classes="block w-full sm:h-[300px] h-[150px] sm:rounded-lg object-cover sm:my-5 sm:w-[98%] mx-auto"
            placeholder={true}
          />

          <div className="bg-white sm:p-14 p-8 sm:max-w-[500px] max-w-[90%] w-full mx-auto relative sm:top-[-200px] top-[-100px] rounded-lg border border-border">
            <SectionHeader title="Forgot Password" titleCenter />
            <div className="grid gap-5 pt-3">
              <ResetPasswordForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
