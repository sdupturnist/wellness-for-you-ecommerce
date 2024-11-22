
import AccountHeader from "../Components/AccountHeader";
import ProfileMenu from "../Components/ProfileMenu";

export default function MyAccount() {
  return (
    <div className="bg-bggray">
      <section className="bg-bggray sm:py-10 pb-5 pt-0">
      <div className="container !px-0 sm:px-5">
          <div className="sm:bg-transparent bg-white max-w-[999px] mx-auto">
          <AccountHeader/>
            <div>
            <ProfileMenu/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
