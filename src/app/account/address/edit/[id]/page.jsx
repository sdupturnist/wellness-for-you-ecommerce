
import AccountHeader from "@/app/Components/AccountHeader";
import ProfileMenu from "@/app/Components/ProfileMenu";
import SectionHeader from "@/app/Components/SectionHeader";
import AddNewAddress from "@/app/Components/AddNewAddress";
import UpdateAddressForm from "@/app/Components/Forms/UpdateAddress";




export default function EditAddress() {
  const userInfo = [
    {
      user_full_name: "Jenny Wilson",
      user_country: "India",
      user_state: "Kerala",
      user_city: "Malappuram",
      user_building_name_no: "Schanzengasse",
      user_street_name_area: "Maravattam",
      user_nearest_landmark: "LP School",
      user_pin_code: "34343",
    },
    {
      user_full_name: "Jenny Wilson",
      user_country: "India",
      user_state: "Kerala",
      user_city: "Malappuram",
      user_building_name_no: "Schanzengasse",
      user_street_name_area: "Maravattam",
      user_nearest_landmark: "LP School",
      user_pin_code: "34343",
    },
  ];

  return (
    <div className="bg-bggray">
      <section className="bg-bggray sm:py-10">
        <div className="container !px-0 sm:px-5">
          <div className="max-w-[999px] mx-auto">
            <AccountHeader back />
            <div className="sm:mt-5 mt-3 sm:pt-2">
              <div className="grid lg:grid-cols-1 sm:grid-cols-1 sm:gap-5 gap-1">
                <div
                         className="card-rounded-none-small w-full bg-white py-4 px-3">
                      <SectionHeader
                        title="Edit address"
                        card-sm
                        spacingSm
                        titleSmall
                      />
                      <UpdateAddressForm/>
                      </div>
                  
                   <div className="sm:mt-0 mt-2">
                   <AddNewAddress />
                   </div>
              </div>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </section>
    </div>
  );
}
