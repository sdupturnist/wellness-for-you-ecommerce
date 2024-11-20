'use client'

import Images from "./Images"




export default function Features({data}){

    return(
      data &&
        data.map((item, index) => (
        <span 
        key={index}
        className="features">
             <Images
              imageurl={item?.icon || ''}
              quality="100"
              width="16"
              height="16"
              title={item?.title || 'Icon'}
              alt={item?.title || 'Icon'}
              classes="block size-[16px]"
              placeholder={true}
            />
            {item?.title}
        </span>
          ))
      
    )
}


