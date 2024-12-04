"use client";

import ProductCard from "@/app/Components/ProductCard";
import Alerts from "@/app/Components/Alerts";
import { useEffect, useState } from "react";
import Loading from "@/app/Components/Loading";
import { apiUrl, woocommerceKey } from "@/app/Utils/variables";
import { useAuthContext } from "@/app/Context/authContext";


export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userData } = useAuthContext();


  // Fetch wishlist items
  useEffect(() => {
    fetch(`${apiUrl}wp-json/wishlist/v1/items?user_id=${userData?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setWishlist(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userData?.id]);

  // Generate result string for the wishlist items

  let result = "";
  if (Array.isArray(wishlist)) {
    result = wishlist.map((id) => `&include[]=${id}`).join("");
  } else if (wishlist && typeof wishlist === "object") {
    result = Object.values(wishlist)
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

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Set the timeout to show the alert after 3 seconds
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 3000); // 3000 ms = 3 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center sm:min-h-[70vh] min-h-[50vh]">
      <Loading spinner />
    </div>
  ) : (
    <div className="bg-bggray">
      <section className="pb-0 sm:pt-0 pt-3">
        <div className="sm:bg-transparent max-w-[999px] mx-auto">
          {items && (
            <div>
              {items.length === 0 ? (
                showAlert && (
                  <Alerts
                  noPageUrl
                    large
                    title="You have not any products in your wishlist"
                  />
                )
              ) : (
                <>
                  <div className="grid gap-3 sm:gap-0 w-full lg:order-2 order-first ">
                    {wishlist && (
                      <div className="section-header-card">
                        <ul className="products product-card-left-right-mobile grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-4">
                          {items.map((item, index) => (
                            <ProductCard key={index} data={item} mobileList />
                          ))}
                        </ul>
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
