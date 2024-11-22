'use client'

export default function EditProfileForm(){


    return(
        <form action="">

 <div className="grid gap-4">
               <input type="text" className="input" placeholder="Full Name" />
                <input type="email" className="input" placeholder="Email" />
                <input type="number" className="input" placeholder="Mobile" />
                <button className="btn btn-large w-full">
                    Save
                  </button>
               </div>
               </form>
    )
}


