'use client'

export default function ChangePasswordForm(){


    return(
        <form action="">

 <div className="grid gap-4">
 <input type="password" className="input" placeholder="Current password" />
               <input type="password" className="input" placeholder="New password" />
               <input type="password" className="input" placeholder="Confirm password" />
              <button className="btn btn-large w-full">
                    Change
                  </button>
               </div>
               </form>
    )
}


