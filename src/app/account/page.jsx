
'use client'

import { useAuthContext } from "../Context/authContext";
import { useUserContext } from "../Context/userContext";



export default function MyAccount() {

  const {userData} = useUserContext()
 const {auth, userToken} =  useAuthContext()


  
  return (
    <div className="bg-bggray">
      <section className="pb-0">
        <div className="product-card-left-right-mobile bg-white sm:bg-transparent p-5 sm:p-0">
          <div className="sm:bg-transparent max-w-[999px] mx-auto">
             <p className="font-semibold mb-3">Hello admin</p>
            <p>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
