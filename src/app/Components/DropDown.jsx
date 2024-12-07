"use client";



import React, { useState } from 'react';

const Dropdown = ({ options, label, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    if (onSelect) {
      onSelect(e.target.value);
    }
  };

  return (
    <div className="dropdown">
      <label htmlFor="dropdown">{label}</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className="dropdown-select"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;



// import Link from "next/link";
// import { homeUrl } from "../Utils/variables";

// export default function DropDown({ items, label, icon, component }) {
//   return (
//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button">
//         {!icon ? label : icon}
//       </div>
//       <ul
//         tabIndex={0}
//         className="dropdown-content  menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
//         {items &&
//           items.map((item, index) => (
//             <li key={index}>
//               <Link href={`${homeUrl}${item?.url}`}>{item?.label}</Link>
//             </li>
//           ))}
//         {component && <li>{component}</li>}
//       </ul>
//     </div>
//   );
// }
