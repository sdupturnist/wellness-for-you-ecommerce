'use client'


export default function CancelOrderForm(){



    return(
        <form action="">





               <div className="grid gap-4">
               <input type="text" className="input" placeholder="Reason for Cancellation" />
                <textarea name="" id="" className="input" placeholder="Additional Notes" rows="5"></textarea>
                <button className="btn btn-large w-full">
                    Cancel
                  </button>
               </div>
               </form>
    )
}


