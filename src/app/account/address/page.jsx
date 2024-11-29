
import AccountHeader from "@/app/Components/AccountHeader";
import ProfileMenu from "@/app/Components/ProfileMenu";
import SectionHeader from "@/app/Components/SectionHeader";
import AddNewAddress from "@/app/Components/AddNewAddress";
import ModifyAddress from "@/app/Components/ModifyAddress";
import Alerts from "@/app/Components/Alerts";




export default function Address() {
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
                {!userInfo && <Alerts large title="You have not any" />}
                {userInfo &&
                  userInfo.map((item, index) => (
                    <div
                      key={index}
                      className="card-rounded-none-small w-full bg-white py-4 px-3">
                      <SectionHeader
                        title={`Address ${index + 1}`} // Adjusted to show 1-based index
                        card-sm
                        spacingSm
                        titleSmall
                      />
                      <div>
                        <p className="font-semibold mb-1">{item?.user_full_name}</p>
                        <p>{item?.user_building_name_no}, {item?.user_street_name_area}, {item?.user_nearest_landmark}, {item?.user_pin_code}, {item?.user_country}, {item?.user_state}, {item?.user_city}</p>
                      </div>
                 <ModifyAddress/>
                    </div>
                  ))}
                  
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
