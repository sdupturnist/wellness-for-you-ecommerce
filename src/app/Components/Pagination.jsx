"use client";

export default function Pagination() {
  return (
    <div className="text-center mt-5 mx-auto">
      <div className="pagination flex gap-2 items-center justify-center">
        <button className="active">1</button>
        <button>2</button>
        <button className="-disabled">...</button>
        <button>99</button>
        <button>100</button>
      </div>
    </div>
  );
}
