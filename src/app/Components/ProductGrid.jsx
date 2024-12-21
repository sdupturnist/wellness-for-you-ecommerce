"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ items, isWishList }) {
  return (
    <ul
      className={`xl:grid-cols-4 products product-card-left-right-mobile grid  grid-cols-2 sm:gap-4 gap-2`}>
      {items.map((item, index) => (
        <ProductCard key={index} data={item} wishlistPage={isWishList}/>
      ))}
    </ul>
  );
}
