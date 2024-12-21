"use client";

import ProductCard from "@/app/Components/ProductCard";
import Alerts from "@/app/Components/Alerts";
import { useEffect, useState } from "react";
import Loading from "@/app/Components/Loading"; // Assuming Loading is a component that shows a spinner or some loading animation
import { apiUrl, woocommerceKey } from "@/app/Utils/variables";
import { useAuthContext } from "@/app/Context/authContext";
import ProductGrid from "@/app/Components/ProductGrid";
import { useSiteContext } from "@/app/Context/siteContext";

export default function WishList() {
  const { activeWishlist } = useSiteContext();

  const wishlistItems =
    JSON.parse(sessionStorage.getItem("wishlist_data")) || activeWishlist;

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  let result = "";
  if (Array.isArray(wishlistItems)) {
    result = wishlistItems.map((id) => `&include[]=${id}`).join("");
  } else if (wishlistItems && typeof wishlistItems === "object") {
    result = Object.values(wishlistItems)
      .map((value) => `&include[]=${value}`)
      .join("");
  }

  // Fetch product data based on wishlist
  useEffect(() => {
    if (result) {
      fetch(`${apiUrl}wp-json/wc/v3/products${woocommerceKey}${result}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [result]);

  return (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto">
          {wishlistItems && (
            <div>
              {wishlistItems.length === 0 ? (
                <Alerts noPageUrl title="You have not any products in your wishlist" />
              ) : (
                <>
                  <div className="grid gap-3 sm:gap-0 w-full lg:order-2 order-first ">
                    {loading ? (
                      // Display Loading Component while loading is true
                     <div className="flex items-center justify-center w-full h-[50vh]">
                       <Loading spinner/>
                     </div>
                    ) : (
                      // Display ProductGrid once loading is false
                      <div className="section-header-card">
                        <ProductGrid items={items} isWishList />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
