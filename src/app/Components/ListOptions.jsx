'use client'

import { PencilIcon } from "@heroicons/react/24/solid";

export default function ListOptions({title, noButton, small}){
    return(
        <div className={`${small ? 'list-options-small' : 'list-options'}`}>
                   
                      <div>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                        />
                        <label>
                         {title}
                        </label>
                      </div>
                    {!noButton && <div className="pl-8">
                        <button className="btn-light btn-medium">
                          Edit <PencilIcon className="size-[13px]" />
                        </button>
                      </div>
}
                  
                  </div>
    )
}