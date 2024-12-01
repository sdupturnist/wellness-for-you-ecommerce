import AccountHeader from "../Components/AccountHeader";
import ProfileMenu from "../Components/ProfileMenu";



export default function AccountLayout({ children }){
  return (
      <main>
          <AccountHeader/>
      <aside>
      <ProfileMenu/>
      </aside>
          {children}

        </main>
     
  );
}


