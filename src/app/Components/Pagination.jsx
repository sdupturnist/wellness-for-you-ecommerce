'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Pagination({ currentPage, totalPages, baseUrl }) {

const test = useRouter()

console.log(test?.push)

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page) => (
     ''
      ))}
    </div>
  );
}


{/* <button
key={page}
onClick={`${router.forward}?page=${page}`}
className={`page-link ${currentPage === page ? 'active' : ''}`}
>
{page}
</button> */}