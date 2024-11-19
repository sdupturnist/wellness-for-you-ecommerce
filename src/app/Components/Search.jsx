'use client'


export default function Search(){
    return(
        <div className="search w-full">
        <label className="w-full flex items-center gap-2 sm:px-5 px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none">
            <path
              d="M5.72153 11.9428C7.00642 11.9428 8.18833 11.5141 9.14341 10.7989L12.2662 13.922C12.5854 14.2413 13.103 14.2413 13.4222 13.922C13.7413 13.6027 13.7413 13.0853 13.4221 12.7661L10.2992 9.64317C11.0144 8.68808 11.4431 7.50618 11.4431 6.22128C11.4431 3.06137 8.88145 0.499756 5.72153 0.499756C2.56161 0.499756 0 3.06137 0 6.22128C0 9.3812 2.56161 11.9428 5.72153 11.9428ZM5.72153 2.13448C7.975 2.13448 9.80834 3.96782 9.80834 6.22128C9.80834 8.47475 7.975 10.3081 5.72153 10.3081C3.46806 10.3081 1.63472 8.47475 1.63472 6.22128C1.63472 3.96782 3.46806 2.13448 5.72153 2.13448Z"
              fill="#606875"
            />
          </svg>
          <input
            type="text"
            className="grow border-none lg:input-md input-sm sm:pl-5 pl-1"
            placeholder="Search for"
          />
        </label>

        <button className="btn">Search</button>
      </div>
    )
}