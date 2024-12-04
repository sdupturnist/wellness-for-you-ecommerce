'use client'


export default function Loading({dot, spinner, classes}){
    return(

    <>
        {dot && (
            <span className={`${classes} loading loading-dots text-primary`}></span>
          )}

          {spinner && (
            <span className={`${classes} loading loading-spinner text-primary`}></span>
          )}
    </>


    )
}