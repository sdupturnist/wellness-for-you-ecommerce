'use client'
import { XCircleIcon } from "@heroicons/react/24/solid";


export default function Notification({ message, type, onClose }){
    return (
        <div 
        className={`fixed top-5 right-5 p-4 rounded shadow-lg flex gap-4 justify-between items-center z-50  
                    ${type === 'success' ? 'bg-primary' : 'bg-red-500'} text-white`}
      >
        <span className="text-sm">{message}</span>
        <button 
          onClick={onClose} 
          className="bg-transparent border-none text-white font-bold cursor-pointer"
        >
          <XCircleIcon className="size-5"/>
        </button>
      </div>
    )
}