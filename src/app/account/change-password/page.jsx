import ChangePasswordForm from "@/app/Components/Forms/ChangePasswordForm";
import SectionHeader from "@/app/Components/SectionHeader";

export default function ChangePassword() {
  return (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto grid sm:gap-6 gap-5">
          <div className="card-rounded-none-small w-full bg-white py-4 px-3">
            <ChangePasswordForm />
          </div>
        </div>
      </section>
    </div>
  );
}
