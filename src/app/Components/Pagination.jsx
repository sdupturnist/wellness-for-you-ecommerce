"use client";

import { useRouter } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  itemsShowPerPage,
}) {
  const router = useRouter();

  if (totalPages < itemsShowPerPage) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination flex gap-2 items-center justify-center text-center mb-5 mt-11 mx-auto">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => router.push(`${baseUrl}?page=${page}`)} // Correct function
          className={`page-link ${currentPage === page ? "active" : ""}`}>
          {page}
        </button>
      ))}
    </div>
  );
}
