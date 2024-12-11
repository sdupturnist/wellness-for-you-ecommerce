import AccountHeader from "@/app/Components/AccountHeader";
import ProfileMenu from "@/app/Components/ProfileMenu";
import SectionHeader from "@/app/Components/SectionHeader";
import AddNewAddress from "@/app/Components/AddNewAddress";
import UpdateAddressForm from "@/app/Components/Forms/UpdateAddress";

export default function EditAddress() {
  return (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto grid sm:gap-6 gap-3">
          <div className="card-rounded-none-small w-full bg-white py-4 px-3">
            <SectionHeader title="Edit address" card-sm spacingSm titleSmall />
            <UpdateAddressForm />
          </div>
        </div>
      </section>
    </div>
  );
}
