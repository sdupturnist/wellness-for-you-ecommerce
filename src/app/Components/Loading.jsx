'use client'


export default function Loading({dot, spinner}){
    return(

    <>
        {dot && (
            <span className="loading loading-dots text-primary"></span>
          )}

          {spinner && (
            <span className="loading loading-spinner text-primary"></span>
          )}
    </>


    )
}